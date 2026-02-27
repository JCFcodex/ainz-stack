"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { env } from "@/lib/env";
import { PLANS, getStripeClient, type PaidPlanKey } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export type BillingResult = {
  success: boolean;
  error?: string;
};

const checkoutSchema = z.object({
  plan: z.enum(["pro", "enterprise"]),
});

function isPaidPlan(plan: string): plan is PaidPlanKey {
  return plan === "pro" || plan === "enterprise";
}

export async function createCheckoutSession(formData: FormData): Promise<BillingResult> {
  const parsed = checkoutSchema.safeParse({
    plan: formData.get("plan"),
  });

  if (!parsed.success) {
    return { success: false, error: "Invalid plan selected." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "You must be logged in to continue." };
  }

  const stripe = getStripeClient();

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .maybeSingle();

  let customerId = subscription?.stripe_customer_id ?? null;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { userId: user.id },
    });
    customerId = customer.id;
  }

  const plan = parsed.data.plan;
  const priceId = PLANS[plan].stripePriceId;

  if (!priceId || !isPaidPlan(plan)) {
    return { success: false, error: "This plan is not purchasable." };
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${env.NEXT_PUBLIC_APP_URL}/dashboard/billing?checkout=success`,
    cancel_url: `${env.NEXT_PUBLIC_APP_URL}/dashboard/billing?checkout=cancelled`,
    client_reference_id: user.id,
    metadata: {
      plan,
      userId: user.id,
    },
  });

  await supabase.from("subscriptions").upsert(
    {
      user_id: user.id,
      plan,
      status: "incomplete",
      stripe_customer_id: customerId,
    },
    { onConflict: "user_id" },
  );

  if (!session.url) {
    return { success: false, error: "Unable to create checkout session." };
  }

  redirect(session.url);
}

export async function createBillingPortalSession(): Promise<BillingResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "You must be logged in to continue." };
  }

  const stripe = getStripeClient();

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .maybeSingle();

  const customerId = subscription?.stripe_customer_id;
  if (!customerId) {
    return { success: false, error: "No Stripe customer found for this account." };
  }

  const portal = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
  });

  redirect(portal.url);
}
