"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { emailTemplates, sendEmail } from "@/lib/email";
import { env } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type AuthField = "name" | "email" | "password";

export type AuthResult = {
  success: boolean;
  message?: string;
  error?: string;
  fieldErrors?: Partial<Record<AuthField, string>>;
};

function getFieldError(
  fieldErrors: Record<string, string[] | undefined>,
  field: AuthField,
) {
  return fieldErrors[field]?.[0];
}

export async function login(
  _prevState: AuthResult | null,
  formData: FormData,
): Promise<AuthResult> {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = loginSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      success: false,
      error: "Please check your credentials.",
      fieldErrors: {
        email: getFieldError(fieldErrors, "email"),
        password: getFieldError(fieldErrors, "password"),
      },
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  redirect("/dashboard");
}

export async function signup(
  _prevState: AuthResult | null,
  formData: FormData,
): Promise<AuthResult> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = signupSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      success: false,
      error: "Please correct the highlighted fields.",
      fieldErrors: {
        name: getFieldError(fieldErrors, "name"),
        email: getFieldError(fieldErrors, "email"),
        password: getFieldError(fieldErrors, "password"),
      },
    };
  }

  const normalizedName = parsed.data.name.trim();
  const [firstName, ...lastParts] = normalizedName.split(/\s+/);
  const lastName = lastParts.join(" ") || null;

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: { full_name: normalizedName },
      emailRedirectTo: `${env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }

  if (data.user) {
    const { error: profileError } = await supabase.from("profiles").upsert(
      {
        id: data.user.id,
        email: parsed.data.email,
        first_name: firstName ?? null,
        last_name: lastName,
        full_name: normalizedName,
      },
      { onConflict: "id" },
    );

    if (profileError) {
      return { success: false, error: profileError.message };
    }

    await sendEmail({
      userId: data.user.id,
      template: "welcome",
      to: parsed.data.email,
      subject: "Welcome to AinzStack",
      html: emailTemplates.welcome({ name: normalizedName }),
    });
  }

  redirect("/login?message=Check your email to verify your account");
}

export async function forgotPassword(
  _prevState: AuthResult | null,
  formData: FormData,
): Promise<AuthResult> {
  const raw = { email: formData.get("email") };

  const parsed = forgotPasswordSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      success: false,
      error: "Please enter a valid email address.",
      fieldErrors: {
        email: getFieldError(fieldErrors, "email"),
      },
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${env.NEXT_PUBLIC_APP_URL}/login?reset=1`,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return {
    success: true,
    message: "Password reset email sent. Check your inbox.",
  };
}

export async function logout(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();

  redirect("/login");
}

export async function loginWithGoogle(): Promise<AuthResult> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,
      queryParams: {
        prompt: "select_account",
      },
    },
  });

  if (error || !data.url) {
    return {
      success: false,
      error: error?.message ?? "Unable to start Google sign-in.",
    };
  }

  redirect(data.url);
}