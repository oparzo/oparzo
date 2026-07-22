export const productsQuery = `
*[_type == "product"] | order(_createdAt desc){
  _id,
  name,
  slug,
  description,
  images,

  variants[]{
    volume,
    weight,
    size,
    color,
    shade,
    price,
    comparePrice,
    sku,
    stock,
    image
  },

  featured,
  newArrival,
  bestseller,
  origin,

  seoTitle,
  seoDescription,

  "brand": brand->name,
  "brandDescription": brand->description,
  "brandSlug": brand->slug.current,

  "category": category->name,
  "categorySlug": category->slug.current
}
`;

export const productBySlugQuery = `
*[_type == "product" && slug.current == $slug][0]{
  _id,
  name,
  slug,
  description,
  images,

  variants[]{
    volume,
    weight,
    size,
    color,
    shade,
    price,
    comparePrice,
    sku,
    stock,
    image
  },

  featured,
  newArrival,
  bestseller,
  origin,

  seoTitle,
  seoDescription,

  "brand": brand->name,
  "brandDescription": brand->description,
  "brandSlug": brand->slug.current,

  "category": category->name,
  "categorySlug": category->slug.current
}
`;

export const relatedProductsQuery = `
*[
  _type == "product" &&
  slug.current != $slug &&
  (
    brand->slug.current == $brandSlug ||
    category->slug.current == $categorySlug
  )
][0...8]{
  _id,
  name,
  slug,
  description,
  images,

  variants[]{
    volume,
    weight,
    size,
    color,
    shade,
    price,
    comparePrice,
    sku,
    stock,
    image
  },

  "brand": brand->name,
  "brandDescription": brand->description,
  "brandSlug": brand->slug.current,

  "category": category->name,
  "categorySlug": category->slug.current
}
`;

export const brandQuery = `
*[_type == "brand"] | order(name asc){
  _id,
  name,
  slug,
  description
}
`;

export const brandBySlugQuery = `
*[_type == "brand" && slug.current == $slug][0]{
  _id,
  name,
  slug,
  description
}
`;

export const productsByBrandQuery = `
*[_type == "product" && brand->slug.current == $slug]{
  _id,
  name,
  slug,
  description,
  images,

  variants[]{
    volume,
    weight,
    size,
    color,
    shade,
    price,
    comparePrice,
    stock
  },

  "brand": brand->name,
  "brandDescription": brand->description
}
`;

export const categoryQuery = `
*[_type == "category"] | order(name asc){
  _id,
  name,
  slug,
  description
}
`;

export const categoryBySlugQuery = `
*[_type == "category" && slug.current == $slug][0]{
  _id,
  name,
  slug,
  description
}
`;

export const productsByCategoryQuery = `
*[_type == "product" && category->slug.current == $slug]{
  _id,
  name,
 slug,
  description,
  images,

  variants[]{
    volume,
    weight,
    size,
    color,
    shade,
    price,
    comparePrice,
    stock
  },

  "brand": brand->name,
  "brandDescription": brand->description
}
`;

export const searchProductsQuery = `
*[_type == "product" && (
  name match $term + "*" ||
  brand->name match $term + "*"
)]{
  _id,
  name,
  slug,
  description,
  images,

  variants[]{
    volume,
    weight,
    size,
    color,
    shade,
    price,
    comparePrice,
    stock
  },

  "brand": brand->name,
  "brandDescription": brand->description
}
`;

export const bannerQuery = `
*[_type == "banner" && active == true][0]{
  _id,
  title,
  subtitle,
  image
}
`;
