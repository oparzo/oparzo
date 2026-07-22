import {defineField, defineType} from "sanity";


export default defineType({

  name: "category",

  title: "Category",

  type: "document",


  fields: [

    defineField({
      name: "name",
      title: "Category Name",
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
      name: "description",
      title: "Category Description",
      type: "text",
    }),


    defineField({
      name: "image",
      title: "Category Image",
      type: "image",
    }),


    defineField({
      name: "parent",
      title: "Parent Category",
      type: "reference",
      to: [
        {
          type: "category",
        },
      ],
    }),


    defineField({
      name: "featured",
      title: "Featured Category",
      type: "boolean",
      initialValue: false,
    }),

  ],

});
