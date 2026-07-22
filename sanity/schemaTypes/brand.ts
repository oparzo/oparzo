import { defineField, defineType } from "sanity";

export default defineType({
  name: "brand",
  title: "Brand",
  type: "document",

  fields: [
    defineField({
      name: "name",
      title: "Brand Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "logo",
      title: "Brand Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "coverImage",
      title: "Brand Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "description",
      title: "Brand Description",
      type: "text",
      rows: 6,
    }),

    defineField({
      name: "country",
      title: "Country of Origin",
      type: "string",
    }),

    defineField({
      name: "foundedYear",
      title: "Founded Year",
      type: "number",
    }),

    defineField({
      name: "website",
      title: "Official Website",
      type: "url",
    }),

    defineField({
      name: "featured",
      title: "Featured Brand",
      type: "boolean",
      initialValue: false,
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
      rows: 3,
    }),
  ],

  preview: {
    select: {
      title: "name",
      media: "logo",
      subtitle: "country",
    },
  },
});
