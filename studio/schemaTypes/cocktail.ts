import { defineField, defineType } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { availableField, menuImageField, priceField } from "./shared";

const AVAILABILITY = [
  { title: "Signature (year-round)", value: "signature" },
  { title: "Seasonal", value: "seasonal" },
  { title: "Limited time only", value: "limited" },
];

export const cocktail = defineType({
  name: "cocktail",
  title: "Cocktail",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      description: "Ingredients or a short description, e.g. “Vodka, lime juice, grenadine, lemon-lime soda.”",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "availability",
      title: "Availability",
      type: "string",
      description: "Seasonal and limited-time drinks appear in the “Seasonal Sips” spotlight at the top of the menu.",
      options: { list: AVAILABILITY, layout: "radio" },
      initialValue: "signature",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "availableUntil",
      title: "Available until",
      type: "date",
      description: "Optional. The drink disappears from the website automatically after this date.",
      hidden: ({ document }) => document?.availability === "signature",
      options: { dateFormat: "MMM D, YYYY" },
    }),
    defineField({
      name: "zeroProof",
      title: "Zero-proof (non-alcoholic)",
      type: "boolean",
      description: "Year-round zero-proof drinks get their own section on the menu.",
      initialValue: false,
    }),
    defineField({
      name: "featured",
      title: "Feature on the homepage",
      type: "boolean",
      description: "Featured drinks appear in “the dirty list” on the homepage (up to 5, in menu order).",
      initialValue: false,
    }),
    priceField(),
    availableField,
    menuImageField,
    orderRankField({ type: "cocktail" }),
  ],
  preview: {
    select: { title: "name", availability: "availability", price: "price", available: "available", media: "image" },
    prepare: ({ title, availability, price, available, media }) => ({
      title,
      subtitle: [
        AVAILABILITY.find((a) => a.value === availability)?.title,
        price != null ? `$${price}` : null,
        available === false ? "Hidden" : null,
      ]
        .filter(Boolean)
        .join(" · "),
      media,
    }),
  },
});
