import Link from "next/link";
import { Logo } from "@/components/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-10">
      <div className="mb-8">
        <Logo size="lg" />
      </div>
      <div className="w-full max-w-sm">{children}</div>
      <p className="mt-6 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          ← Back to home
        </Link>
      </p>
    </div>
  );
}
