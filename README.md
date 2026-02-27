# AinzStack

> Production-ready Next.js 16 boilerplate for indie devs and startups. Auth, payments, email — all pre-built. Save 220+ hours.

## ✨ Features

- **Next.js 16** — App Router, React 19, Turbopack
- **TypeScript** — Strict mode, type-first development
- **Tailwind CSS v4** — CSS-first config, design tokens
- **Monochrome Design System** — Apple-inspired, WCAG 2.1 AA
- **Authentication** — Email/password + Google OAuth (Supabase)
- **Payments** — Stripe subscriptions + one-time payments
- **Email** — Transactional emails with Resend
- **Forms** — React Hook Form + Zod validation
- **State** — Zustand (client) + TanStack Query (server)
- **Testing** — Vitest + Playwright
- **CI/CD** — GitHub Actions, Husky pre-commit hooks
- **DX** — ESLint 9, Prettier, lint-staged

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/JCFcodex/ainz-stack.git my-app
cd my-app

# Install
pnpm install

# Setup env
cp .env.example .env.local

# Run
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## 📁 Project Structure

```
src/
├── app/
│   ├── (marketing)/     # Landing page (/)
│   ├── (auth)/          # Login, signup, forgot-password
│   ├── (dashboard)/     # Dashboard with sidebar
│   ├── layout.tsx       # Root layout (fonts, metadata)
│   ├── loading.tsx      # Global loading state
│   ├── not-found.tsx    # 404 page
│   └── global-error.tsx # Error boundary
├── components/
│   ├── ui/              # Button, Card, Input, Badge, etc.
│   ├── logo.tsx         # AinzStack logo
│   ├── navbar.tsx       # Marketing navbar
│   ├── sidebar.tsx      # Dashboard sidebar
│   └── footer.tsx       # Marketing footer
└── lib/
    ├── utils.ts         # cn() helper
    └── env.ts           # Zod env validation
```

## 🎨 Design System

| Token      | Value               |
| ---------- | ------------------- |
| Background | `#FFFFFF`           |
| Accent     | `#A9A9A9`           |
| Text       | `#000000`           |
| Font       | Poppins + Inter     |
| Icons      | Lucide React        |
| Radius     | `xs` → `full` scale |

## 📜 Scripts

| Script           | Description                  |
| ---------------- | ---------------------------- |
| `pnpm dev`       | Start dev server (Turbopack) |
| `pnpm build`     | Production build             |
| `pnpm lint`      | Run ESLint                   |
| `pnpm format`    | Format with Prettier         |
| `pnpm typecheck` | TypeScript type check        |

## 🔧 Environment Variables

Copy `.env.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon key
- `STRIPE_SECRET_KEY` — Stripe secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — Stripe publishable key

## 📄 License

MIT © [JCFcodex](https://github.com/JCFcodex)
