"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

interface Review {
  id: string;
  product_slug: string;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface ProductReviewsProps {
  productSlug: string;
}

export default function ProductReviews({ productSlug }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", user.id)
          .single();
        if (profile?.full_name) {
          setUserName(profile.full_name);
        }
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await fetch(`/api/reviews?productSlug=${productSlug}`);
      const data = await res.json();
      if (data.success) {
        setReviews(data.reviews);
      }
      setLoading(false);
    };
    fetchReviews();
  }, [productSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) {
      setMessage({ type: "error", text: "Please enter your name" });
      return;
    }
    if (!comment.trim()) {
      setMessage({ type: "error", text: "Please write a comment" });
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_slug: productSlug,
          user_name: userName,
          rating,
          comment,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setMessage({
          type: "success",
          text: "Thank you! Your review is pending approval.",
        });
        setComment("");
        setRating(5);
      } else {
        setMessage({
          type: "error",
          text: data.message || "Failed to submit review",
        });
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-8 text-center text-gray-500">Loading reviews...</div>
    );
  }

  const renderStars = (rating: number) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <section className="mt-16 border-t border-[var(--stone)] pt-12">
      <h2 className="font-serif text-3xl">Happy Customers, Honest Reviews</h2>

      {reviews.length === 0 ? (
        <p className="mt-6 text-gray-500">
          No reviews yet. Be the first to review this product!
        </p>
      ) : (
        <div className="mt-8 space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border-b border-[var(--stone)] pb-6"
            >
              <div className="flex items-center gap-4">
                <span className="font-medium">{review.user_name}</span>
                <span className="text-sm text-yellow-500">
                  {renderStars(review.rating)}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(review.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-2 text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-10 space-y-4">
        <h3 className="text-lg font-semibold">Write a Review</h3>

        <div>
          <label className="block text-sm text-gray-600">Your Name</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
            className="mt-1 w-full rounded-lg border p-3"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600">Rating</label>
          <div className="flex gap-2 mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-2xl ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-600">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this product..."
            rows={4}
            className="mt-1 w-full rounded-lg border p-3"
            required
          />
        </div>

        {message && (
          <div
            className={`rounded-lg p-3 text-sm ${
              message.type === "success"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-[var(--gold)] px-8 py-3 font-medium text-[var(--ink)] transition hover:opacity-90 disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </section>
  );
}
