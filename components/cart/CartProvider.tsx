"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Product, Variant } from "@/types/product";

export type CartItem = {
  _id: string;
  name: string;
  slug?: string;
  price: number;
  currency?: string;
  quantity: number;
  selectedVariant?: Variant;
  images?: any[];
  brand?: string;
};

type CartContextType = {
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("oparzo-cart");
    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("oparzo-cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(item: CartItem) {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (p) =>
          p._id === item._id &&
          JSON.stringify(p.selectedVariant) ===
            JSON.stringify(item.selectedVariant)
      );
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += item.quantity;
        return updated;
      }
      return [...prev, item];
    });
  }

  function removeFromCart(index: number) {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }

  function updateQuantity(index: number, quantity: number) {
    setCart((prev) => {
      const updated = [...prev];
      if (!updated[index]) return prev;
      updated[index].quantity = Math.max(1, quantity);
      return updated;
    });
  }

  function clearCart() {
    setCart([]);
  }

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  const subtotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        subtotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
