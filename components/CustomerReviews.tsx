"use client";

import { useEffect, useState } from "react";

interface Review {
  id: string;
  product_slug: string;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export default function CustomerReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      // ৬টি রিভিউ আনার জন্য limit=6 পাঠানো হচ্ছে
      const res = await fetch("/api/reviews?all=true&limit=6");
      const data = await res.json();
      if (data.success) {
        setReviews(data.reviews);
      }
      setLoading(false);
    };
    fetchReviews();
  }, []);

  if (loading) {
    return <div className="py-12 text-center text-gray-500">Loading reviews...</div>;
  }

  if (reviews.length === 0) {
    return null;
  }

  const renderStars = (rating: number) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <section className="bg-[#f7f5f0] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] text-gray-500">
            What our customers are saying
          </p>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl text-[var(--ink)]">
            Happy Customers, Honest Reviews
          </h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl bg-white p-8 shadow-sm border border-[var(--stone)]"
            >
              <div className="flex items-center gap-2 text-yellow-500 text-lg">
                {renderStars(review.rating)}
              </div>
              <p className="mt-4 text-gray-700 leading-relaxed">"{review.comment}"</p>
              <p className="mt-4 text-sm font-medium text-[var(--ink)]">— {review.user_name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
