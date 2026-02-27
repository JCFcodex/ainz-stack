/**
 * Supabase Middleware — Session Refresh
 *
 * Usage in `middleware.ts` (or `proxy.ts` for Next.js 16):
 * ```ts
 * import { updateSession } from "@/lib/supabase/middleware";
 * import type { NextRequest } from "next/server";
 *
 * export async function middleware(request: NextRequest) {
 *   return await updateSession(request);
 * }
 *
 * export const config = {
 *   matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
 * };
 * ```
 *
 * Prerequisites:
 * 1. Install: `pnpm add @supabase/supabase-js @supabase/ssr`
 * 2. Set env vars: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
 */

// import { createServerClient } from "@supabase/ssr";
// import { NextResponse, type NextRequest } from "next/server";

// export async function updateSession(request: NextRequest) {
//   let supabaseResponse = NextResponse.next({ request });
//
//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll() {
//           return request.cookies.getAll();
//         },
//         setAll(cookiesToSet) {
//           cookiesToSet.forEach(({ name, value }) =>
//             request.cookies.set(name, value),
//           );
//           supabaseResponse = NextResponse.next({ request });
//           cookiesToSet.forEach(({ name, value, options }) =>
//             supabaseResponse.cookies.set(name, value, options),
//           );
//         },
//       },
//     },
//   );
//
//   // Refresh the session — this is the key call
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();
//
//   // Optional: protect routes
//   // if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
//   //   const url = request.nextUrl.clone();
//   //   url.pathname = "/login";
//   //   return NextResponse.redirect(url);
//   // }
//
//   return supabaseResponse;
// }

import { NextResponse, type NextRequest } from "next/server";

/** Placeholder — uncomment above after installing @supabase/ssr */
export async function updateSession(request: NextRequest) {
  return NextResponse.next({ request });
}
