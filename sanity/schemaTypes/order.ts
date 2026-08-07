import { defineField, defineType } from "sanity";

export default defineType({
  name: "order",

  title: "Order",

  type: "document",

  fields: [
    defineField({
      name: "customerName",

      title: "Customer Name",

      type: "string",
    }),

    defineField({
      name: "phone",

      title: "Phone",

      type: "string",
    }),

    defineField({
      name: "email",

      title: "Email",

      type: "string",
    }),

    defineField({
      name: "address",

      title: "Delivery Address",

      type: "text",
    }),

    defineField({
      name: "products",

      title: "Products",

      type: "array",

      of: [
        {
          type: "object",

          fields: [
            {
              name: "name",

              title: "Product Name",

              type: "string",
            },

            {
              name: "price",

              title: "Price",

              type: "number",
            },

            {
              name: "quantity",

              title: "Quantity",

              type: "number",
            },
          ],
        },
      ],
    }),

    defineField({
      name: "status",

      title: "Order Status",

      type: "string",

      initialValue: "pending",

      options: {
        list: ["pending", "confirmed", "shipped", "completed", "cancelled"],
      },
    }),

    defineField({
      name: "createdAt",

      title: "Created At",

      type: "datetime",
    }),
  ],
});
