// types/product.ts

export interface Product {
  _id: string;
  _type?: string;
  _createdAt?: string;
  _updatedAt?: string;

  name: string;
  slug: {
    _type?: string;
    current: string;
  };

  description?: string;
  images?: SanityImage[];
  variants?: Variant[];

  // References (Sanity references become strings after GROQ)
  category?: string;
  categorySlug?: string;
  brand?: string;
  brandSlug?: string;
  brandDescription?: string;

  // Flags
  featured?: boolean;
  newArrival?: boolean;
  bestseller?: boolean;
  tags?: string[];

  // SEO
  seoTitle?: string;
  seoDescription?: string;

  // Ratings (if you add later)
  rating?: number;
  reviewCount?: number;
}

export interface Variant {
  _key?: string;
  volume?: string;      // ml, oz
  weight?: string;      // gm
  size?: string;        // S, M, L
  color?: string;
  shade?: string;
  price: number;
  comparePrice?: number;
  sku?: string;
  stock?: number;
  image?: SanityImage;
}

export interface SanityImage {
  _type: "image";
  asset: {
    _type: "reference";
    _ref: string;
  };
  alt?: string;
  caption?: string;
  crop?: any;
  hotspot?: any;
}

export interface ProductFilters {
  featured?: boolean;
  newArrival?: boolean;
  bestseller?: boolean;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "newest" | "priceLow" | "priceHigh" | "rating";
}
