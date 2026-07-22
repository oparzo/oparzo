import { defineField, defineType } from "sanity";

export default defineType({
  name: "productVariant",
  title: "Product Variant",
  type: "object",

  fields: [
    defineField({
      name: "volume",
      title: "Volume (Optional)",
      type: "string",
    }),

    defineField({
      name: "weight",
      title: "Weight (Optional)",
      type: "string",
    }),

    defineField({
      name: "size",
      title: "Size (Optional)",
      type: "string",
    }),

    defineField({
      name: "color",
      title: "Color (Optional)",
      type: "string",
    }),

    defineField({
      name: "shade",
      title: "Shade (Optional)",
      type: "string",
    }),

    defineField({
      name: "price",
      title: "Price",
      type: "number",
    }),

    defineField({
      name: "comparePrice",
      title: "Compare Price",
      type: "number",
    }),

    defineField({
      name: "sku",
      title: "SKU",
      type: "string",
    }),

    defineField({
      name: "stock",
      title: "Stock",
      type: "number",
      initialValue: 0,
    }),

    defineField({
      name: "image",
      title: "Variant Image (Optional)",
      type: "image",
    }),
  ],
});
