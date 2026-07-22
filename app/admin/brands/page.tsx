"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState<any[]>([]);

  useEffect(() => {
    loadBrands();
  }, []);

  async function loadBrands() {
    const data = await client.fetch(`
      *[_type=="brand"] | order(name asc){
        _id,
        name,
        slug
      }
    `);

    setBrands(data);
  }

  return (
    <main className="max-w-7xl mx-auto p-10">
      <h1 className="text-5xl font-serif mb-10">
        Brands
      </h1>

      <div className="space-y-4">
        {brands.map((brand) => (
          <div
            key={brand._id}
            className="border rounded-lg p-5 flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold">{brand.name}</h2>
              <p className="text-gray-500">
                /brands/{brand.slug?.current}
              </p>
            </div>

            <Link
              href={`/brands/${brand.slug?.current}`}
              className="border px-4 py-2 rounded"
            >
              View
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
