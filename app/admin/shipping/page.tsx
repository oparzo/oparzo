import { redirect } from "next/navigation";

// Was a static page showing fictional fixed shipping rates that
// contradicted how checkout actually works (concierge-confirmed,
// not fixed-rate). Consolidated into Settings as real, editable
// internal notes instead. See migration 011 and app/admin/settings.
export default function ShippingRedirect() {
  redirect("/admin/settings");
}
