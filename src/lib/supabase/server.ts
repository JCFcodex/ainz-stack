/**
 * Supabase Client — Server (Server Components, Route Handlers, Server Actions)
 *
 * Usage:
 * ```ts
 * import { createClient } from "@/lib/supabase/server";
 * const supabase = await createClient();
 * ```
 *
 * Prerequisites:
 * 1. Install: `pnpm add @supabase/supabase-js @supabase/ssr`
 * 2. Set env vars: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
 */

// import { createServerClient } from "@supabase/ssr";
// import { cookies } from "next/headers";

// export async function createClient() {
//   const cookieStore = await cookies();
//
//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll() {
//           return cookieStore.getAll();
//         },
//         setAll(cookiesToSet) {
//           try {
//             cookiesToSet.forEach(({ name, value, options }) =>
//               cookieStore.set(name, value, options),
//             );
//           } catch {
//             // Called from Server Component — ignore
//           }
//         },
//       },
//     },
//   );
// }

/** Placeholder — uncomment above after installing @supabase/ssr */
export async function createClient() {
  console.warn(
    "[AinzStack] Supabase not configured. Install @supabase/ssr and set env vars.",
  );
  return null;
}
