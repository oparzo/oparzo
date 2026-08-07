"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    loadReviews();
  }, []);

  async function loadReviews() {
    const data = await client.fetch(`
      *[_type=="review"] | order(_createdAt desc){
        _id,
        customerName,
        rating,
        comment,
        product->{
          name
        }
      }
    `);

    setReviews(data || []);
  }

  return (
    <main className="max-w-7xl mx-auto p-10">
      <h1 className="text-5xl font-serif mb-10">Reviews</h1>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review._id} className="border rounded-lg p-5">
            <h2 className="font-bold">{review.customerName}</h2>

            <p>Product: {review.product?.name}</p>

            <p>Rating: ⭐ {review.rating}/5</p>

            <p className="mt-3 text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
