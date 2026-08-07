import { admin } from "@/lib/supabase/admin";

interface GetShippingFeeInput {
  destination: string | null;
  subtotal: number;
  profileId: string;
  paymentMethod: string;
}

export async function getShippingFee({
  destination,
  subtotal,
  profileId,
  paymentMethod,
}: GetShippingFeeInput): Promise<number> {
  // Default: concierge-confirmed shipping – no automatic fee
  // Admin can override via site_settings table

  try {
    const { data: settings, error } = await admin
      .from("site_settings")
      .select("key, value")
      .in("key", [
        "shipping_enabled",
        "shipping_fixed_rate",
        "shipping_free_threshold",
      ])
      .limit(3);

    if (error || !settings) {
      return 0; // concierge-confirmed default
    }

    const config: Record<string, string> = {};
    settings.forEach((s: any) => {
      config[s.key] = s.value;
    });

    const enabled = config.shipping_enabled === "true";
    if (!enabled) {
      return 0;
    }

    const freeThreshold = parseFloat(config.shipping_free_threshold) || 0;
    if (freeThreshold > 0 && subtotal >= freeThreshold) {
      return 0; // Free shipping
    }

    const fixedRate = parseFloat(config.shipping_fixed_rate) || 0;
    return fixedRate;
  } catch (error) {
    console.error("Shipping fee fetch error:", error);
    return 0; // Fallback: concierge-confirmed
  }
}
