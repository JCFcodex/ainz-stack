# Authentication

AinzStack uses Supabase Auth with Next.js App Router and server-safe session handling.

## Architecture

- Request guard entrypoint: `src/proxy.ts`
- Session and redirect logic: `src/lib/supabase/middleware.ts`
- Server client helper: `src/lib/supabase/server.ts`
- Browser client helper: `src/lib/supabase/client.ts`

`src/proxy.ts` delegates to `updateSession`, which:

- refreshes auth cookies
- protects `/dashboard` routes for signed-in users
- redirects unauthenticated users to `/login`
- redirects authenticated users away from auth-only pages

## Auth Flows

- Email/password sign up and login
- Forgot password and reset flow
- Google OAuth login

Primary auth pages:

- `src/app/(auth)/login/page.tsx`
- `src/app/(auth)/signup/page.tsx`
- `src/app/(auth)/forgot-password/page.tsx`

## Google OAuth Setup

1. Open Supabase Dashboard -> Authentication -> Providers.
2. Enable Google provider.
3. Add Google OAuth client ID and client secret from Google Cloud Console.
4. Ensure callback URLs are configured in Supabase and Google Cloud.

## Route Protection Behavior

- `/dashboard` and nested dashboard routes require a valid session.
- When no session exists, users are redirected to `/login?next=<route>`.
- When a session exists, visiting auth pages redirects to `/dashboard`.
