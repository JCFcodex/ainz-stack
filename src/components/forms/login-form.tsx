"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail, Loader2 } from "lucide-react";
import { login, loginWithGoogle } from "@/actions/auth";
import { GoogleIcon } from "@/components/icons/google";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [oauthPending, setOauthPending] = useState(false);
  const searchParams = useSearchParams();
  const successMessage = searchParams.get("message");
  const oauthError = searchParams.get("error");

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginValues) {
    setSubmitError(null);
    clearErrors();

    const formData = new FormData();
    formData.set("email", data.email);
    formData.set("password", data.password);

    const result = await login(null, formData);
    if (!result.success) {
      if (result.fieldErrors?.email) {
        setError("email", { message: result.fieldErrors.email });
      }
      if (result.fieldErrors?.password) {
        setError("password", { message: result.fieldErrors.password });
      }

      setSubmitError(result.error ?? "Unable to log in.");
    }
  }

  async function handleGoogleLogin() {
    setSubmitError(null);
    setOauthPending(true);

    const result = await loginWithGoogle();
    if (!result.success) {
      setSubmitError(result.error ?? "Unable to start Google sign-in.");
      setOauthPending(false);
    }
  }

  return (
    <div className="space-y-4">
      <Button
        variant="outline"
        className="w-full gap-2"
        type="button"
        onClick={handleGoogleLogin}
        disabled={oauthPending || isSubmitting}
      >
        {oauthPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <GoogleIcon className="size-4" />
        )}
        Continue with Google
      </Button>

      <div className="relative">
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
          or
        </span>
      </div>

      {successMessage && (
        <div className="rounded-lg bg-success/10 px-3 py-2 text-xs text-success">
          {successMessage}
        </div>
      )}

      {(submitError || oauthError) && (
        <div className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">
          {submitError ?? "Unable to complete Google sign-in."}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="login-email">Email</Label>
          <Input
            id="login-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            {...register("email")}
            error={errors.email?.message}
          />
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="login-password">Password</Label>
            <Link
              href="/forgot-password"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Forgot?
            </Link>
          </div>
          <Input
            id="login-password"
            type="password"
            placeholder="********"
            autoComplete="current-password"
            {...register("password")}
            error={errors.password?.message}
          />
        </div>
        <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <Mail className="size-3.5" />
          )}
          {isSubmitting ? "Logging in..." : "Log in with Email"}
        </Button>
      </form>
    </div>
  );
}
