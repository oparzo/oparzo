import {defineField, defineType} from "sanity";


export default defineType({

  name: "banner",

  title: "Hero Banner",

  type: "document",


  fields: [

    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),


    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
    }),


    defineField({
      name: "image",
      title: "Banner Image",
      type: "image",
    }),


    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
    }),


    defineField({
      name: "buttonLink",
      title: "Button Link",
      type: "string",
    }),


    defineField({
      name: "active",
      title: "Active Banner",
      type: "boolean",
      initialValue: true,
    }),

  ],

});
