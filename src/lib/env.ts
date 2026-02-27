import { z } from "zod";

const serverSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  STRIPE_SECRET_KEY: z.string().min(1).optional(),
  STRIPE_WEBHOOK_SECRET: z.string().min(1).optional(),
  STRIPE_PRO_PRICE_ID: z.string().min(1).optional(),
  STRIPE_ENTERPRISE_PRICE_ID: z.string().min(1).optional(),
  RESEND_API_KEY: z.string().min(1).optional(),
  RESEND_FROM_EMAIL: z.string().min(1).optional(),
});

const clientSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_APP_NAME: z.string().default("AinzStack"),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1).optional(),
});

const merged = serverSchema.merge(clientSchema);

export type Env = z.infer<typeof merged>;

function getEnv(): Env {
  const defaults: Partial<Env> = {
    NODE_ENV: "development",
    NEXT_PUBLIC_APP_URL: "http://localhost:3000",
    NEXT_PUBLIC_APP_NAME: "AinzStack",
  };
  const isProduction = process.env.NODE_ENV === "production";

  const parsed = merged.safeParse({
    ...defaults,
    ...process.env,
  });

  if (!parsed.success) {
    console.error(
      "Invalid environment variables:",
      parsed.error.flatten().fieldErrors,
    );

    if (isProduction) {
      throw new Error("Invalid environment variables");
    }
  }

  return (parsed.data ?? defaults) as Env;
}

export const env = getEnv();

export function getRequiredEnv<K extends keyof Env>(key: K): NonNullable<Env[K]> {
  const value = env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${String(key)}`);
  }

  return value as NonNullable<Env[K]>;
}
