"use client";

import { useWishlist } from "@/components/Wishlist/WishlistProvider";
import { Product } from "@/types/product";

export default function WishlistButton({ product }: { product: Product }) {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const isLiked = isWishlisted(product._id);

  return (
    <button
      onClick={() => toggleWishlist(product)}
      className="w-10 h-10 rounded-full border border-[var(--stone)] flex items-center justify-center hover:bg-[var(--stone)] transition"
      aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={isLiked ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
}
