// Shared formatting helpers. Before this, currency and variant-label
// formatting were each reimplemented in 5+ places (checkout, cart,
// wishlist, orders, ProductCard, ProductView, create-order.ts), with
// some call sites using proper thousands-separator formatting and
// others not — so the same price could show as "৳ 12,500" on one page
// and "৳ 12500" on another. Centralizing this fixes the inconsistency
// at the source rather than patching each call site to match.

/**
 * Formats a price in Bangladeshi Taka with thousands separators.
 * formatCurrency(12500) -> "৳ 12,500"
 */
export function formatCurrency(
  amount: number | null | undefined
): string {
  const value = Number(amount ?? 0);
  return `৳ ${value.toLocaleString("en-US")}`;
}

export interface VariantLike {
  volume?: string | null;
  weight?: string | null;
  size?: string | null;
  color?: string | null;
  shade?: string | null;
}

/**
 * Builds a display label from a product variant, e.g. "500ml • Blue".
 * Returns an empty string if the variant has no displayable fields.
 */
export function formatVariantLabel(
  variant: VariantLike | null | undefined,
  separator = " • "
): string {
  if (!variant) return "";

  return [
    variant.volume,
    variant.weight,
    variant.size,
    variant.color,
    variant.shade,
  ]
    .filter(Boolean)
    .join(separator);
}
