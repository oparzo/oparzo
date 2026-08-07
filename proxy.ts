import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_ROLES = ["admin", "superadmin"] as const;
type AdminRole = (typeof ADMIN_ROLES)[number];

export default async function proxy(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  try {
    // ✅ getUser() – verifies JWT server-side
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
    // Fail closed
    console.error("[proxy] auth check failed:", err);
    // ✅ /checkout সহ সব protected route-কে /login-এ redirect
    const path = req.nextUrl.pathname;
    if (
      path.startsWith("/admin") ||
      path.startsWith("/account") ||
      path.startsWith("/profile") ||
      path.startsWith("/checkout")
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ["/account/:path*", "/profile/:path*", "/checkout/:path*", "/admin/:path*"],
};
