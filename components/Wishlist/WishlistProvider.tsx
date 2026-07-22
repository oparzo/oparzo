"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { supabase } from "@/lib/supabase/client";

const WishlistContext = createContext<any>(null);

// Guests keep the original localStorage-backed wishlist (unchanged
// behaviour). Logged-in users get a database-backed wishlist via
// /api/wishlist, so it's no longer disconnected from the /wishlist page.
// On login, any guest-saved items are pushed to the database once.

export function WishlistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ready, setReady] = useState(false);
  const migratedRef = useRef(false);

  useEffect(() => {
    init();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          handleSignedIn();
        }

        if (event === "SIGNED_OUT") {
          setIsLoggedIn(false);
          migratedRef.current = false;
          loadFromLocalStorage();
        }
      }
    );

    return () => listener.subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function init() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      await handleSignedIn();
    } else {
      loadFromLocalStorage();
    }

    setReady(true);
  }

  function loadFromLocalStorage() {
    const saved = localStorage.getItem("oparzo-wishlist");
    setWishlist(saved ? JSON.parse(saved) : []);
  }

  async function loadFromDb() {
    try {
      const res = await fetch("/api/wishlist");
      const data = await res.json();

      if (data.success) {
        // Normalize DB rows to look like the product objects the rest
        // of the app already stores locally (keyed by _id).
        setWishlist(
          (data.items ?? []).map((item: any) => ({
            _id: item.product_id,
            name: item.product_name,
            brand: item.brand,
            slug: { current: item.slug },
            images: item.image ? [item.image] : [],
            variants: [{ price: item.price }],
          }))
        );
      }
    } catch {
      // Network hiccup — leave whatever wishlist state we already have.
    }
  }

  async function handleSignedIn() {
    setIsLoggedIn(true);

    if (!migratedRef.current) {
      migratedRef.current = true;
      await migrateLocalWishlistToDb();
    }

    await loadFromDb();
  }

  async function migrateLocalWishlistToDb() {
    const saved = localStorage.getItem("oparzo-wishlist");
    const localItems = saved ? JSON.parse(saved) : [];

    if (localItems.length === 0) return;

    await Promise.all(
      localItems.map((item: any) =>
        fetch("/api/wishlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product_id: item._id }),
        }).catch(() => null)
      )
    );

    localStorage.removeItem("oparzo-wishlist");
  }

  useEffect(() => {
    // Only persist to localStorage in guest mode — logged-in mode is
    // sourced from (and written straight to) the database instead.
    if (ready && !isLoggedIn) {
      localStorage.setItem("oparzo-wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, isLoggedIn, ready]);

  async function addToWishlist(product: any) {
    const exists = wishlist.find((item) => item._id === product._id);
    if (exists) return;

    setWishlist([...wishlist, product]);

    if (isLoggedIn) {
      try {
        await fetch("/api/wishlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product_id: product._id }),
        });
      } catch {
        // Keep the optimistic UI state even if the request failed;
        // worst case it's re-synced next time loadFromDb() runs.
      }
    }
  }

  async function removeFromWishlist(id: string) {
    setWishlist(wishlist.filter((item) => item._id !== id));

    if (isLoggedIn) {
      try {
        await fetch("/api/wishlist", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product_id: id }),
        });
      } catch {
        // Same as above — optimistic UI, best-effort sync.
      }
    }
  }

  function toggleWishlist(product: any) {
    const exists = wishlist.find((item) => item._id === product._id);

    if (exists) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  }

  function isWishlisted(id: string) {
    return wishlist.some((item) => item._id === id);
  }

  function clearWishlist() {
    setWishlist([]);
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isWishlisted,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
