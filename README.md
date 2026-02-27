# AinzStack

> Production-ready Next.js 16 boilerplate for indie devs and startups. Auth, payments, email — pre-built. Save 220+ hours.

![Next.js 16](https://img.shields.io/badge/Next.js-16-black) ![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8) ![License](https://img.shields.io/badge/License-MIT-green)

## Features

- **Auth** — Email/password + Google OAuth via Supabase Auth, session management, password reset
- **Payments** — Stripe subscriptions, webhooks, invoices, dunning logic
- **Email** — Transactional emails with Resend (welcome, reset, payment templates)
- **Design System** — Apple-inspired monochrome UI, 14 accessible components
- **Animations** — Framer Motion scroll reveals, staggered cards, spring-physics navigation
- **Forms** — React Hook Form + Zod validation with loading states and error display
- **State** — Zustand (client) + TanStack Query (server) + Server Actions (mutations)
- **DX** — TypeScript strict, ESLint flat config, Prettier, Husky pre-commit hooks, GitHub Actions CI
- **SEO** — Dynamic sitemap, robots.txt, web app manifest, OpenGraph metadata

## Quick Start

```bash
# Clone the repo
git clone https://github.com/JCFcodex/ainz-stack.git my-saas
cd my-saas

# Install dependencies
pnpm install

# Set up env vars
cp .env.example .env.local

# Start dev server
pnpm dev
```

## Project Structure

```
src/
├── actions/              # Server Actions (auth)
├── app/
│   ├── (marketing)/      # Landing page
│   ├── (auth)/           # Login, signup, forgot-password
│   ├── (dashboard)/      # Dashboard (overview, profile, billing, settings)
│   ├── api/              # Route handlers (auth callback, Stripe webhooks)
│   ├── sitemap.ts        # Dynamic sitemap
│   ├── robots.ts         # Robots.txt
│   └── manifest.ts       # PWA manifest
├── components/
│   ├── forms/            # React Hook Form + Zod form components
│   ├── ui/               # 14 design system components
│   ├── motion.tsx        # Framer Motion wrappers
│   └── [layout]          # Logo, Navbar, Sidebar, Footer
├── lib/
│   ├── supabase/         # Client, server, middleware helpers
│   ├── stripe.ts         # Stripe helper + plan constants
│   ├── email.ts          # Resend + email templates
│   ├── env.ts            # Zod environment validation
│   └── utils.ts          # cn() utility
├── providers/            # QueryProvider + ToastProvider
├── stores/               # Zustand auth store
└── types/                # Shared TypeScript definitions
```

## Components

| Component      | Description                                                        |
| -------------- | ------------------------------------------------------------------ |
| `Button`       | 6 variants, 4 sizes, `asChild` support, active press scale         |
| `Card`         | Compound component (Header, Title, Description, Content, Footer)   |
| `Input`        | Error state, aria-invalid, boolean & string error support          |
| `Label`        | Form labels with `htmlFor`                                         |
| `Badge`        | 5 variants (default, secondary, outline, destructive, success)     |
| `Separator`    | Horizontal/vertical divider                                        |
| `Avatar`       | Image + fallback, 3 sizes                                          |
| `Dialog`       | Dependency-free modal with Escape, overlay click, body scroll lock |
| `Textarea`     | Error state support                                                |
| `Skeleton`     | Loading placeholder with pulse animation                           |
| `Tooltip`      | Lightweight, 4-side positioning                                    |
| `Toast`        | 5 variants with auto-dismiss, wired to Providers                   |
| `DropdownMenu` | Click-outside, Escape, destructive items, separators               |
| `Switch`       | Toggle with ARIA `role=switch`                                     |

## Scripts

```bash
pnpm dev          # Start dev server (Turbopack)
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix lint issues
pnpm format       # Format with Prettier
pnpm format:check # Check formatting
pnpm typecheck    # TypeScript type check
```

## Tech Stack

| Layer           | Technology               |
| --------------- | ------------------------ |
| Framework       | Next.js 16 (App Router)  |
| Language        | TypeScript (Strict Mode) |
| Styling         | Tailwind CSS v4          |
| Animations      | Framer Motion            |
| Client State    | Zustand                  |
| Server Data     | TanStack Query           |
| Forms           | React Hook Form + Zod    |
| Auth            | Supabase Auth            |
| Payments        | Stripe                   |
| Email           | Resend                   |
| Package Manager | pnpm                     |
| CI/CD           | GitHub Actions           |

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Email
RESEND_API_KEY=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/JCFcodex/ainz-stack)

## License

MIT © [JCFcodex](https://github.com/JCFcodex)
