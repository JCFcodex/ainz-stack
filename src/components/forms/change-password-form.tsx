"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { KeyRound, Loader2 } from "lucide-react";
import { changePassword } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, "Current password is required"),
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Include at least one uppercase letter")
      .regex(/[0-9]/, "Include at least one number"),
    confirmPassword: z.string().min(6, "Confirm your new password"),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ChangePasswordValues = z.infer<typeof changePasswordSchema>;

export function ChangePasswordForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
  });

  async function onSubmit(values: ChangePasswordValues) {
    setServerError(null);
    setSuccessMessage(null);
    clearErrors();

    const formData = new FormData();
    formData.set("currentPassword", values.currentPassword);
    formData.set("newPassword", values.newPassword);
    formData.set("confirmPassword", values.confirmPassword);

    const result = await changePassword(null, formData);
    if (!result.success) {
      if (result.fieldErrors?.currentPassword) {
        setError("currentPassword", {
          message: result.fieldErrors.currentPassword,
        });
      }
      if (result.fieldErrors?.newPassword) {
        setError("newPassword", { message: result.fieldErrors.newPassword });
      }
      if (result.fieldErrors?.confirmPassword) {
        setError("confirmPassword", {
          message: result.fieldErrors.confirmPassword,
        });
      }

      setServerError(result.error ?? "Unable to update password.");
      return;
    }

    reset();
    setSuccessMessage(result.message ?? "Password updated.");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {serverError && (
        <div className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">
          {serverError}
        </div>
      )}
      {successMessage && (
        <div className="rounded-lg bg-success/10 px-3 py-2 text-xs text-success">
          {successMessage}
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="current-pw">Current password</Label>
        <Input
          id="current-pw"
          type="password"
          autoComplete="current-password"
          placeholder="********"
          {...register("currentPassword")}
          error={errors.currentPassword?.message}
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="new-pw">New password</Label>
        <Input
          id="new-pw"
          type="password"
          autoComplete="new-password"
          placeholder="********"
          {...register("newPassword")}
          error={errors.newPassword?.message}
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="confirm-pw">Confirm password</Label>
        <Input
          id="confirm-pw"
          type="password"
          autoComplete="new-password"
          placeholder="********"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
      </div>

      <Button size="sm" type="submit" className="gap-2" disabled={isSubmitting}>
        {isSubmitting ? (
          <Loader2 className="size-3.5 animate-spin" />
        ) : (
          <KeyRound className="size-3.5" />
        )}
        {isSubmitting ? "Updating..." : "Update Password"}
      </Button>
    </form>
  );
}
