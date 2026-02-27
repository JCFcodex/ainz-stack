/**
 * Auth Callback Route Handler
 *
 * Handles the OAuth callback from Supabase/Google.
 * Exchanges the auth code for a session and redirects.
 *
 * URL: /api/auth/callback?code=xxx
 */

import { NextResponse, type NextRequest } from "next/server";
// import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    // TODO: Uncomment when Supabase is configured
    // const supabase = await createClient();
    // const { error } = await supabase.auth.exchangeCodeForSession(code);
    //
    // if (!error) {
    //   return NextResponse.redirect(`${origin}${next}`);
    // }
  }

  // Fallback: redirect to dashboard (or login on error)
  return NextResponse.redirect(`${origin}${next}`);
}
