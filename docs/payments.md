# Payments

AinzStack integrates Stripe for checkout, subscriptions, invoices, and billing updates.

## Key Files

- Stripe helpers and plan mapping: `src/lib/stripe.ts`
- Server actions for checkout and portal: `src/actions/billing.ts`
- Webhook handler: `src/app/api/webhooks/stripe/route.ts`

## Webhook Events Handled

Current webhook route processes:

- `checkout.session.completed`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`

The handler updates subscription/invoice records and sends payment confirmation emails when appropriate.

## Stripe Test Mode Setup

1. Use Stripe test API keys in `.env.local`.
2. Create products and prices in Stripe Dashboard.
3. Set:
   - `STRIPE_PRO_PRICE_ID`
   - `STRIPE_ENTERPRISE_PRICE_ID`

## Local Webhook Testing

Install Stripe CLI and forward webhook events:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the printed signing secret (`whsec_...`) into:

- `STRIPE_WEBHOOK_SECRET`

## Required Stripe Environment Variables

- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRO_PRICE_ID`
- `STRIPE_ENTERPRISE_PRICE_ID`
