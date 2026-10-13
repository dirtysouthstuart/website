"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { TIME_ZONE, type weeklyLineup } from "@/lib/events";

type Lineup = ReturnType<typeof weeklyLineup>;

// Highlights "tonight" using the bar's local day. Runs on the client so the
// statically generated page never shows a stale day.
export function WeekLineup({ lineup }: { lineup: Lineup }) {
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    setToday(new Intl.DateTimeFormat("en-US", { weekday: "long", timeZone: TIME_ZONE }).format(new Date()));
  }, []);

  return (
    <ol className="grid grid-cols-7 max-[1100px]:grid-cols-1 gap-3 max-w-[1180px] mx-auto text-left">
      {lineup.map(({ day, short, hours, events }) => {
        const isToday = day === today;
        return (
          <li
            key={day}
            aria-current={isToday ? "date" : undefined}
            className={cn(
              "border-[3px] border-ink px-5 py-6 max-[1100px]:py-5 flex flex-col max-[1100px]:flex-row max-[1100px]:items-center max-[1100px]:gap-5",
              isToday ? "bg-blush shadow-[4px_4px_0_theme(colors.ink)]" : "bg-cream"
            )}
          >
            <div className="max-[1100px]:w-28 shrink-0">
              <p className="ultra text-[22px] leading-none text-navy">
                <abbr title={day} className="no-underline">{short}</abbr>
              </p>
              <p className="text-sm mt-1">{hours}</p>
              {isToday && (
                <p className="mt-1 font-bold text-[11px] tracking-[.14em] uppercase text-navy">Tonight</p>
              )}
            </div>
            <div className="mt-4 max-[1100px]:mt-0 flex-1 space-y-2.5">
              {events.length > 0 ? (
                events.map((e) => (
                  <a key={e.id} href={`#${e.id}`} className="block bg-sand border-2 border-ink px-3.5 py-2.5 hover:bg-cream transition-colors">
                    <span className="block font-bold text-sm leading-tight">{e.title}</span>
                    <span className="block text-xs mt-1">{e.time}</span>
                  </a>
                ))
              ) : (
                <p className="text-sm italic opacity-70">Just drinks, darling.</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
