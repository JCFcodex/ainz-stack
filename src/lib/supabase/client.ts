/**
 * Supabase Client — Browser (Client Components)
 *
 * Usage:
 * ```ts
 * import { createClient } from "@/lib/supabase/client";
 * const supabase = createClient();
 * ```
 *
 * Prerequisites:
 * 1. Install: `pnpm add @supabase/supabase-js @supabase/ssr`
 * 2. Set env vars: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
 */

// import { createBrowserClient } from "@supabase/ssr";

// export function createClient() {
//   return createBrowserClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//   );
// }

/** Placeholder — uncomment above after installing @supabase/ssr */
export function createClient() {
  console.warn(
    "[AinzStack] Supabase not configured. Install @supabase/ssr and set env vars.",
  );
  return null;
}
