import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",

  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
      },
    }),

    defineField({
      name: "brand",
      title: "Brand",
      type: "reference",
      to: [{ type: "brand" }],
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    }),

    defineField({
      name: "description",
      title: "Product Description",
      type: "text",
    }),

    defineField({
      name: "images",
      title: "Product Images",
      type: "array",
      of: [
        {
          type: "image",
        },
      ],
      validation: (Rule) => Rule.max(10),
    }),

    defineField({
      name: "variants",
      title: "Product Variants",
      type: "array",
      of: [
        {
          type: "productVariant",
        },
      ],
    }),

    defineField({
      name: "featured",
      title: "Featured Product",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "newArrival",
      title: "New Arrival",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "bestseller",
      title: "Best Seller",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "origin",
      title: "Country of Origin",
      type: "string",
    }),

    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
    }),

    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
    }),
  ],
});
