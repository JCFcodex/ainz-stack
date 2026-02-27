"use server";

/**
 * Auth Server Actions
 *
 * These actions are scaffolded and ready to wire up to Supabase Auth.
 * Each action follows the pattern: validate → call Supabase → return result.
 *
 * Prerequisites:
 * 1. Install: `pnpm add @supabase/supabase-js @supabase/ssr`
 * 2. Uncomment the Supabase client in `lib/supabase/server.ts`
 * 3. Set env vars in `.env.local`
 */

import { z } from "zod";
import { redirect } from "next/navigation";

// ─── Schemas ───
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

// ─── Types ───
export type AuthResult = {
  success: boolean;
  error?: string;
};

// ─── Actions ───

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
    return { success: false, error: parsed.error.errors[0].message };
  }

  // TODO: Uncomment when Supabase is configured
  // const supabase = await createClient();
  // const { error } = await supabase.auth.signInWithPassword({
  //   email: parsed.data.email,
  //   password: parsed.data.password,
  // });
  //
  // if (error) {
  //   return { success: false, error: error.message };
  // }

  // Placeholder: simulate success
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
    return { success: false, error: parsed.error.errors[0].message };
  }

  // TODO: Uncomment when Supabase is configured
  // const supabase = await createClient();
  // const { error } = await supabase.auth.signUp({
  //   email: parsed.data.email,
  //   password: parsed.data.password,
  //   options: {
  //     data: { full_name: parsed.data.name },
  //   },
  // });
  //
  // if (error) {
  //   return { success: false, error: error.message };
  // }

  // Placeholder: simulate success
  redirect("/login?message=Check your email to verify your account");
}

export async function forgotPassword(
  _prevState: AuthResult | null,
  formData: FormData,
): Promise<AuthResult> {
  const raw = { email: formData.get("email") };

  const parsed = forgotPasswordSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0].message };
  }

  // TODO: Uncomment when Supabase is configured
  // const supabase = await createClient();
  // const { error } = await supabase.auth.resetPasswordForEmail(
  //   parsed.data.email,
  //   { redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password` },
  // );
  //
  // if (error) {
  //   return { success: false, error: error.message };
  // }

  return { success: true };
}

export async function logout(): Promise<void> {
  // TODO: Uncomment when Supabase is configured
  // const supabase = await createClient();
  // await supabase.auth.signOut();

  redirect("/login");
}

export async function loginWithGoogle(): Promise<void> {
  // TODO: Uncomment when Supabase is configured
  // const supabase = await createClient();
  // const { data, error } = await supabase.auth.signInWithOAuth({
  //   provider: "google",
  //   options: {
  //     redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,
  //   },
  // });
  //
  // if (data.url) {
  //   redirect(data.url);
  // }

  redirect("/dashboard");
}
