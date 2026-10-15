import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const PILL_COLORS = ["bg-blush", "bg-sand", "bg-rose"];

export function EventCard({
  pill,
  index,
  title,
  when,
  description,
  priceNote,
  meta,
  actions,
  className,
}: {
  /** Tag at the top, e.g. "Weekends" or "Sat, Nov 8" */
  pill: string;
  index: number;
  title: string;
  /** e.g. "8PM–12AM" */
  when: string;
  description: string;
  priceNote?: string;
  /** Left side of the footer, e.g. the next date */
  meta?: ReactNode;
  /** Right side of the footer, e.g. calendar and RSVP buttons */
  actions?: ReactNode;
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
        {pill}
      </span>
      <h3 className="ultra text-[clamp(26px,2.6vw,32px)] leading-[.95] mt-[18px] mb-2 text-navy">{title}</h3>
      <p className="font-bold tracking-[.06em] text-ink">{when}</p>
      {priceNote && <p className="mt-1 text-sm font-bold uppercase tracking-[.12em] text-navy">{priceNote}</p>}
      <p className="mt-3 leading-[1.5] flex-1">{description}</p>
      {(meta || actions) && (
        <div className="mt-6 pt-5 border-t-2 border-dashed border-ink flex flex-wrap items-center justify-between gap-3">
          {meta}
          {actions && <div className="flex flex-wrap gap-2.5">{actions}</div>}
        </div>
      )}
    </article>
  );
}

/** RSVP / ticket button. Renders nothing when there's no link. */
export function EventCta({ url, label }: { url?: string; label?: string }) {
  if (!url) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block border-[3px] border-ink bg-ink text-cream px-5 py-[11px] font-bold text-sm tracking-[.12em] uppercase hover:bg-rose hover:text-ink transition-colors"
    >
      {label || "RSVP"}
    </a>
  );
}
