import { defineField, defineType } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { availableField, priceField } from "./shared";

export const WINE_TYPES = [
  { title: "Sparkling", value: "sparkling" },
  { title: "White", value: "white" },
  { title: "Rosé", value: "rose" },
  { title: "Red", value: "red" },
];

export const wine = defineType({
  name: "wine",
  title: "Wine",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "wineType",
      title: "Type",
      type: "string",
      options: { list: WINE_TYPES, layout: "radio", direction: "horizontal" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "details",
      title: "Grape / region",
      type: "string",
      description: "Optional, e.g. “Pinot Grigio · Veneto, Italy”",
    }),
    priceField("glassPrice", "Glass price"),
    priceField("bottlePrice", "Bottle price"),
    availableField,
    orderRankField({ type: "wine" }),
  ],
  preview: {
    select: { title: "name", wineType: "wineType", details: "details", available: "available" },
    prepare: ({ title, wineType, details, available }) => ({
      title,
      subtitle: [WINE_TYPES.find((w) => w.value === wineType)?.title, details, available === false ? "Hidden" : null]
        .filter(Boolean)
        .join(" · "),
    }),
  },
});
