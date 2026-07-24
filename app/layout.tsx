import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "OPARZO - Global Luxury Marketplace",
    template: "%s | OPARZO",
  },
  description:
    "Authentic global products, thoughtfully curated for Bangladesh. Premium skincare, beauty, and lifestyle brands.",
  keywords:
    "luxury products, authentic brands, premium skincare, beauty, Bangladesh, global marketplace, curated lifestyle",
  authors: [{ name: "OPARZO" }],
  creator: "OPARZO",
  publisher: "OPARZO",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://oparzo.com",
  },
  openGraph: {
    title: "OPARZO - Global Luxury Marketplace",
    description:
      "Authentic global products, thoughtfully curated for Bangladesh.",
    url: "https://oparzo.com",
    siteName: "OPARZO",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "OPARZO - Global Luxury Marketplace",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OPARZO - Global Luxury Marketplace",
    description:
      "Authentic global products, thoughtfully curated for Bangladesh.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
