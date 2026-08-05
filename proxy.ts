import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_ROLES = ["admin", "superadmin"] as const;
type AdminRole = (typeof ADMIN_ROLES)[number];

// setAll is intentionally a no-op: cookies must be written in route
// handlers / server actions where the response object reaches the client.

export default async function proxy(req: NextRequest) {
  const res = NextResponse.next();

  try {
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

    // ✅ getUser() — verifies JWT server-side. Never use getSession() for auth.
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    const protectedRoutes = ["/account", "/profile", "/checkout", "/admin"];
    const isProtected = protectedRoutes.some((route) =>
      req.nextUrl.pathname.startsWith(route)
    );

    if (isProtected && (userError || !user)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (req.nextUrl.pathname.startsWith("/admin") && user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      const role = profile?.role as AdminRole | undefined;
      if (!role || !ADMIN_ROLES.includes(role)) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
  } catch (err) {
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
