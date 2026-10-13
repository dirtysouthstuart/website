"use client";

import { site } from "@/lib/site";
import { ICS_DAY, TIME_ZONE, upcomingOccurrences, type BarEvent } from "@/lib/events";

// Escape text per RFC 5545
const icsText = (s: string) => s.replace(/\\/g, "\\\\").replace(/([,;])/g, "\\$1").replace(/\n/g, "\\n");

function buildIcs(event: BarEvent) {
  const upcoming = upcomingOccurrences([event], 8);
  // First upcoming occurrence of each weekly slot seeds a repeating calendar entry.
  const firsts = event.schedule
    .map((slot) => upcoming.find((o) => o.slot.day === slot.day))
    .filter((o) => o !== undefined);

  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const location = `${site.name}, ${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;
  const vevents = firsts.map(({ slot, startLocal, endLocal }) =>
    [
      "BEGIN:VEVENT",
      `UID:${event.id}-${ICS_DAY[slot.day].toLowerCase()}@dirtysouthbar.com`,
      `DTSTAMP:${stamp}`,
      `DTSTART;TZID=${TIME_ZONE}:${startLocal}`,
      `DTEND;TZID=${TIME_ZONE}:${endLocal}`,
      `RRULE:FREQ=WEEKLY;BYDAY=${ICS_DAY[slot.day]}`,
      `SUMMARY:${icsText(`${event.title} at ${site.name}`)}`,
      `DESCRIPTION:${icsText(`${event.description}\n${site.url}/events`)}`,
      `LOCATION:${icsText(location)}`,
      "END:VEVENT",
    ].join("\r\n")
  );
  return ["BEGIN:VCALENDAR", "VERSION:2.0", `PRODID:-//${site.name}//Events//EN`, "CALSCALE:GREGORIAN", ...vevents, "END:VCALENDAR"].join("\r\n");
}

export function AddToCalendar({ event }: { event: BarEvent }) {
  // Built at click time so the first date is always the next upcoming one.
  const download = () => {
    const blob = new Blob([buildIcs(event)], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${event.id}.ics`;
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
