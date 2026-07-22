import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

import AuthProvider from "@/components/providers/AuthProvider";
import { CartProvider } from "@/components/cart/CartProvider";
import { WishlistProvider } from "@/components/Wishlist/WishlistProvider";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";

// Brand typography: Cormorant Garamond for display/headings, Jost for
// body text. These were the established brand fonts, but the codebase
// was never actually wired up to load them — globals.css fell back to
// plain Arial/Georgia the entire time.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "OPARZO | Authentic Global Products, Thoughtfully Curated",
    template: "%s | OPARZO",
  },

  description:
    "OPARZO is a premium curated lifestyle store — authentic global products across fashion, beauty, watches, and more, thoughtfully selected and delivered with a concierge touch.",

  keywords: [
    "premium lifestyle store",
    "curated shopping",
    "authentic products",
    "premium brands",
    "concierge shopping",
  ],

  openGraph: {
    title: "OPARZO | Authentic Global Products, Thoughtfully Curated",
    description:
      "A premium curated lifestyle store — authentic global products, thoughtfully selected.",
    url: "https://oparzo.com",
    siteName: "OPARZO",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "OPARZO | Authentic Global Products, Thoughtfully Curated",
    description:
      "A premium curated lifestyle store — authentic global products, thoughtfully selected.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <AnnouncementBar />
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Navbar />
              {children}
              <Footer />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
