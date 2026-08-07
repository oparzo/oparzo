"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { formatCurrency } from "@/lib/format";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    setError(false);

    try {
      // price/stock live on each variant, not on the product document
      // itself — this previously queried `price`/`currency`/`stockStatus`
      // directly on the product, which don't exist there at all, so
      // every row silently showed blank values.
      const data = await client.fetch(`
        *[_type=="product"] | order(_createdAt desc){
          _id,
          name,
          slug,
          "brand": brand->name,
          "category": category->name,
          variants[]{ price, stock }
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
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-5xl font-serif">Products</h1>

        <Link
          href="/studio"
          className="rounded-lg bg-black text-white px-5 py-3"
        >
          + Add Product
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-gray-500">Couldn't load products. Try refreshing.</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">
          No products yet. Add your first one in the Studio.
        </p>
      ) : (
        <div className="space-y-4">
          {products.map((product) => {
            const variants = product.variants ?? [];
            const price = variants[0]?.price ?? 0;
            const totalStock = variants.reduce(
              (sum: number, v: any) => sum + (v.stock ?? 0),
              0
            );

            return (
              <div
                key={product._id}
                className="rounded-xl border p-6 flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-semibold">{product.name}</h2>

                  <p className="text-gray-500">
                    {product.brand ?? "-"} • {product.category ?? "-"}
                  </p>

                  <p className="mt-2">
                    {formatCurrency(price)}
                    {variants.length > 1 && (
                      <span className="text-sm text-gray-500">
                        {" "}
                        ({variants.length} variants)
                      </span>
                    )}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    {totalStock > 0 ? `${totalStock} in stock` : "Out of stock"}
                  </p>
                </div>

                <Link
                  href={`/products/${product.slug.current}`}
                  className="border rounded-lg px-4 py-2"
                >
                  View
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
