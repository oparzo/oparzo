import { redirect } from "next/navigation";

// This was a mock page, orphaned from the sidebar nav entirely — not
// linked anywhere. The alerts it would show (pending orders, pending
// requests, low stock) are the same things a solo-founder needs to see
// first thing, so they now live directly on the Dashboard's "Needs
// Attention" section instead of a separate page nobody would remember
// to check.
export default function NotificationsRedirect() {
  redirect("/admin/dashboard");
}
