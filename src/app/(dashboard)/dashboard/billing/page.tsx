import type { Metadata } from "next";
import { Check, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Billing",
};

const plans = [
  {
    name: "Free",
    price: "$0",
    current: true,
    features: ["Full boilerplate access", "Community support"],
  },
  {
    name: "Pro",
    price: "$29",
    current: false,
    features: [
      "Everything in Free",
      "Lifetime updates",
      "Priority support",
      "Premium components",
    ],
  },
  {
    name: "Enterprise",
    price: "$99",
    current: false,
    features: [
      "Everything in Pro",
      "Multi-tenant",
      "Dedicated support",
      "White-label",
    ],
  },
];

const invoices = [
  { id: "INV-001", date: "Feb 1, 2026", amount: "$0.00", status: "Paid" },
  { id: "INV-002", date: "Jan 1, 2026", amount: "$0.00", status: "Paid" },
];

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Billing</h1>
        <p className="text-sm text-muted-foreground">
          Manage your plan and payment method.
        </p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Current Plan</CardTitle>
              <CardDescription>You are on the Free plan.</CardDescription>
            </div>
            <Badge variant="secondary">Free</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-lg border p-4 ${
                  plan.current ? "border-foreground" : "border-border"
                }`}
              >
                <p className="text-sm font-semibold">{plan.name}</p>
                <p className="mt-1 text-2xl font-bold">{plan.price}</p>
                <p className="text-xs text-muted-foreground">
                  {plan.name === "Free" ? "forever" : "one-time"}
                </p>
                <Separator className="my-3" />
                <ul className="space-y-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-1.5 text-xs">
                      <Check className="size-3 text-foreground" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  size="sm"
                  className="mt-3 w-full"
                  variant={plan.current ? "secondary" : "default"}
                  disabled={plan.current}
                >
                  {plan.current ? "Current" : "Upgrade"}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Payment Method</CardTitle>
          <CardDescription>Add or update your card.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 rounded-lg border border-border p-3">
            <CreditCard className="size-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">No payment method</p>
              <p className="text-xs text-muted-foreground">
                Add a card to upgrade your plan.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button size="sm" variant="outline">
            Add Payment Method
          </Button>
        </CardFooter>
      </Card>

      {/* Invoices */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Invoice History</CardTitle>
          <CardDescription>Your recent invoices.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {invoices.map((inv) => (
              <div
                key={inv.id}
                className="flex items-center justify-between rounded-lg border border-border p-3"
              >
                <div className="flex items-center gap-3">
                  <p className="text-sm font-medium">{inv.id}</p>
                  <p className="text-xs text-muted-foreground">{inv.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-sm">{inv.amount}</p>
                  <Badge variant="secondary" className="text-xs">
                    {inv.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
