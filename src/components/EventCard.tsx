import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { scheduleLabel, type BarEvent } from "@/lib/events";

const PILL_COLORS = ["bg-blush", "bg-sand", "bg-rose"];

export function EventCard({
  event,
  index,
  footer,
  className,
}: {
  event: BarEvent;
  index: number;
  /** Shown below a dashed rule, e.g. the next date and a calendar button. */
  footer?: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "card-ink px-[clamp(28px,3vw,44px)] py-[clamp(32px,3.2vw,48px)] text-left flex flex-col shadow-[6px_6px_0_theme(colors.ink)] transition-transform duration-200 hover:-rotate-1 hover:-translate-y-1",
        className
      )}
    >
      <span
        className={cn(
          "self-start border-2 border-ink rounded-full px-3.5 py-1.5 font-bold text-xs tracking-[.12em] uppercase",
          PILL_COLORS[index % PILL_COLORS.length]
        )}
      >
        {event.dayLabel}
      </span>
      <h3 className="ultra text-[clamp(26px,2.6vw,32px)] leading-[.95] mt-[18px] mb-2 text-navy">{event.title}</h3>
      <p className="font-bold tracking-[.06em] text-ink">{scheduleLabel(event)}</p>
      <p className="mt-3 leading-[1.5] flex-1">{event.description}</p>
      {footer && (
        <div className="mt-6 pt-5 border-t-2 border-dashed border-ink flex flex-wrap items-center justify-between gap-3">
          {footer}
        </div>
      )}
    </article>
  );
}
