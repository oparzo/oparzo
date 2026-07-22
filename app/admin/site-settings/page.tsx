import { redirect } from "next/navigation";

// This page and /admin/settings were two separate mock pages covering
// the same "site settings" concept. /admin/settings is the one linked
// in the sidebar nav, so it's the canonical URL — this just redirects
// in case anything has this URL bookmarked.
export default function SiteSettingsRedirect() {
  redirect("/admin/settings");
}
