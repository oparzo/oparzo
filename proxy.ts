import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Roles that grant admin entry. Keep this list centralized so RLS policies
// in Supabase can mirror it. See postgres policies in supabase/migrations/.
const ADMIN_ROLES = ["admin", "superadmin"] as const;
type AdminRole = (typeof ADMIN_ROLES)[number];

// setAll is intentionally a no-op: cookies must be written in route
// handlers / server actions where the response object reaches the client.
// https://supabase.com/docs/guides/auth/server-side/nextjs
export default async function proxy(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: () => {},
      },
    }
  );

  try {
    const { data: { session } } = await supabase.auth.getSession();

    const protectedRoutes = ["/account", "/profile", "/checkout", "/admin"];
    const isProtected = protectedRoutes.some((route) =>
      req.nextUrl.pathname.startsWith(route)
    );

    if (isProtected && !session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (req.nextUrl.pathname.startsWith("/admin") && session) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      const role = profile?.role as AdminRole | undefined;

      if (!role || !ADMIN_ROLES.includes(role)) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
  } catch (err) {
    // Fail closed: if the auth layer is unreachable, deny protected routes.
    console.error("[proxy] auth check failed:", err);
    if (
      req.nextUrl.pathname.startsWith("/admin") ||
      req.nextUrl.pathname.startsWith("/account")
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ["/account/:path*", "/profile/:path*", "/checkout/:path*", "/admin/:path*"],
};
