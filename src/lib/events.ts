import eventsData from "@/data/events.json";
import { site } from "@/lib/site";

// Weekly recurring events. Times are local to the bar (America/New_York), in
// 24h "HH:MM"; an end time at or before the start time means it runs past midnight.

// TODO: confirm the lineup and times with the client, then set to true to publish
// events in structured data (Google event listings).
export const eventsVerified = false;

export const TIME_ZONE = "America/New_York";

export const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;
export type Weekday = (typeof WEEKDAYS)[number];

export type EventSlot = { day: Weekday; start: string; end: string };

export type BarEvent = {
  id: string;
  title: string;
  dayLabel: string;
  description: string;
  schedule: EventSlot[];
};

export type Occurrence = {
  event: BarEvent;
  slot: EventSlot;
  /** e.g. "Wed, Oct 8" */
  dateLabel: string;
  /** ISO 8601 with the bar's UTC offset, for structured data */
  startIso: string;
  endIso: string;
  /** Floating local times, e.g. "20261008T200000", for calendar files */
  startLocal: string;
  endLocal: string;
};

export const events = eventsData as BarEvent[];

const SHORT_DAY: Record<Weekday, string> = {
  Monday: "Mon", Tuesday: "Tue", Wednesday: "Wed", Thursday: "Thu", Friday: "Fri", Saturday: "Sat", Sunday: "Sun",
};

// ICS BYDAY codes
export const ICS_DAY: Record<Weekday, string> = {
  Monday: "MO", Tuesday: "TU", Wednesday: "WE", Thursday: "TH", Friday: "FR", Saturday: "SA", Sunday: "SU",
};

export const shortDay = (day: Weekday) => SHORT_DAY[day];

function parseTime(time: string) {
  const [h, m] = time.split(":").map(Number);
  return { h, m };
}

function meridiem(time: string) {
  return parseTime(time).h < 12 ? "AM" : "PM";
}

function clock(time: string) {
  const { h, m } = parseTime(time);
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m ? `${h12}:${String(m).padStart(2, "0")}` : String(h12);
}

/** "19:00" -> "7PM", "00:00" -> "12AM" */
export function formatTime(time: string) {
  return `${clock(time)}${meridiem(time)}`;
}

/** "14:00"-"20:00" -> "2–8PM", "20:00"-"00:00" -> "8PM–12AM" (matches the footer hours style) */
export function formatTimeRange(start: string, end: string) {
  return meridiem(start) === meridiem(end)
    ? `${clock(start)}–${formatTime(end)}`
    : `${formatTime(start)}–${formatTime(end)}`;
}

/** "8PM–12AM", or "Fri 7PM–2AM · Sat 5PM–2AM" when the time differs by day */
export function scheduleLabel(event: BarEvent) {
  const ranges = new Set(event.schedule.map((s) => formatTimeRange(s.start, s.end)));
  if (ranges.size === 1) return [...ranges][0];
  return event.schedule.map((s) => `${shortDay(s.day)} ${formatTimeRange(s.start, s.end)}`).join(" · ");
}

// --- Date math in the bar's time zone -------------------------------------

/** Today's calendar date in the bar's time zone. */
function barToday(now: Date) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE, year: "numeric", month: "numeric", day: "numeric" })
      .formatToParts(now)
      .map((p) => [p.type, p.value])
  );
  return { y: Number(parts.year), m: Number(parts.month), d: Number(parts.day) };
}

/** UTC offset like "-04:00" for a wall-clock time in the bar's time zone. */
function barOffset(y: number, m: number, d: number, h: number, min: number) {
  const name = new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE, timeZoneName: "longOffset" })
    .formatToParts(new Date(Date.UTC(y, m - 1, d, h, min)))
    .find((p) => p.type === "timeZoneName")?.value;
  const match = name?.match(/GMT([+-]\d{2}:\d{2})/);
  return match ? match[1] : "+00:00";
}

const pad = (n: number) => String(n).padStart(2, "0");

/** A wall-clock moment in the bar's time zone, for date `base` shifted by `dayOffset` days. */
function barMoment(base: Date, dayOffset: number, time: string) {
  const { h, m } = parseTime(time);
  const date = new Date(Date.UTC(base.getUTCFullYear(), base.getUTCMonth(), base.getUTCDate() + dayOffset));
  const [y, mo, d] = [date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate()];
  const offset = barOffset(y, mo, d, h, m);
  const iso = `${y}-${pad(mo)}-${pad(d)}T${pad(h)}:${pad(m)}:00${offset}`;
  return { iso, local: `${y}${pad(mo)}${pad(d)}T${pad(h)}${pad(m)}00`, instant: new Date(iso) };
}

/** Upcoming occurrences of the given events within the next `days` days, soonest first. */
export function upcomingOccurrences(list: BarEvent[], days = 28, now = new Date()): Occurrence[] {
  const today = barToday(now);
  const out: (Occurrence & { at: number })[] = [];

  for (let i = 0; i < days; i++) {
    const date = new Date(Date.UTC(today.y, today.m - 1, today.d + i));
    // getUTCDay: 0 = Sunday
    const weekday = WEEKDAYS[(date.getUTCDay() + 6) % 7];

    for (const event of list) {
      for (const slot of event.schedule) {
        if (slot.day !== weekday) continue;
        const start = barMoment(date, 0, slot.start);
        const overnight = slot.end <= slot.start;
        const end = barMoment(date, overnight ? 1 : 0, slot.end);
        if (end.instant <= now) continue;
        out.push({
          event,
          slot,
          dateLabel: new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: "UTC" }).format(date),
          startIso: start.iso,
          endIso: end.iso,
          startLocal: start.local,
          endLocal: end.local,
          at: start.instant.getTime(),
        });
      }
    }
  }

  return out.sort((a, b) => a.at - b.at).map(({ at: _at, ...occ }) => occ);
}

/** The bar's week, Monday first: opening hours plus the events on each day. */
export function weeklyLineup() {
  return WEEKDAYS.map((day) => {
    const hours = site.hours.find((h) => (h.days as readonly string[]).includes(day));
    return {
      day,
      short: shortDay(day),
      hours: hours ? formatTimeRange(hours.opens, hours.closes) : "Closed",
      events: events.flatMap((event) =>
        event.schedule
          .filter((slot) => slot.day === day)
          .map((slot) => ({ id: event.id, title: event.title, time: formatTimeRange(slot.start, slot.end) }))
      ),
    };
  });
}
