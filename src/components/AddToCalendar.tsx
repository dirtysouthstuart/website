"use client";

import { site } from "@/lib/site";
import { ICS_DAY, specialTiming, TIME_ZONE, upcomingOccurrences } from "@/lib/events";
import type { SpecialEvent, WeeklyEvent } from "@/sanity/types";

// Escape text per RFC 5545
const icsText = (s: string) => s.replace(/\\/g, "\\\\").replace(/([,;])/g, "\\$1").replace(/\n/g, "\\n");

type Entry = { uid: string; startLocal: string; endLocal: string; byDay?: string };

function buildIcs(title: string, description: string, entries: Entry[]) {
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const location = `${site.name}, ${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;
  const vevents = entries.map(({ uid, startLocal, endLocal, byDay }) =>
    [
      "BEGIN:VEVENT",
      `UID:${uid}@dirtysouthbar.com`,
      `DTSTAMP:${stamp}`,
      `DTSTART;TZID=${TIME_ZONE}:${startLocal}`,
      `DTEND;TZID=${TIME_ZONE}:${endLocal}`,
      ...(byDay ? [`RRULE:FREQ=WEEKLY;BYDAY=${byDay}`] : []),
      `SUMMARY:${icsText(`${title} at ${site.name}`)}`,
      `DESCRIPTION:${icsText(`${description}\n${site.url}/events`)}`,
      `LOCATION:${icsText(location)}`,
      "END:VEVENT",
    ].join("\r\n")
  );
  return ["BEGIN:VCALENDAR", "VERSION:2.0", `PRODID:-//${site.name}//Events//EN`, "CALSCALE:GREGORIAN", ...vevents, "END:VCALENDAR"].join("\r\n");
}

function weeklyEntries(event: WeeklyEvent): Entry[] {
  const upcoming = upcomingOccurrences([event], 8);
  // First upcoming occurrence of each weekly slot seeds a repeating calendar entry.
  return event.schedule
    .map((slot) => upcoming.find((o) => o.slot.day === slot.day))
    .filter((o) => o !== undefined)
    .map((o) => ({
      uid: `${event._id}-${ICS_DAY[o.slot.day].toLowerCase()}`,
      startLocal: o.startLocal,
      endLocal: o.endLocal,
      byDay: ICS_DAY[o.slot.day],
    }));
}

function specialEntries(event: SpecialEvent): Entry[] {
  const t = specialTiming(event);
  return [{ uid: event._id, startLocal: t.startLocal, endLocal: t.endLocal }];
}

/** Downloads an .ics file: a weekly repeating entry, or a one-off for special events. */
export function AddToCalendar(props: { weekly: WeeklyEvent } | { special: SpecialEvent }) {
  // Built at click time so a weekly event's first date is always the next one.
  const download = () => {
    const event = "weekly" in props ? props.weekly : props.special;
    const entries = "weekly" in props ? weeklyEntries(props.weekly) : specialEntries(props.special);
    const blob = new Blob([buildIcs(event.title, event.description, entries)], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${event._id}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={download}
      className="inline-block border-[3px] border-ink bg-sand px-5 py-[11px] font-bold text-sm tracking-[.12em] uppercase hover:bg-blush transition-colors cursor-pointer"
    >
      Add to Calendar
    </button>
  );
}
