import Link from "next/link";
import {
  ArrowRight,
  Shield,
  CreditCard,
  Mail,
  Palette,
  Zap,
  Code2,
  Check,
  Sparkles,
  Layers,
  MousePointerClick,
  Type,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  FadeIn,
  StaggerChildren,
  StaggerItem,
  AnimatedSection,
  TypeWriter,
} from "@/components/motion";

/* ─────────────────── Hero ─────────────────── */
function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-20 sm:px-6 sm:pb-24 sm:pt-28">
        <div className="flex flex-col items-center text-center">
          <FadeIn delay={0}>
            <Badge
              variant="secondary"
              className="mb-4 gap-1 border border-border/50 bg-secondary/50 backdrop-blur-sm"
            >
              <Sparkles className="size-3" />
              Save 220+ hours of dev time
            </Badge>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Launch your SaaS
              <br />
              <span className="text-muted-foreground">in days, not months</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mt-5 max-w-xl text-sm text-muted-foreground sm:text-base lg:text-lg">
              Production-ready Next.js 16 boilerplate with authentication,
              payments, and email — pre-built for indie devs and startups.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Get Started Free
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link
                  href="https://github.com/JCFcodex/ainz-stack"
                  target="_blank"
                >
                  <Code2 className="size-4" />
                  View on GitHub
                </Link>
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="mt-4 text-xs text-muted-foreground">
              Free &amp; open source · MIT License · No credit card required
            </p>
          </FadeIn>
        </div>

        {/* Hero Visual — Animated Terminal */}
        <FadeIn delay={0.5} className="mx-auto mt-10 max-w-lg sm:mt-14">
          <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <div className="flex items-center gap-1.5 pb-3">
              <div className="size-2.5 rounded-full bg-red-400/80" />
              <div className="size-2.5 rounded-full bg-yellow-400/80" />
              <div className="size-2.5 rounded-full bg-green-400/80" />
              <span className="ml-2 text-xs text-muted-foreground">
                terminal
              </span>
            </div>
            <TypeWriter
              className="text-xs leading-relaxed sm:text-sm"
              lines={[
                {
                  text: "$ pnpm create ainz-stack my-saas",
                  className: "text-foreground font-medium",
                },
                {
                  text: "✓ Project created",
                  className: "text-muted-foreground",
                },
                {
                  text: "✓ Dependencies installed",
                  className: "text-muted-foreground",
                },
                {
                  text: "✓ Auth configured",
                  className: "text-muted-foreground",
                },
                {
                  text: "✓ Payments ready",
                  className: "text-muted-foreground",
                },
                { text: "", className: "text-transparent", delay: 5 },
                {
                  text: "$ pnpm dev",
                  className: "text-foreground font-medium",
                  delay: 6,
                },
                {
                  text: "▲ Ready on http://localhost:3000",
                  className: "text-muted-foreground",
                  delay: 7,
                },
              ]}
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────────── Features ─────────────────── */
const features = [
  {
    icon: Shield,
    title: "Authentication",
    description:
      "Email/password and Google OAuth with Supabase Auth. Session management, password reset, and role-based access.",
  },
  {
    icon: CreditCard,
    title: "Payments",
    description:
      "Stripe integration for subscriptions and one-time payments. Webhooks, invoices, and dunning logic included.",
  },
  {
    icon: Mail,
    title: "Email",
    description:
      "Transactional emails with Resend. Pre-built templates for welcome, reset, and payment notifications.",
  },
  {
    icon: Palette,
    title: "Design System",
    description:
      "Apple-inspired UI with Tailwind CSS v4, shadcn/ui components, and design tokens. WCAG 2.1 AA accessible.",
  },
  {
    icon: Zap,
    title: "Performance",
    description:
      "Turbopack dev server, optimized SSR, ISR for marketing pages. LCP under 1.5s out of the box.",
  },
  {
    icon: Code2,
    title: "DX First",
    description:
      "TypeScript strict mode, ESLint flat config, Prettier, Husky pre-commit hooks, and GitHub Actions CI/CD.",
  },
];

function FeaturesSection() {
  return (
    <AnimatedSection
      id="features"
      className="border-t border-border py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <FadeIn>
            <Badge variant="outline" className="mb-3">
              Features
            </Badge>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              Everything you need to ship
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Pre-built features so you can focus on what makes your product
              unique.
            </p>
          </FadeIn>
        </div>

        <StaggerChildren
          className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.08}
        >
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <Card className="group border-border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="mb-2 flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-secondary to-secondary/60 transition-colors group-hover:bg-foreground/5">
                    <feature.icon className="size-4 text-foreground" />
                  </div>
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </AnimatedSection>
  );
}

