"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    const data = await client.fetch(`
      *[_type=="category"] | order(name asc){
        _id,
        name,
        slug
      }
    `);

    setCategories(data);
  }

  return (
    <main className="max-w-7xl mx-auto p-10">
      <h1 className="text-5xl font-serif mb-10">Categories</h1>

      <div className="space-y-4">
        {categories.map((category) => (
          <div
            key={category._id}
            className="border rounded-lg p-5 flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold">{category.name}</h2>

              <p className="text-gray-500">
                /category/{category.slug?.current}
              </p>
            </div>

            <Link
              href={`/category/${category.slug?.current}`}
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
