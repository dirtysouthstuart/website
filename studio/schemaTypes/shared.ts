import { defineField } from "sanity";

// Times every 30 minutes, stored as 24h "HH:MM" and shown as "8:00 PM".
export const TIME_OPTIONS = Array.from({ length: 48 }, (_, i) => {
  const h = Math.floor(i / 2);
  const m = i % 2 ? "30" : "00";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return { title: `${h12}:${m} ${h < 12 ? "AM" : "PM"}`, value: `${String(h).padStart(2, "0")}:${m}` };
});

export const formatTime = (value?: string) => TIME_OPTIONS.find((t) => t.value === value)?.title ?? value ?? "";

export const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const priceField = (name = "price", title = "Price", description?: string) =>
  defineField({
    name,
    title,
    type: "number",
    description: description ?? "Optional. Numbers only, e.g. 14 or 12.50. Leave blank to hide the price.",
    validation: (rule) => rule.min(0).precision(2),
  });

export const availableField = defineField({
  name: "available",
  title: "On the menu right now",
  type: "boolean",
  description: "Turn off to hide it from the website without deleting it.",
  initialValue: true,
});

export const menuImageField = defineField({
  name: "image",
  title: "Photo",
  type: "image",
  description: "Optional.",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Description (alt text)",
      type: "string",
      description: "Describe the photo for search engines and screen readers, e.g. “Jam On It cocktail with a blackberry garnish”.",
    }),
  ],
});

// Optional RSVP / ticket button for events. The button only shows when a link is set.
export const ctaFields = [
  defineField({
    name: "ctaUrl",
    title: "RSVP or ticket link",
    type: "url",
    description: "Optional. Adds a button to the event (e.g. Eventbrite, Toast, a Google Form). No link = no button.",
    validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
  }),
  defineField({
    name: "ctaLabel",
    title: "Button text",
    type: "string",
    options: { list: ["RSVP", "Get Tickets", "Reserve a Spot", "Learn More"], layout: "radio", direction: "horizontal" },
    initialValue: "RSVP",
    hidden: ({ parent }) => !parent?.ctaUrl,
  }),
];