/* ─────────────────── Playground ─────────────────── */
function PlaygroundSection() {
  return (
    <AnimatedSection
      id="playground"
      className="border-t border-border py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <FadeIn>
            <Badge variant="outline" className="mb-3">
              UI Playground
            </Badge>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              Components out of the box
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              A taste of the design system. Every component is accessible,
              responsive, and themeable.
            </p>
          </FadeIn>
        </div>

        <StaggerChildren
          className="mt-10 grid gap-4 sm:mt-12 lg:grid-cols-2 lg:gap-6"
          staggerDelay={0.1}
        >
          {/* Buttons Showcase */}
          <StaggerItem>
            <Card className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <MousePointerClick className="size-4 text-muted-foreground" />
                  <CardTitle className="text-sm">Buttons</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Button size="sm">Primary</Button>
                  <Button size="sm" variant="secondary">
                    Secondary
                  </Button>
                  <Button size="sm" variant="outline">
                    Outline
                  </Button>
                  <Button size="sm" variant="ghost">
                    Ghost
                  </Button>
                  <Button size="sm" variant="destructive">
                    Destructive
                  </Button>
                  <Button size="sm" variant="link">
                    Link
                  </Button>
                </div>
                <Separator />
                <div className="flex flex-wrap gap-2">
                  <Button size="sm">Small</Button>
                  <Button>Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon">
                    <Zap className="size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>

          {/* Form Showcase */}
          <StaggerItem>
            <Card className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Type className="size-4 text-muted-foreground" />
                  <CardTitle className="text-sm">Form Elements</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="playground-email">Email</Label>
                  <Input
                    id="playground-email"
                    type="email"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="playground-password">Password</Label>
                  <Input
                    id="playground-password"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>
                <Button className="w-full" size="sm">
                  Submit
                </Button>
              </CardContent>
            </Card>
          </StaggerItem>

          {/* Cards Showcase */}
          <StaggerItem>
            <Card className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Layers className="size-4 text-muted-foreground" />
                  <CardTitle className="text-sm">Cards</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-border bg-secondary/50 p-3">
                    <p className="text-xs text-muted-foreground">Users</p>
                    <p className="text-lg font-semibold">2,847</p>
                    <p className="text-xs text-muted-foreground">+12.5%</p>
                  </div>
                  <div className="rounded-lg border border-border bg-secondary/50 p-3">
                    <p className="text-xs text-muted-foreground">Revenue</p>
                    <p className="text-lg font-semibold">$14.2k</p>
                    <p className="text-xs text-muted-foreground">+8.1%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>

          {/* Badges Showcase */}
          <StaggerItem>
            <Card className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-4 text-muted-foreground" />
                  <CardTitle className="text-sm">Badges & Status</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="success">Success</Badge>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
        </StaggerChildren>
      </div>
    </AnimatedSection>
  );
}

/* ─────────────────── Pricing ─────────────────── */
const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out AinzStack.",
    features: [
      "Full boilerplate access",
      "Community support",
      "MIT License",
      "Basic documentation",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "one-time",
    description: "For serious indie devs shipping fast.",
    features: [
      "Everything in Free",
      "Lifetime updates",
      "Priority support",
      "Premium components",
      "Email templates",
      "Advanced examples",
    ],
    cta: "Buy Pro",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "one-time",
    description: "For teams that need everything.",
    features: [
      "Everything in Pro",
      "Multi-tenant support",
      "Custom integrations",
      "Dedicated support",
      "White-label license",
      "Private Discord access",
    ],
    cta: "Buy Enterprise",
    highlight: false,
  },
];

function PricingSection() {
  return (
    <AnimatedSection
      id="pricing"
      className="border-t border-border py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <FadeIn>
            <Badge variant="outline" className="mb-3">
              Pricing
            </Badge>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              Simple, transparent pricing
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Pay once, own forever. No subscriptions, no hidden fees.
            </p>
          </FadeIn>
        </div>

        <StaggerChildren
          className="mt-10 grid gap-4 sm:mt-12 sm:gap-6 md:grid-cols-3"
          staggerDelay={0.1}
        >
          {plans.map((plan) => (
            <StaggerItem key={plan.name}>
              <Card
                className={`transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  plan.highlight
                    ? "border-foreground shadow-[0_0_30px_-5px_rgba(0,0,0,0.1)]"
                    : "border-border"
                }`}
              >
                <CardHeader>
                  {plan.highlight && (
                    <Badge className="mb-2 w-fit">Most Popular</Badge>
                  )}
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="ml-1 text-sm text-muted-foreground">
                      {plan.period}
                    </span>
                  </div>
                  <Separator />
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm"
                      >
                        <Check className="size-3.5 text-foreground" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={plan.highlight ? "default" : "outline"}
                    asChild
                  >
                    <Link href="/signup">{plan.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </AnimatedSection>
  );
}

/* ─────────────────── Page ─────────────────── */
function CTASection() {
  return (
    <AnimatedSection className="border-t border-border bg-gradient-to-b from-secondary/40 to-background py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <FadeIn>
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Ready to launch?
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Start building your SaaS today. Free, open source, and production
            ready from day one.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="mt-8 flex justify-center">
            <Button size="lg" asChild>
              <Link href="/signup">
                Get Started Free
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </AnimatedSection>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <PlaygroundSection />
      <PricingSection />
      <CTASection />
    </>
  );
}
