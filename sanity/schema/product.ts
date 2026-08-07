export default {
  name: "product",

  title: "Product",

  type: "document",

  fields: [
    {
      name: "name",
      title: "Product Name",
      type: "string",
    },

    {
      name: "brand",
      title: "Brand",
      type: "string",
    },

    {
      name: "category",
      title: "Category",
      type: "string",
    },

    {
      name: "price",
      title: "Price",
      type: "number",
    },

    {
      name: "description",
      title: "Description",
      type: "text",
    },

    {
      name: "image",
      title: "Product Image",
      type: "image",
    },
  ],
};
