"use client";

import { useState } from "react";
import { client } from "@/sanity/lib/client";

export default function AdminSearchPage() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<any[]>([]);

  async function search() {
    const data = await client.fetch(
      `*[_type=="product" && name match $q]{
        _id,
        name,
        brand,
        price,
        currency
      }`,
      {
        q: `*${keyword}*`,
      }
    );

    setResults(data || []);
  }

  return (
    <main className="max-w-6xl mx-auto p-10">
      <h1 className="text-5xl font-serif mb-8">
        Product Search
      </h1>

      <div className="flex gap-4 mb-10">
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search products..."
          className="border flex-1 p-3 rounded"
        />

        <button
          onClick={search}
          className="bg-black text-white px-8 rounded"
        >
          Search
        </button>
      </div>

      <div className="space-y-4">
        {results.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg p-5"
          >
            <h2 className="font-bold">{item.name}</h2>

            <p>{item.brand}</p>

            <p>
              {item.currency} {item.price}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
