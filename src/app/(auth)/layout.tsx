import Link from "next/link";
import { Logo } from "@/components/logo";
import { FadeIn } from "@/components/motion";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,var(--color-secondary)_0%,var(--color-background)_70%)] px-4 py-10">
      <div className="mb-5">
        <Logo size="lg" />
      </div>
      <FadeIn className="w-full max-w-xs">{children}</FadeIn>
      <p className="mt-6 text-xs text-muted-foreground">
        <Link href="/" className="transition-colors hover:text-foreground">
          {"← Back to home"}
        </Link>
      </p>
    </div>
  );
}
