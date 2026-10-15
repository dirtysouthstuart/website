import { defineField, defineType } from "sanity";
import { CalendarIcon } from "@sanity/icons/Calendar";
import { ctaFields, formatTime, TIME_OPTIONS } from "./shared";

export const specialEvent = defineType({
  name: "specialEvent",
  title: "Special event",
  type: "document",
  icon: CalendarIcon,
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      options: { dateFormat: "ddd, MMM D, YYYY" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "start",
      title: "Starts",
      type: "string",
      options: { list: TIME_OPTIONS },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "end",
      title: "Ends",
      type: "string",
      description: "Optional. An end time earlier than the start means it runs past midnight.",
      options: { list: TIME_OPTIONS },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "priceNote",
      title: "Cover / price",
      type: "string",
      description: "Optional, e.g. “Free”, “$10 cover”, “$45 per person”.",
    }),
    ...ctaFields,
  ],
  orderings: [
    { title: "Date, newest first", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
    { title: "Date, oldest first", name: "dateAsc", by: [{ field: "date", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", date: "date", start: "start" },
    prepare: ({ title, date, start }) => ({ title, subtitle: [date, formatTime(start)].filter(Boolean).join(" · ") }),
  },
});
