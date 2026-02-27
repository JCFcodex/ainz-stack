import { z } from "zod";

/**
 * Server-side environment variables schema.
 * These are validated at build/start time and will crash
 * the app immediately if missing or invalid.
 */
const serverSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  // Supabase
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  // Stripe
  STRIPE_SECRET_KEY: z.string().min(1).optional(),
  STRIPE_WEBHOOK_SECRET: z.string().min(1).optional(),
});

/**
 * Client-side environment variables schema.
 * Must be prefixed with NEXT_PUBLIC_ to be exposed to the browser.
 */
const clientSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_APP_NAME: z.string().default("AinzStack"),
  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),
  // Stripe
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1).optional(),
});

/**
 * Validate and export typed environment variables.
 *
 * Usage:
 * ```ts
 * import { env } from "@/lib/env";
 * console.log(env.NEXT_PUBLIC_APP_NAME);
 * ```
 */
const merged = serverSchema.merge(clientSchema);

export type Env = z.infer<typeof merged>;

function getEnv(): Env {
  const parsed = merged.safeParse(process.env);

  if (!parsed.success) {
    console.error(
      "❌ Invalid environment variables:",
      parsed.error.flatten().fieldErrors,
    );

    // In production, crash immediately. In dev, warn but continue.
    if (process.env.NODE_ENV === "production") {
      throw new Error("Invalid environment variables");
    }
  }

  return (parsed.data ?? process.env) as Env;
}

export const env = getEnv();
