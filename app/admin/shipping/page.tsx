"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

export default function ShippingAdminPage() {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    shipping_enabled: false,
    shipping_fixed_rate: 0,
    shipping_free_threshold: 0,
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value")
        .in("key", [
          "shipping_enabled",
          "shipping_fixed_rate",
          "shipping_free_threshold",
        ]);

      if (error) throw error;

      const config: Record<string, string> = {};
      data?.forEach((s: any) => {
        config[s.key] = s.value;
      });

      setSettings({
        shipping_enabled: config.shipping_enabled === "true",
        shipping_fixed_rate: parseFloat(config.shipping_fixed_rate) || 0,
        shipping_free_threshold:
          parseFloat(config.shipping_free_threshold) || 0,
      });
    } catch (err) {
      console.error("Failed to load shipping settings:", err);
    } finally {
      setLoading(false);
    }
  }

  async function saveSettings(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const payload = [
        { key: "shipping_enabled", value: String(settings.shipping_enabled) },
        {
          key: "shipping_fixed_rate",
          value: String(settings.shipping_fixed_rate),
        },
        {
          key: "shipping_free_threshold",
          value: String(settings.shipping_free_threshold),
        },
      ];

      for (const item of payload) {
        await supabase
          .from("site_settings")
          .upsert({ key: item.key, value: item.value }, { onConflict: "key" });
      }

      setMessage({
        type: "success",
        text: "Shipping settings saved successfully!",
      });
    } catch (err) {
      console.error("Save error:", err);
      setMessage({
        type: "error",
        text: "Failed to save settings. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="max-w-4xl mx-auto p-10">
        <div className="text-center text-gray-500">
          Loading shipping settings...
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-10">
      <h1 className="text-3xl font-serif mb-2">Shipping Settings</h1>
      <p className="text-sm text-gray-500 mb-8">
        Configure shipping rules. Leave disabled for concierge-confirmed
        shipping.
      </p>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={saveSettings} className="space-y-6">
        {/* Enable shipping */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="shipping_enabled"
            checked={settings.shipping_enabled}
            onChange={(e) =>
              setSettings({ ...settings, shipping_enabled: e.target.checked })
            }
            className="w-5 h-5 accent-[var(--gold)]"
          />
          <label htmlFor="shipping_enabled" className="font-medium">
            Enable automatic shipping calculation
          </label>
        </div>
        <p className="text-sm text-gray-500 -mt-2 ml-8">
          Disable for concierge-confirmed shipping (recommended for OPARZO).
        </p>

        {/* Fixed Rate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fixed Shipping Rate (BDT)
          </label>
          <input
            type="number"
            min="0"
            step="10"
            disabled={!settings.shipping_enabled}
            value={settings.shipping_fixed_rate}
            onChange={(e) =>
              setSettings({
                ...settings,
                shipping_fixed_rate: parseFloat(e.target.value) || 0,
              })
            }
            className="w-48 border border-gray-300 rounded-lg px-4 py-2 disabled:opacity-50"
          />
          <p className="text-sm text-gray-400 mt-1">
            Applied to all orders when enabled.
          </p>
        </div>

        {/* Free Shipping Threshold */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Free Shipping Threshold (BDT)
          </label>
          <input
            type="number"
            min="0"
            step="100"
            disabled={!settings.shipping_enabled}
            value={settings.shipping_free_threshold}
            onChange={(e) =>
              setSettings({
                ...settings,
                shipping_free_threshold: parseFloat(e.target.value) || 0,
              })
            }
            className="w-48 border border-gray-300 rounded-lg px-4 py-2 disabled:opacity-50"
          />
          <p className="text-sm text-gray-400 mt-1">
            Orders above this amount get free shipping.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-[var(--gold)] text-[var(--ink)] px-8 py-3 rounded-lg font-medium hover:opacity-85 transition disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </form>

      <div className="mt-10 p-4 border border-[var(--stone)] rounded-lg bg-[var(--cream)]">
        <p className="text-sm text-gray-600">
          <strong>Current behavior:</strong>{" "}
          {settings.shipping_enabled
            ? `Automatic shipping: fixed rate ৳${settings.shipping_fixed_rate}${settings.shipping_free_threshold > 0 ? ` (free above ৳${settings.shipping_free_threshold})` : ""}`
            : "Concierge-confirmed shipping — no automatic fee."}
        </p>
      </div>
    </main>
  );
}
