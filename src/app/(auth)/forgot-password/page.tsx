import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ForgotPasswordForm } from "@/components/forms/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot Password",
};

export default function ForgotPasswordPage() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Reset your password</CardTitle>
        <CardDescription>
          Enter your email and we&apos;ll send you a reset link.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ForgotPasswordForm />
      </CardContent>
      <CardFooter className="justify-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3" />
          Back to login
        </Link>
      </CardFooter>
    </Card>
  );
}
