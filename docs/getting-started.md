# Getting Started

This guide walks through the fastest way to run AinzStack locally.

## Prerequisites

- Node.js 20 or newer
- pnpm 10 or newer
- Supabase project (for auth and data features)
- Stripe account (for billing flows)
- Resend account (for email flows)

## 1) Clone and install

```bash
git clone https://github.com/JCFcodex/ainz-stack.git my-app
cd my-app
pnpm install
```

## 2) Configure environment variables

Copy the example file:

```bash
cp .env.example .env.local
```

Fill values from the provider dashboards:

- Supabase: Project Settings -> API
- Stripe: Developers -> API keys and Webhooks
- Resend: API Keys and verified sender identity

## 3) Optional: apply database migrations

If you use Supabase CLI locally, run migrations before testing full flows:

```bash
supabase db reset
```

If you use hosted Supabase only, you can run the SQL from `supabase/migrations/` manually in the SQL editor.

## 4) Run the app

```bash
pnpm dev
```

Open `http://localhost:3000`.

## 5) Validate core routes

- Marketing: `/`
- Auth: `/login`, `/signup`
- Dashboard: `/dashboard` (requires auth session)
