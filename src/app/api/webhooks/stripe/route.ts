/**
 * Stripe Webhook Route Handler
 *
 * Handles incoming Stripe webhook events for payment processing.
 *
 * Prerequisites:
 * 1. Install: `pnpm add stripe`
 * 2. Set STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET in `.env.local`
 * 3. Use Stripe CLI for local testing: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
 */

import { NextResponse, type NextRequest } from "next/server";
// import { stripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 },
    );
  }

  // TODO: Uncomment when Stripe is configured
  // let event;
  // try {
  //   event = stripe.webhooks.constructEvent(
  //     body,
  //     signature,
  //     process.env.STRIPE_WEBHOOK_SECRET!,
  //   );
  // } catch (err) {
  //   const message = err instanceof Error ? err.message : "Unknown error";
  //   console.error(`Webhook signature verification failed: ${message}`);
  //   return NextResponse.json({ error: message }, { status: 400 });
  // }
  //
  // switch (event.type) {
  //   case "checkout.session.completed": {
  //     const session = event.data.object;
  //     // TODO: Fulfill the order, update database
  //     console.log("✅ Checkout completed:", session.id);
  //     break;
  //   }
  //
  //   case "customer.subscription.updated": {
  //     const subscription = event.data.object;
  //     // TODO: Update subscription status in database
  //     console.log("📝 Subscription updated:", subscription.id);
  //     break;
  //   }
  //
  //   case "customer.subscription.deleted": {
  //     const subscription = event.data.object;
  //     // TODO: Handle subscription cancellation
  //     console.log("❌ Subscription cancelled:", subscription.id);
  //     break;
  //   }
  //
  //   case "invoice.payment_failed": {
  //     const invoice = event.data.object;
  //     // TODO: Handle failed payment (dunning)
  //     console.log("⚠️ Payment failed:", invoice.id);
  //     break;
  //   }
  //
  //   default:
  //     console.log(`Unhandled event type: ${event.type}`);
  // }

  return NextResponse.json({ received: true });
}
