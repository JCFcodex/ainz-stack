"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import Link from "next/link";
import { Mail, Loader2 } from "lucide-react";
import { loginWithGoogle, signup } from "@/actions/auth";
import { GoogleIcon } from "@/components/icons/google";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Include at least one uppercase letter")
    .regex(/[0-9]/, "Include at least one number"),
});

type SignupValues = z.infer<typeof signupSchema>;

export function SignupForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [oauthPending, setOauthPending] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
  });

  async function onSubmit(data: SignupValues) {
    setSubmitError(null);
    clearErrors();

    const formData = new FormData();
    formData.set("name", data.name);
    formData.set("email", data.email);
    formData.set("password", data.password);

    const result = await signup(null, formData);
    if (!result.success) {
      if (result.fieldErrors?.name) {
        setError("name", { message: result.fieldErrors.name });
      }
      if (result.fieldErrors?.email) {
        setError("email", { message: result.fieldErrors.email });
      }
      if (result.fieldErrors?.password) {
        setError("password", { message: result.fieldErrors.password });
      }

      setSubmitError(result.error ?? "Unable to create your account.");
    }
  }

  async function handleGoogleSignup() {
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
        onClick={handleGoogleSignup}
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

      {submitError && (
        <div className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="signup-name">Full name</Label>
          <Input
            id="signup-name"
            placeholder="Jane Doe"
            autoComplete="name"
            {...register("name")}
            error={errors.name?.message}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="signup-email">Email</Label>
          <Input
            id="signup-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            spellCheck={false}
            {...register("email")}
            error={errors.email?.message}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="signup-password">Password</Label>
          <Input
            id="signup-password"
            type="password"
            placeholder="********"
            autoComplete="new-password"
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
          {isSubmitting ? "Creating account..." : "Create Account"}
        </Button>
      </form>

      <p className="text-center text-xs text-muted-foreground">
        By signing up, you agree to our{" "}
        <Link href="/terms" className="underline hover:text-foreground">
          Terms
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline hover:text-foreground">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
