"use client";

import { useWishlist } from "@/components/Wishlist/WishlistProvider";

export default function WishlistButton({
  product,
}: {
  product: any;
}) {
  const {
    addToWishlist,
    removeFromWishlist,
    isWishlisted,
  } = useWishlist();

  const saved = isWishlisted(product._id);

  function toggleWishlist(
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault();
    e.stopPropagation();

    if (saved) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  }

  return (
    <button
      onClick={toggleWishlist}
      aria-label="Wishlist"
      className="
        flex
        h-9
        w-9
        sm:h-10
        sm:w-10
        items-center
        justify-center
        border
        border-black/20
        bg-white/90
        text-base
        transition
        hover:bg-black
        hover:text-white
      "
    >
      {saved ? "♥" : "♡"}
    </button>
  );
}
