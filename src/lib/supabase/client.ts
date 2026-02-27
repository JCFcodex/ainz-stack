import { createBrowserClient } from "@supabase/ssr";
import { getRequiredEnv } from "@/lib/env";
import type { Database } from "@/types/supabase";

export function createClient() {
  return createBrowserClient<Database>(
    getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
    getRequiredEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  );
}
