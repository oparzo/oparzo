// types/product.ts
import { SanityImageAsset } from "./sanity";

export interface Product {
  _id: string;
  _type: "product";
  _createdAt: string;
  _updatedAt: string;
  name: string;
  slug: {
    _type: "slug";
    current: string;
  };
  description?: string;
  images?: SanityImage[];
  variants?: Variant[];
  category?: {
    _type: "reference";
    _ref: string;
  };
  brand?: string;
  featured?: boolean;
  newArrival?: boolean;
  bestseller?: boolean;
  tags?: string[];
  metaTitle?: string;
  metaDescription?: string;
  rating?: number;
  reviewCount?: number;
}

export interface Variant {
  _key?: string;
  volume?: string;
  weight?: string;
  size?: string;
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
