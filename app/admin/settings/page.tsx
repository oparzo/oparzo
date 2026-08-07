"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    // Read is public per RLS, so this can go straight through the
    // browser client — same pattern as other admin pages that read
    // real-time data (e.g. admin/coupons).
    const { data } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .single();

    setSettings(
      data ?? {
        contact_email: "",
        contact_phone: "",
        whatsapp_number: "",
        instagram_url: "",
        facebook_url: "",
        announcement_text: "",
        announcement_enabled: false,
        maintenance_mode: false,
        shipping_notes: "",
      }
    );

    setLoading(false);
  }

  function update(field: string, value: any) {
    setSettings((prev: any) => ({ ...prev, [field]: value }));
  }

  async function save() {
    setSaving(true);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      const data = await res.json();

      if (data.success) {
        setSettings(data.settings);
        setSavedAt(Date.now());
      } else {
        alert(data.error ?? "Couldn't save settings.");
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading || !settings) {
    return (
      <main className="max-w-4xl mx-auto p-10">
        <h1 className="text-5xl font-serif mb-10">Settings</h1>
        <p className="text-gray-500">Loading...</p>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-10">
      <h1 className="text-5xl font-serif mb-2">Settings</h1>
      <p className="mb-10 text-gray-500">
        Controls what customers see across the storefront — contact info, the
        announcement bar, and maintenance mode.
      </p>

      <div className="space-y-10">
        <section className="border rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <p className="mb-5 text-sm text-gray-500">
            Shown in the site footer.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <input
              value={settings.contact_email ?? ""}
              onChange={(e) => update("contact_email", e.target.value)}
              placeholder="Contact Email"
              className="border rounded-lg p-3"
            />
            <input
              value={settings.contact_phone ?? ""}
              onChange={(e) => update("contact_phone", e.target.value)}
              placeholder="Contact Phone"
              className="border rounded-lg p-3"
            />
            <input
              value={settings.whatsapp_number ?? ""}
              onChange={(e) => update("whatsapp_number", e.target.value)}
              placeholder="WhatsApp Number"
              className="border rounded-lg p-3"
            />
            <input
              value={settings.instagram_url ?? ""}
              onChange={(e) => update("instagram_url", e.target.value)}
              placeholder="Instagram URL"
              className="border rounded-lg p-3"
            />
            <input
              value={settings.facebook_url ?? ""}
              onChange={(e) => update("facebook_url", e.target.value)}
              placeholder="Facebook URL"
              className="border rounded-lg p-3"
            />
          </div>
        </section>

        <section className="border rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">Announcement Bar</h2>

          <label className="mb-4 flex items-center gap-3">
            <input
              type="checkbox"
              checked={!!settings.announcement_enabled}
              onChange={(e) => update("announcement_enabled", e.target.checked)}
            />
            Show announcement bar site-wide
          </label>

          <input
            value={settings.announcement_text ?? ""}
            onChange={(e) => update("announcement_text", e.target.value)}
            placeholder="e.g. Free concierge sourcing on all orders this week"
            className="w-full border rounded-lg p-3"
          />
        </section>

        <section className="border rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Shipping & Fulfillment Notes
          </h2>

          <p className="mb-4 text-sm text-gray-500">
            Internal reference only — checkout intentionally doesn't quote a
            fixed shipping rate ("Calculated Later, confirmed by the Concierge
            Team"), since sourcing costs vary per order. Use this for your own
            notes on typical rates/ETAs, not a customer-facing price list.
          </p>

          <textarea
            value={settings.shipping_notes ?? ""}
            onChange={(e) => update("shipping_notes", e.target.value)}
            placeholder="e.g. Inside Dhaka ~1-2 days, Outside Dhaka ~2-4 days, Express same-day on request"
            className="h-32 w-full border rounded-lg p-3"
          />
        </section>

        <section className="border rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">Maintenance Mode</h2>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={!!settings.maintenance_mode}
              onChange={(e) => update("maintenance_mode", e.target.checked)}
            />
            Site is under maintenance
          </label>

          <p className="mt-2 text-sm text-gray-500">
            Not yet enforced anywhere — flip this on and it'll be stored, but
            nothing reads it to actually block the site yet. Wiring it into the
            root layout is a follow-up if you want it.
          </p>
        </section>

        <button
          onClick={save}
          disabled={saving}
          className="rounded-xl bg-black px-8 py-4 text-white"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>

        {savedAt && <p className="text-sm text-green-600">Saved.</p>}
      </div>
    </main>
  );
}
