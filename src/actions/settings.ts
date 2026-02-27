"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const profileSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
});

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
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const booleanField = z.preprocess(
  (value) => value === "true" || value === "on" || value === "1",
  z.boolean(),
);

const notificationSchema = z.object({
  marketingEmails: booleanField,
  paymentAlerts: booleanField,
  securityAlerts: booleanField,
});

type ActionField =
  | "firstName"
  | "lastName"
  | "currentPassword"
  | "newPassword"
  | "confirmPassword";

export type SettingsActionResult = {
  success: boolean;
  message?: string;
  error?: string;
  fieldErrors?: Partial<Record<ActionField, string>>;
};

function firstError(
  errors: Record<string, string[] | undefined>,
  field: ActionField,
) {
  return errors[field]?.[0];
}

export async function updateProfile(
  _prevState: SettingsActionResult | null,
  formData: FormData,
): Promise<SettingsActionResult> {
  const parsed = profileSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
  });

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      success: false,
      error: "Please correct the highlighted fields.",
      fieldErrors: {
        firstName: firstError(fieldErrors, "firstName"),
        lastName: firstError(fieldErrors, "lastName"),
      },
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) {
    return { success: false, error: "You must be logged in." };
  }

  const fullName = `${parsed.data.firstName} ${parsed.data.lastName}`.trim();

  const { error: profileError } = await supabase.from("profiles").upsert(
    {
      id: user.id,
      email: user.email,
      first_name: parsed.data.firstName,
      last_name: parsed.data.lastName,
      full_name: fullName,
    },
    { onConflict: "id" },
  );

  if (profileError) {
    return { success: false, error: profileError.message };
  }

  const { error: metadataError } = await supabase.auth.updateUser({
    data: {
      full_name: fullName,
      first_name: parsed.data.firstName,
      last_name: parsed.data.lastName,
    },
  });

  if (metadataError) {
    return { success: false, error: metadataError.message };
  }

  return { success: true, message: "Profile updated successfully." };
}

export async function changePassword(
  _prevState: SettingsActionResult | null,
  formData: FormData,
): Promise<SettingsActionResult> {
  const parsed = changePasswordSchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      success: false,
      error: "Please correct the highlighted fields.",
      fieldErrors: {
        currentPassword: firstError(fieldErrors, "currentPassword"),
        newPassword: firstError(fieldErrors, "newPassword"),
        confirmPassword: firstError(fieldErrors, "confirmPassword"),
      },
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) {
    return { success: false, error: "You must be logged in." };
  }

  const { error: verifyError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: parsed.data.currentPassword,
  });

  if (verifyError) {
    return {
      success: false,
      error: "Current password is incorrect.",
      fieldErrors: {
        currentPassword: "Current password is incorrect.",
      },
    };
  }

  const { error: updateError } = await supabase.auth.updateUser({
    password: parsed.data.newPassword,
  });

  if (updateError) {
    return { success: false, error: updateError.message };
  }

  return { success: true, message: "Password updated successfully." };
}

export async function updateNotificationPreferences(
  _prevState: SettingsActionResult | null,
  formData: FormData,
): Promise<SettingsActionResult> {
  const parsed = notificationSchema.safeParse({
    marketingEmails: formData.get("marketingEmails"),
    paymentAlerts: formData.get("paymentAlerts"),
    securityAlerts: formData.get("securityAlerts"),
  });

  if (!parsed.success) {
    return { success: false, error: "Invalid notification settings." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "You must be logged in." };
  }

  const { error } = await supabase.from("notification_preferences").upsert(
    {
      user_id: user.id,
      marketing_emails: parsed.data.marketingEmails,
      payment_alerts: parsed.data.paymentAlerts,
      security_alerts: parsed.data.securityAlerts,
    },
    { onConflict: "user_id" },
  );

  if (error) {
    return { success: false, error: error.message };
  }

  return {
    success: true,
    message: "Notification preferences saved.",
  };
}
