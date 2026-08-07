import { client } from "@/sanity/lib/client";
import { HttpError } from "@/lib/order/guard";

interface ResolvePriceInput {
  slug: string;
  variant: string | null;
}

interface ResolvePriceOutput {
  unit_price: number;
  name: string;
  variant_label: string | null;
}

export async function resolveUnitPrice({
  slug,
  variant,
}: ResolvePriceInput): Promise<ResolvePriceOutput> {
  // Sanity থেকে প্রোডাক্ট ডেটা আনা
  const product = await client.fetch(
    `
    *[_type == "product" && slug.current == $slug][0]{
      name,
      "variants": variants[]{
        volume,
        weight,
        size,
        color,
        shade,
        price,
        sku
      }
    }
    `,
    { slug }
  );

  if (!product) {
    throw new HttpError(404, `Product not found: ${slug}`);
  }

  let unit_price = 0;
  let variant_label: string | null = null;

  if (variant) {
    // নির্দিষ্ট ভেরিয়েন্ট খুঁজুন
    const matchedVariant = product.variants?.find((v: any) => {
      const label = [v.volume, v.weight, v.size, v.color, v.shade]
        .filter(Boolean)
        .join(" - ");
      return label === variant;
    });

    if (matchedVariant) {
      unit_price = matchedVariant.price || 0;
      variant_label = variant;
    } else {
      // ❌ variant না পাওয়া গেলে fallback না করে এরর থ্রো করুন
      throw new HttpError(
        400,
        `Variant "${variant}" not found for product "${product.name}"`
      );
    }
  } else {
    // ✅ কোনো variant না থাকলে প্রথম variant-এর দাম
    const first = product.variants?.[0];
    if (!first) {
      throw new HttpError(400, `Product "${product.name}" has no variants`);
    }
    unit_price = first.price || 0;
    variant_label = [
      first.volume,
      first.weight,
      first.size,
      first.color,
      first.shade,
    ]
      .filter(Boolean)
      .join(" - ");
  }

  return {
    unit_price,
    name: product.name,
    variant_label,
  };
}
