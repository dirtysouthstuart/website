import { defineField, defineType } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { availableField, menuImageField, priceField } from "./shared";

// Shown on the menu in this order. Add a category here to offer it in the Studio
// (and in src/sanity/types.ts on the website).
export const FOOD_CATEGORIES = [
  { title: "Personal Pizzas", value: "pizza" },
  { title: "Bites", value: "bites" },
  { title: "Sweets", value: "sweets" },
];

const DIETARY = [
  { title: "Vegetarian", value: "vegetarian" },
  { title: "Vegan", value: "vegan" },
  { title: "Gluten-free", value: "gluten-free" },
  { title: "Spicy", value: "spicy" },
];

export const food = defineType({
  name: "food",
  title: "Food",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: FOOD_CATEGORIES, layout: "radio", direction: "horizontal" },
      initialValue: "pizza",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
    defineField({
      name: "dietary",
      title: "Dietary tags",
      type: "array",
      of: [{ type: "string" }],
      options: { list: DIETARY, layout: "grid" },
    }),
    priceField(),
    availableField,
    menuImageField,
    orderRankField({ type: "food" }),
  ],
  preview: {
    select: { title: "name", category: "category", price: "price", available: "available", media: "image" },
    prepare: ({ title, category, price, available, media }) => ({
      title,
      subtitle: [
        FOOD_CATEGORIES.find((c) => c.value === category)?.title,
        price != null ? `$${price}` : null,
        available === false ? "Hidden" : null,
      ]
        .filter(Boolean)
        .join(" · "),
      media,
    }),
  },
});
