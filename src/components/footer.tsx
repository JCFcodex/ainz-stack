import Link from "next/link";
import { Github } from "lucide-react";
import { Logo } from "@/components/logo";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

const productLinks: FooterLink[] = [
  { label: "Features", href: "/#features" },
  { label: "Playground", href: "/#playground" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Dashboard", href: "/dashboard" },
];

const resourceLinks: FooterLink[] = [
  { label: "Guides", href: "https://nextjs.org/docs", external: true },
  {
    label: "API Reference",
    href: "https://supabase.com/docs/reference/javascript",
    external: true,
  },
  { label: "Project Repo", href: "https://github.com/JCFcodex/ainz-stack", external: true },
  {
    label: "Community",
    href: "https://github.com/JCFcodex/ainz-stack/discussions",
    external: true,
  },
];

const legalLinks: FooterLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  {
    label: "License",
    href: "https://github.com/JCFcodex/ainz-stack/blob/main/LICENSE",
    external: true,
  },
];

function FooterLinks({ links }: { links: FooterLink[] }) {
  return (
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Logo size="sm" />
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Production-ready Next.js boilerplate
              <br />
              for indie devs and startups.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">
              Product
            </h4>
            <FooterLinks links={productLinks} />
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">
              Resources
            </h4>
            <FooterLinks links={resourceLinks} />
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">
              Legal
            </h4>
            <FooterLinks links={legalLinks} />
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            (c) 2026 AinzStack by JCFcodex. All rights reserved.
          </p>
          <Link
            href="https://github.com/JCFcodex/ainz-stack"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="size-3.5" />
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}
