import { redirect } from "next/navigation";

// /admin/system was an orphaned mock page (not linked in the sidebar
// nav at all) that overlapped with /admin/security's new content —
// integration/config status. Consolidated there instead of keeping
// two pages that would drift out of sync with each other.
export default function SystemRedirect() {
  redirect("/admin/security");
}
