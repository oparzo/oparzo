"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import Wordmark from "@/components/Wordmark";

const NAV_LINKS = [
  { href: "/products", label: "Shop" },
  { href: "/categories", label: "Categories" },
  { href: "/brands", label: "Brands" },
  { href: "/concierge", label: "Concierge" },
];

export default function Navbar() {
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#faf8f3]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:h-24 lg:px-6">

        {/* Left */}
        <div className="flex items-center gap-4">

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex flex-col justify-center gap-1.5 lg:hidden"
          >
            <span
              className={`block h-px w-6 bg-black transition ${
                menuOpen ? "translate-y-[4px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-black transition ${
                menuOpen ? "-translate-y-[4px] -rotate-45" : ""
              }`}
            />
          </button>

          <Link href="/" className="shrink-0">
            <Wordmark className="text-[2rem] md:text-[2.3rem]" />
          </Link>

        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10 text-[11px] uppercase tracking-[0.28em]">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-[var(--gold)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em]">

          <Link
            href="/search"
            className="hidden lg:block transition hover:text-[var(--gold)]"
          >
            Search
          </Link>

          <Link
            href="/wishlist"
            className="hidden lg:block transition hover:text-[var(--gold)]"
          >
            Wishlist
          </Link>

          <Link
            href="/account"
            className="hidden lg:block transition hover:text-[var(--gold)]"
          >
            My Account
          </Link>

          <Link
            href="/cart"
            className="whitespace-nowrap transition hover:text-[var(--gold)]"
          >
            Bag ({cart.length})
          </Link>

        </div>

      </div>

      {menuOpen && (
        <nav
          id="mobile-nav-menu"
          className="border-t border-black/10 bg-[#faf8f3] lg:hidden"
        >
          <div className="flex flex-col px-5 py-6">

            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-black/5 py-4 text-sm uppercase tracking-[0.2em]"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/search"
              onClick={() => setMenuOpen(false)}
              className="border-b border-black/5 py-4 text-sm uppercase tracking-[0.2em]"
            >
              Search
            </Link>

            <Link
              href="/wishlist"
              onClick={() => setMenuOpen(false)}
              className="border-b border-black/5 py-4 text-sm uppercase tracking-[0.2em]"
            >
              Wishlist
            </Link>

            <Link
              href="/account"
              onClick={() => setMenuOpen(false)}
              className="py-4 text-sm uppercase tracking-[0.2em]"
            >
              My Account
            </Link>

          </div>
        </nav>
      )}
    </header>
  );
}
