"use client";

import { useEffect, useState } from "react";
import { upcomingOccurrences } from "@/lib/events";
import type { WeeklyEvent } from "@/sanity/types";

// "Next up" date for a weekly event, refreshed in the browser so a cached page
// never shows a date that has already passed.
export function NextUp({ event, initial }: { event: WeeklyEvent; initial?: string }) {
  const [label, setLabel] = useState(initial);

  useEffect(() => {
    setLabel(upcomingOccurrences([event], 8)[0]?.dateLabel);
  }, [event]);

  if (!label) return null;
  return (
    <p className="text-sm">
      <span className="font-bold uppercase tracking-[.12em] text-navy">Next up</span>
      <br />
      {label}
    </p>
  );
}
