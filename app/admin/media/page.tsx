"use client";

import Link from "next/link";

export default function AdminMediaPage() {
  const sections = [
    {
      title: "Sanity Studio",
      description: "Manage product images, banners and assets.",
      href: "/studio",
    },
    {
      title: "Products",
      description: "Browse all products.",
      href: "/admin/products",
    },
    {
      title: "Brands",
      description: "Browse all brands.",
      href: "/admin/brands",
    },
    {
      title: "Categories",
      description: "Browse all categories.",
      href: "/admin/categories",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto p-10">
      <h1 className="text-5xl font-serif mb-10">
        Media Center
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {sections.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="border rounded-xl p-8 hover:bg-gray-50 transition"
          >
            <h2 className="text-2xl font-semibold mb-2">
              {item.title}
            </h2>

            <p className="text-gray-600">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
