import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";
import { emailTemplates, sendEmail } from "@/lib/email";
import { env } from "@/lib/env";
import { getPlanFromPriceId, getStripeClient } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";

function toIsoTimestamp(unixSeconds: number | null | undefined) {
  if (!unixSeconds) {
    return null;
  }

  return new Date(unixSeconds * 1000).toISOString();
}

function mapSubscriptionStatus(
  status: Stripe.Subscription.Status,
):
  | "active"
  | "canceled"
  | "past_due"
  | "trialing"
  | "incomplete"
  | "incomplete_expired"
  | "unpaid" {
  switch (status) {
    case "active":
      return "active";
    case "canceled":
      return "canceled";
    case "past_due":
      return "past_due";
    case "trialing":
      return "trialing";
    case "incomplete":
      return "incomplete";
    case "incomplete_expired":
      return "incomplete_expired";
    case "unpaid":
      return "unpaid";
    case "paused":
      return "past_due";
    default:
      return "incomplete";
  }
}

function mapInvoiceStatus(
  status: Stripe.Invoice.Status | null,
): "paid" | "pending" | "failed" {
  if (status === "paid") {
    return "paid";
  }

  if (status === "void" || status === "uncollectible") {
    return "failed";
  }

  return "pending";
}

async function resolveUserIdByCustomerId(
  customerId: string | null,
): Promise<string | null> {
  if (!customerId) {
    return null;
  }

  const admin = createAdminClient();
  const { data } = await admin
    .from("subscriptions")
    .select("user_id")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();

  return data?.user_id ?? null;
}

export async function POST(request: NextRequest) {
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 },
    );
  }

  const body = await request.text();

  let event: Stripe.Event;
  try {
    const stripe = getStripeClient();
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET ?? "",
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Invalid webhook signature.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const admin = createAdminClient();

  const { data: existingEvent } = await admin
    .from("stripe_events")
    .select("event_id")
    .eq("event_id", event.id)
    .maybeSingle();

  if (existingEvent) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  const { error: idempotencyError } = await admin
    .from("stripe_events")
    .insert({ event_id: event.id, type: event.type });

  if (idempotencyError) {
    return NextResponse.json({ error: idempotencyError.message }, { status: 500 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.client_reference_id ?? session.metadata?.userId ?? null;
        const customerId =
          typeof session.customer === "string"
            ? session.customer
            : session.customer?.id ?? null;
        const subscriptionId =
          typeof session.subscription === "string"
            ? session.subscription
            : session.subscription?.id ?? null;

        const metadataPlan = session.metadata?.plan;
        const plan =
          metadataPlan === "pro" || metadataPlan === "enterprise"
            ? metadataPlan
            : "free";

        if (userId) {
          await admin.from("subscriptions").upsert(
            {
              user_id: userId,
              plan,
              status: session.payment_status === "paid" ? "active" : "incomplete",
              stripe_customer_id: customerId,
              stripe_subscription_id: subscriptionId,
            },
            { onConflict: "user_id" },
          );
        }

        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId =
          typeof subscription.customer === "string"
            ? subscription.customer
            : subscription.customer.id;
        const userId = await resolveUserIdByCustomerId(customerId);

        if (userId) {
          const priceId = subscription.items.data[0]?.price?.id;
          const periodStart = subscription.items.data[0]?.current_period_start;
          const periodEnd = subscription.items.data[0]?.current_period_end;
          const mappedPlan = getPlanFromPriceId(priceId) ?? "free";

          await admin.from("subscriptions").upsert(
            {
              user_id: userId,
              plan: mappedPlan,
              status: mapSubscriptionStatus(subscription.status),
              stripe_customer_id: customerId,
              stripe_subscription_id: subscription.id,
              current_period_start: toIsoTimestamp(periodStart),
              current_period_end: toIsoTimestamp(periodEnd),
            },
            { onConflict: "user_id" },
          );
        }

        break;
      }

      case "invoice.payment_succeeded":
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId =
          typeof invoice.customer === "string"
            ? invoice.customer
            : invoice.customer?.id ?? null;

        const userId = await resolveUserIdByCustomerId(customerId);
        if (!userId) {
          break;
        }

        await admin.from("invoices").upsert(
          {
            user_id: userId,
            stripe_invoice_id: invoice.id,
            amount_cents: invoice.amount_paid || invoice.amount_due || 0,
            currency: (invoice.currency ?? "usd").toLowerCase(),
            status: mapInvoiceStatus(invoice.status),
            hosted_invoice_url: invoice.hosted_invoice_url,
            pdf_url: invoice.invoice_pdf,
          },
          { onConflict: "stripe_invoice_id" },
        );

        if (event.type === "invoice.payment_succeeded") {
          const [{ data: profile }, { data: subscription }] = await Promise.all([
            admin
              .from("profiles")
              .select("email")
              .eq("id", userId)
              .maybeSingle(),
            admin
              .from("subscriptions")
              .select("plan")
              .eq("user_id", userId)
              .maybeSingle(),
          ]);

          if (profile?.email) {
            const amount = `$${((invoice.amount_paid || invoice.amount_due || 0) / 100).toFixed(2)}`;
            const planName = subscription?.plan ?? "pro";
            await sendEmail({
              userId,
              template: "payment_confirmation",
              to: profile.email,
              subject: "Payment confirmation",
              html: emailTemplates.paymentConfirmation({
                planName: planName.charAt(0).toUpperCase() + planName.slice(1),
                amount,
              }),
            });
          }
        }

        break;
      }

      default:
        break;
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook handler failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
