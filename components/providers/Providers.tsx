"use client";

import { CartProvider } from "@/components/cart/CartProvider";
import { WishlistProvider } from "@/components/Wishlist/WishlistProvider";
import WhatsAppButton from "@/components/WhatsAppButton";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>
        {children}
        <WhatsAppButton />
      </WishlistProvider>
    </CartProvider>
  );
}
