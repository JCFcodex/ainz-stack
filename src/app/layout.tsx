import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import { Providers } from "@/providers";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AinzStack — Launch Your SaaS in Days",
    template: "%s | AinzStack",
  },
  description:
    "Production-ready Next.js 16 boilerplate for indie devs and startups. Auth, payments, email — all pre-built. Save 220+ hours.",
  keywords: [
    "Next.js boilerplate",
    "SaaS starter",
    "TypeScript",
    "Tailwind CSS",
    "Supabase",
    "Stripe",
  ],
  authors: [{ name: "JCFcodex" }],
  openGraph: {
    title: "AinzStack — Launch Your SaaS in Days",
    description:
      "Production-ready Next.js 16 boilerplate with auth, payments, and email. Ship faster.",
    type: "website",
    locale: "en_US",
    siteName: "AinzStack",
  },
  twitter: {
    card: "summary_large_image",
    title: "AinzStack — Launch Your SaaS in Days",
    description:
      "Production-ready Next.js 16 boilerplate with auth, payments, and email. Ship faster.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${inter.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
