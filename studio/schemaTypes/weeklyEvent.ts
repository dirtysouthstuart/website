import { defineArrayMember, defineField, defineType } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { ctaFields, formatTime, TIME_OPTIONS, WEEKDAYS } from "./shared";

export const weeklyEvent = defineType({
  name: "weeklyEvent",
  title: "Weekly event",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "schedule",
      title: "When",
      type: "array",
      description: "Add a row for each night it happens. Times can differ by night.",
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          type: "object",
          name: "slot",
          fields: [
            defineField({
              name: "day",
              title: "Day",
              type: "string",
              options: { list: WEEKDAYS },
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
              description: "An end time earlier than the start means it runs past midnight.",
              options: { list: TIME_OPTIONS },
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { day: "day", start: "start", end: "end" },
            prepare: ({ day, start, end }) => ({ title: day, subtitle: `${formatTime(start)} – ${formatTime(end)}` }),
          },
        }),
      ],
    }),
    defineField({
      name: "dayLabel",
      title: "Day label",
      type: "string",
      description: "Optional. The tag on the event card, e.g. “Weekends”. Leave blank to show the days (e.g. “Fridays”).",
    }),
    ...ctaFields,
    defineField({
      name: "active",
      title: "Show on the website",
      type: "boolean",
      description: "Turn off to pause the event (e.g. for the summer) without deleting it.",
      initialValue: true,
    }),
    orderRankField({ type: "weeklyEvent" }),
  ],
  preview: {
    select: { title: "title", schedule: "schedule", active: "active" },
    prepare: ({ title, schedule, active }) => ({
      title,
      subtitle: [
        (schedule as { day?: string }[] | undefined)?.map((s) => s.day?.slice(0, 3)).join(", "),
        active === false ? "Paused" : null,
      ]
        .filter(Boolean)
        .join(" · "),
    }),
  },
});
