import Link from "next/link";
import { Logo } from "@/components/logo";
import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Logo size="sm" />
            <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
              Production-ready Next.js boilerplate
              <br />
              for indie devs and startups.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">
              Product
            </h4>
            <ul className="space-y-2">
              {["Features", "Pricing", "Changelog", "Docs"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">
              Resources
            </h4>
            <ul className="space-y-2">
              {["Guides", "API Reference", "Blog", "Community"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">
              Legal
            </h4>
            <ul className="space-y-2">
              {["Privacy", "Terms", "License"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2026 AinzStack by JCFcodex. All rights reserved.
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
