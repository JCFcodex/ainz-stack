import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Terms of Service</h1>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">
        These placeholder terms are provided for development environments only.
        Replace them with legal language reviewed for your business before
        accepting real users.
      </p>
      <div className="mt-8 space-y-6 text-sm leading-7 text-muted-foreground">
        <p>
          Use of this software is at your own risk. You are responsible for
          compliance, security controls, and any third-party agreements tied to
          your deployment.
        </p>
        <p>
          Billing, authentication, and email services may rely on external
          providers. Their service terms apply in addition to your own.
        </p>
      </div>
    </section>
  );
}
