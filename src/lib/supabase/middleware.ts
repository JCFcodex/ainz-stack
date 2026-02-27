import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { env } from "@/lib/env";
import type { Database } from "@/types/supabase";

const authRoutes = new Set(["/login", "/signup", "/forgot-password"]);

function withCookies(from: NextResponse, to: NextResponse) {
  const cookies = from.cookies.getAll();
  for (const cookie of cookies) {
    to.cookies.set(cookie);
  }
}

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return response;
  }

  const supabase = createServerClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  let userId: string | null = null;
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    userId = user?.id ?? null;
  } catch {
    userId = null;
  }

  const pathname = request.nextUrl.pathname;
  const isDashboardRoute =
    pathname === "/dashboard" || pathname.startsWith("/dashboard/");
  const isAuthRoute = authRoutes.has(pathname);

  if (!userId && isDashboardRoute) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set(
      "next",
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
    );

    const redirectResponse = NextResponse.redirect(loginUrl);
    withCookies(response, redirectResponse);
    return redirectResponse;
  }

  if (userId && isAuthRoute) {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = "/dashboard";
    dashboardUrl.searchParams.delete("next");
    const redirectResponse = NextResponse.redirect(dashboardUrl);
    withCookies(response, redirectResponse);
    return redirectResponse;
  }

  return response;
}
