"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";
import { forgotPassword } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(data: ForgotPasswordValues) {
    setSubmitError(null);
    setSuccessMessage(null);
    clearErrors();

    const formData = new FormData();
    formData.set("email", data.email);

    const result = await forgotPassword(null, formData);
    if (!result.success) {
      if (result.fieldErrors?.email) {
        setError("email", { message: result.fieldErrors.email });
      }

      setSubmitError(result.error ?? "Unable to send reset email.");
      return;
    }

    setSuccessMessage(result.message ?? "Check your email for reset steps.");
  }

  if (successMessage) {
    return (
      <div className="flex flex-col items-center gap-3 py-4 text-center">
        <div className="flex size-10 items-center justify-center rounded-full bg-success/10">
          <CheckCircle2 className="size-5 text-success" />
        </div>
        <div>
          <p className="text-sm font-medium">Check your email</p>
          <p className="mt-1 text-xs text-muted-foreground">{successMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {submitError && (
        <div className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="reset-email">Email</Label>
          <Input
            id="reset-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            spellCheck={false}
            {...register("email")}
            error={errors.email?.message}
          />
        </div>
        <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <Mail className="size-3.5" />
          )}
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>
    </div>
  );
}
