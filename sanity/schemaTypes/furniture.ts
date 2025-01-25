import { defineType } from "sanity";

export const furnitureSchema = defineType({
  name: "furniture",
  title: "Furniture",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      validation: (rule) => rule.required(),
      type: "string",
    },
    {
      name: "slug",
      type: "slug",
      title: "Product Slug",
      options: {
        source: "title",
      },
    },
    {
      name: "description",
      type: "text",
      validation: (rule) => rule.required(),
      title: "Description",
    },
    {
      name: "productImage",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (rule) => rule.required(),
      title: "Product Image",
    },
    {
      name: "price",
      type: "number",
      validation: (rule) => rule.required(),
      title: "Price",
    },

    {
      name: "tags",
      type: "array",
      title: "Tags",
      of: [{ type: "string" }],
    },
    {
      name: "dicountPercentage",
      type: "number",
      title: "Discount Percentage",
    },
    {
      name: "isNew",
      type: "boolean",
      title: "New Badge",
    },
    {
      name: "isStock",
      type: "boolean",
      title: "Stock Available",
    },
    {
      name: "stock",
      type: "number",
      title: "Stock",
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.document?.isStock && !value) {
            return "Stock is required when Available.";
          }
          return true;
        }),
      hidden: ({ document }) => !document?.isStock,
    },
    {
      name: "availableForRental",
      type: "boolean",
      title: "Available for Rental",
      hidden: ({ document }) => !document?.isStock, // Hide if isStock is false
    },
    {
      name: "rentalPricePerDay",
      type: "number",
      title: "Rental Price Per Day",
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.document?.availableForRental && !value) {
            return "Rental Price Per Day is required when Available for Rental is true.";
          }
          return true;
        }),
      hidden: ({ document }) =>
        !document?.isStock || !document?.availableForRental, // Hide if isStock is false
    },
   
  ],
});
