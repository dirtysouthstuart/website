"use client";

import { useEffect, useState } from "react";
import { upcomingOccurrences, type BarEvent } from "@/lib/events";

// "Next up" date for an event. Worked out in the browser so it stays current on a
// static deploy; the build-time date is only the first paint.
export function NextUp({ event, initial }: { event: BarEvent; initial?: string }) {
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
