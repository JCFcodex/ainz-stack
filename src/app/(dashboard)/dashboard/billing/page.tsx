import type { Metadata } from "next";
import { Check, CreditCard, ExternalLink } from "lucide-react";
import {
  createBillingPortalSession,
  createCheckoutSession,
} from "@/actions/billing";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/server";

type PlanKey = "free" | "pro" | "enterprise";

type PlanCard = {
  key: PlanKey;
  name: string;
  price: string;
  period: string;
  features: string[];
};

const plans: PlanCard[] = [
  {
    key: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    features: ["Full boilerplate access", "Community support", "MIT License"],
  },
  {
    key: "pro",
    name: "Pro",
    price: "$29",
    period: "per month",
    features: [
      "Everything in Free",
      "Lifetime updates",
      "Priority support",
      "Premium components",
      "Email templates",
    ],
  },
  {
    key: "enterprise",
    name: "Enterprise",
    price: "$99",
    period: "per month",
    features: [
      "Everything in Pro",
      "Multi-tenant support",
      "Custom integrations",
      "Dedicated support",
      "White-label license",
    ],
  },
];

export const metadata: Metadata = {
  title: "Billing",
};

async function checkoutAction(formData: FormData) {
  "use server";

  await createCheckoutSession(formData);
}

async function billingPortalAction() {
  "use server";

  await createBillingPortalSession();
}

function toTitleCase(value: string) {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatAmount(amountCents: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amountCents / 100);
  } catch {
    return `$${(amountCents / 100).toFixed(2)}`;
  }
}

export default async function BillingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [subscriptionResponse, invoicesResponse] = await Promise.all([
    user
      ? supabase
          .from("subscriptions")
          .select(
            "plan,status,stripe_customer_id,current_period_start,current_period_end",
          )
          .eq("user_id", user.id)
          .maybeSingle()
      : Promise.resolve({ data: null }),
    user
      ? supabase
          .from("invoices")
          .select("id,stripe_invoice_id,amount_cents,currency,status,created_at,hosted_invoice_url")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(10)
      : Promise.resolve({ data: [] }),
  ]);

  const subscription = subscriptionResponse.data;
  const invoices = invoicesResponse.data ?? [];
  const currentPlan = subscription?.plan ?? "free";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tighter">Billing</h1>
        <p className="text-sm text-muted-foreground">
          Manage your plan and payment method.
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Current Plan</CardTitle>
              <CardDescription>
                {`You are on the ${toTitleCase(currentPlan)} plan.`}
              </CardDescription>
            </div>
            <Badge variant="secondary">{toTitleCase(currentPlan)}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-3">
            {plans.map((plan) => {
              const isCurrent = plan.key === currentPlan;
              const canPurchase = plan.key !== "free";

              return (
                <div
                  key={plan.key}
                  className={`rounded-lg border p-4 ${
                    isCurrent ? "border-foreground" : "border-border"
                  }`}
                >
                  <p className="text-sm font-semibold">{plan.name}</p>
                  <p className="mt-1 text-2xl font-bold">{plan.price}</p>
                  <p className="text-xs text-muted-foreground">{plan.period}</p>
                  <Separator className="my-3" />
                  <ul className="space-y-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-1.5 text-xs">
                        <Check className="size-3 text-foreground" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-3">
                    {isCurrent ? (
                      <Button size="sm" className="w-full" variant="secondary" disabled>
                        Current
                      </Button>
                    ) : canPurchase ? (
                      <form action={checkoutAction}>
                        <input type="hidden" name="plan" value={plan.key} />
                        <Button size="sm" className="w-full" type="submit">
                          {`Choose ${plan.name}`}
                        </Button>
                      </form>
                    ) : (
                      <Button size="sm" className="w-full" variant="outline" disabled>
                        Included
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Payment Method</CardTitle>
          <CardDescription>Update cards and invoices in Stripe.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 rounded-lg border border-border p-3">
            <CreditCard className="size-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">
                {subscription?.stripe_customer_id
                  ? "Stripe customer connected"
                  : "No payment method"}
              </p>
              <p className="text-xs text-muted-foreground">
                {subscription?.stripe_customer_id
                  ? "Open billing portal to manage cards and subscriptions."
                  : "Pick a paid plan to add payment details."}
              </p>
            </div>
          </div>
        </CardContent>
        {subscription?.stripe_customer_id && (
          <div className="px-6 pb-6">
            <form action={billingPortalAction}>
              <Button size="sm" variant="outline" type="submit" className="gap-2">
                <ExternalLink className="size-3.5" />
                Open Billing Portal
              </Button>
            </form>
          </div>
        )}
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Invoice History</CardTitle>
          <CardDescription>Your recent invoices.</CardDescription>
        </CardHeader>
        <CardContent>
          {invoices.length === 0 ? (
            <p className="rounded-lg border border-border p-3 text-sm text-muted-foreground">
              No invoices yet.
            </p>
          ) : (
            <div className="space-y-2">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between rounded-lg border border-border p-3"
                >
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-medium">
                      {invoice.stripe_invoice_id ?? invoice.id.slice(0, 8)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(invoice.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm">
                      {formatAmount(invoice.amount_cents, invoice.currency)}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      {toTitleCase(invoice.status)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

