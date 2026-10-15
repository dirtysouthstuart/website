import { defineField, defineType } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { availableField, priceField } from "./shared";

const SERVING = [
  { title: "On draft", value: "draft" },
  { title: "Bottle or can", value: "package" },
];

export const beer = defineType({
  name: "beer",
  title: "Beer",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "brewery", title: "Brewery", type: "string" }),
    defineField({ name: "style", title: "Style", type: "string", description: "e.g. IPA, Lager, Sour" }),
    defineField({
      name: "abv",
      title: "ABV %",
      type: "number",
      description: "Optional, e.g. 5.2",
      validation: (rule) => rule.min(0).max(30).precision(1),
    }),
    defineField({
      name: "serving",
      title: "Served",
      type: "string",
      options: { list: SERVING, layout: "radio", direction: "horizontal" },
      initialValue: "draft",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "local",
      title: "Florida brewery",
      type: "boolean",
      description: "Shows a “Local” tag.",
      initialValue: false,
    }),
    priceField(),
    availableField,
    orderRankField({ type: "beer" }),
  ],
  preview: {
    select: { title: "name", brewery: "brewery", serving: "serving", available: "available" },
    prepare: ({ title, brewery, serving, available }) => ({
      title,
      subtitle: [brewery, SERVING.find((s) => s.value === serving)?.title, available === false ? "Hidden" : null]
        .filter(Boolean)
        .join(" · "),
    }),
  },
});
