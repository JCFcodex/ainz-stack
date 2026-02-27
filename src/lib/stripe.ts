import Stripe from "stripe";
import { env, getRequiredEnv } from "@/lib/env";

let stripeClient: Stripe | null = null;

export function getStripeClient() {
  if (!stripeClient) {
    stripeClient = new Stripe(getRequiredEnv("STRIPE_SECRET_KEY"), {
      typescript: true,
    });
  }

  return stripeClient;
}

export const PLANS = {
  free: {
    name: "Free",
    price: 0,
    currency: "usd",
    interval: null,
    stripePriceId: null,
    features: ["Full boilerplate access", "Community support", "MIT License"],
  },
  pro: {
    name: "Pro",
    price: 29,
    currency: "usd",
    interval: "month",
    stripePriceId: env.STRIPE_PRO_PRICE_ID ?? null,
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
    currency: "usd",
    interval: "month",
    stripePriceId: env.STRIPE_ENTERPRISE_PRICE_ID ?? null,
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
export type PaidPlanKey = Exclude<PlanKey, "free">;

const priceIdToPlan: Record<string, PaidPlanKey> = {};

if (PLANS.pro.stripePriceId) {
  priceIdToPlan[PLANS.pro.stripePriceId] = "pro";
}

if (PLANS.enterprise.stripePriceId) {
  priceIdToPlan[PLANS.enterprise.stripePriceId] = "enterprise";
}

export function getPlanFromPriceId(priceId: string | null | undefined) {
  if (!priceId) {
    return null;
  }

  return priceIdToPlan[priceId] ?? null;
}
