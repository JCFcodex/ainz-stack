/**
 * Stripe Helpers
 *
 * Prerequisites:
 * 1. Install: `pnpm add stripe`
 * 2. Set env vars: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET,
 *    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
 *
 * Usage (server-side only):
 * ```ts
 * import { stripe } from "@/lib/stripe";
 * const session = await stripe.checkout.sessions.create({ ... });
 * ```
 */

// import Stripe from "stripe";

// export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2024-12-18.acacia",
//   typescript: true,
// });

/**
 * Pricing plans — update these to match your Stripe dashboard.
 */
export const PLANS = {
  free: {
    name: "Free",
    price: 0,
    stripePriceId: null,
    features: ["Full boilerplate access", "Community support", "MIT License"],
  },
  pro: {
    name: "Pro",
    price: 29,
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID ?? null,
    features: [
      "Everything in Free",
      "Lifetime updates",
      "Priority support",
      "Premium components",
      "Email templates",
    ],
  },
  enterprise: {
    name: "Enterprise",
    price: 99,
    stripePriceId: process.env.STRIPE_ENTERPRISE_PRICE_ID ?? null,
    features: [
      "Everything in Pro",
      "Multi-tenant support",
      "Custom integrations",
      "Dedicated support",
      "White-label license",
    ],
  },
} as const;

export type PlanKey = keyof typeof PLANS;
