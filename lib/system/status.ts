import { getPaymentProvidersStatus } from "@/lib/payment/config";

// Real, evidence-based status checks — not decorative. Each one reflects
// something actually verifiable from the running environment or the
// codebase itself, not a hardcoded "✅ Enabled" string.

export function getIntegrationStatus() {
  return [
    {
      name: "Supabase",
      status: process.env.NEXT_PUBLIC_SUPABASE_URL ? "connected" : "missing",
      detail: "Database, auth, storage.",
    },
    {
      name: "Supabase (service role)",
      status: process.env.SUPABASE_SERVICE_ROLE_KEY ? "connected" : "missing",
      detail: "Used by admin APIs and order creation to bypass RLS safely.",
    },
    {
      name: "Sanity CMS",
      status: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
        ? "connected"
        : "missing",
      detail: "Products, brands, categories, banners.",
    },
    ...getPaymentProvidersStatus().map((p) => ({
      name: p.name,
      status: p.status === "active" ? "connected" : "missing",
      detail:
        p.requiredEnvVars.length > 0
          ? `Needs: ${p.requiredEnvVars.join(", ")}`
          : "Always available.",
    })),
  ];
}

// This is intentionally a static, dated list rather than a live
// self-test — most of these (RLS policies, auth flow) can't be verified
// by the running app calling itself. It's a changelog of real security
// work done, kept next to the admin panel instead of buried in commit
// history, so you (or the next engineer) can see what's actually in
// place without re-deriving it from scratch.
export function getSecurityChecklist() {
  return [
    {
      item: "Admin routes gated by session + role check",
      status: "done",
      detail:
        "proxy.ts checks profiles.role = 'admin' for /admin/* and /api/admin/*.",
    },
    {
      item: "Admin API routes double-checked server-side",
      status: "done",
      detail: "requireAdmin() in each /api/admin/* route, not just the proxy.",
    },
    {
      item: "Order creation can't be spoofed to another account",
      status: "done",
      detail:
        "profile_id is derived from the session server-side, never trusted from the request body.",
    },
    {
      item: "Coupon discounts re-validated server-side",
      status: "done",
      detail:
        "Active/expiry/usage-limit re-checked and discount recomputed at order time, not trusted from the client.",
    },
    {
      item: "Coupon writes restricted to admins (RLS)",
      status: "verify",
      detail:
        "Migration 008 fixes this — confirm it's actually applied to the live database.",
    },
    {
      item: "RLS policies on profiles/addresses/orders/order_items/wishlist/cart_items",
      status: "verify",
      detail:
        "Enabled per earlier session notes, but not version-controlled — see supabase/SCHEMA.md.",
    },
    {
      item: "New tables (site_settings, newsletter_subscribers) have RLS from creation",
      status: "done",
      detail: "Public read where needed, admin-only or insert-only writes.",
    },
    {
      item: "No secrets committed to the repo",
      status: "done",
      detail:
        ".gitignore excludes .env* — confirmed in the repo. Just don't override that per-file.",
    },
  ];
}
