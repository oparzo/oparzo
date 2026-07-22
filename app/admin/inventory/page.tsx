"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { formatCurrency, formatVariantLabel } from "@/lib/format";

const LOW_STOCK_THRESHOLD = 5;

export default function AdminInventoryPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadInventory();
  }, []);

  async function loadInventory() {
    setLoading(true);
    setError(false);

    try {
      // Price, stock, and SKU live on each variant, not on the product
      // itself (a product can have several variants — e.g. sizes or
      // shades — each with its own stock level and price). Querying
      // `stock`/`price` directly on the product document, as this page
      // used to, returns nothing at all, since those fields don't
      // exist there.
      const data = await client.fetch(`
        *[_type=="product"] | order(name asc){
          _id,
          name,
          "brand": brand->name,
          variants[]{
            _key,
            volume, weight, size, color, shade,
            sku,
            price,
            stock
          }
        }
      `);

      setProducts(data || []);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-7xl mx-auto p-10">
      <h1 className="text-5xl font-serif mb-10">
        Inventory
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-gray-500">
          Couldn't load inventory. Try refreshing.
        </p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="space-y-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="rounded-lg border p-5"
            >
              <div className="mb-3">
                <h2 className="font-bold">{product.name}</h2>
                {product.brand && (
                  <p className="text-sm text-gray-500">{product.brand}</p>
                )}
              </div>

              {!product.variants || product.variants.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No variants configured for this product.
                </p>
              ) : (
                <div className="divide-y">
                  {product.variants.map((variant: any) => {
                    const label = formatVariantLabel(variant);
                    const lowStock =
                      (variant.stock ?? 0) < LOW_STOCK_THRESHOLD;

                    return (
                      <div
                        key={variant._key}
                        className="flex items-center justify-between py-2"
                      >
                        <div>
                          <p>{label || "Default"}</p>
                          {variant.sku && (
                            <p className="text-xs text-gray-500">
                              SKU: {variant.sku}
                            </p>
                          )}
                        </div>

                        <div className="text-right">
                          <p>{formatCurrency(variant.price)}</p>
                          <p
                            className={
                              lowStock
                                ? "text-sm font-medium text-red-600"
                                : "text-sm text-gray-500"
                            }
                          >
                            Stock: {variant.stock ?? 0}
                            {lowStock ? " (low)" : ""}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
