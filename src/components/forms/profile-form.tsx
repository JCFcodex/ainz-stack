"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Save } from "lucide-react";
import { updateProfile } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const profileSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
});

type ProfileValues = z.infer<typeof profileSchema>;

type ProfileFormProps = {
  defaultFirstName?: string | null;
  defaultLastName?: string | null;
};

export function ProfileForm({
  defaultFirstName = "",
  defaultLastName = "",
}: ProfileFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: defaultFirstName ?? "",
      lastName: defaultLastName ?? "",
    },
  });

  async function onSubmit(data: ProfileValues) {
    setServerError(null);
    setSuccessMessage(null);
    clearErrors();

    const formData = new FormData();
    formData.set("firstName", data.firstName);
    formData.set("lastName", data.lastName);

    const result = await updateProfile(null, formData);
    if (!result.success) {
      if (result.fieldErrors?.firstName) {
        setError("firstName", { message: result.fieldErrors.firstName });
      }
      if (result.fieldErrors?.lastName) {
        setError("lastName", { message: result.fieldErrors.lastName });
      }

      setServerError(result.error ?? "Unable to update profile.");
      return;
    }

    setSuccessMessage(result.message ?? "Profile updated.");
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

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="profile-first">First name</Label>
          <Input
            id="profile-first"
            autoComplete="given-name"
            {...register("firstName")}
            error={errors.firstName?.message}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="profile-last">Last name</Label>
          <Input
            id="profile-last"
            autoComplete="family-name"
            {...register("lastName")}
            error={errors.lastName?.message}
          />
        </div>
      </div>

      <Button size="sm" type="submit" className="gap-2" disabled={isSubmitting}>
        {isSubmitting ? (
          <Loader2 className="size-3.5 animate-spin" />
        ) : (
          <Save className="size-3.5" />
        )}
        {isSubmitting ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}
