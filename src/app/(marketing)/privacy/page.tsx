import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">
        This template stores only the data needed to run authentication,
        billing, and transactional emails. Replace this page with your
        company-specific privacy policy before production launch.
      </p>
      <div className="mt-8 space-y-6 text-sm leading-7 text-muted-foreground">
        <p>
          We process account details, billing records, and notification
          preferences to provide core product functionality.
        </p>
        <p>
          If you deploy this starter, you are responsible for publishing legal
          terms that match your data retention, third-party integrations, and
          jurisdictional requirements.
        </p>
      </div>
    </section>
  );
}
