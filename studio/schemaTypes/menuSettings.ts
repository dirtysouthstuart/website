import { defineField, defineType } from "sanity";

// Singleton: one document with the fixed ID "menuSettings".
export const menuSettings = defineType({
  name: "menuSettings",
  title: "Menu notes & beer list",
  type: "document",
  fields: [
    defineField({
      name: "beerListImage",
      title: "Beer list image",
      type: "image",
      description:
        "Optional. If the beer list changes often, upload a photo or scan of the board instead of (or as well as) entering beers one by one. It shows in the Beer section.",
      options: { hotspot: false },
      fields: [
        defineField({
          name: "alt",
          title: "Description (alt text)",
          type: "string",
          initialValue: "Dirty South Bar beer list",
        }),
      ],
    }),
    defineField({
      name: "beerNote",
      title: "Beer note",
      type: "string",
      description: "Optional line under the Beer heading, e.g. “Taps rotate weekly. Ask what's pouring.”",
    }),
    defineField({
      name: "wineNote",
      title: "Wine note",
      type: "string",
      description: "Optional line under the Wine heading.",
    }),
    defineField({
      name: "foodNote",
      title: "Food note",
      type: "string",
      description: "Optional line under the Food heading, e.g. “Personal pizzas served until 11 PM.”",
    }),
  ],
  preview: { prepare: () => ({ title: "Menu notes & beer list" }) },
});
