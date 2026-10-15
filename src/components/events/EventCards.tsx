import { AddToCalendar } from "@/components/AddToCalendar";
import { EventCard, EventCta } from "@/components/EventCard";
import { HideAfter } from "@/components/HideAfter";
import { NextUp } from "@/components/NextUp";
import { dayLabel, scheduleLabel, specialTiming, type Occurrence } from "@/lib/events";
import type { SpecialEvent, WeeklyEvent } from "@/sanity/types";

export function WeeklyEventCard({
  event,
  index,
  next,
  detailed = false,
}: {
  event: WeeklyEvent;
  index: number;
  next?: Occurrence;
  /** Full card with next date and calendar button (events page) vs. compact (homepage) */
  detailed?: boolean;
}) {
  const cta = <EventCta url={event.ctaUrl} label={event.ctaLabel} />;
  return (
    <EventCard
      pill={dayLabel(event)}
      index={index}
      title={event.title}
      when={scheduleLabel(event)}
      description={event.description}
      meta={detailed ? <NextUp event={event} initial={next?.dateLabel} /> : undefined}
      actions={
        detailed || event.ctaUrl ? (
          <>
            {detailed && <AddToCalendar weekly={event} />}
            {cta}
          </>
        ) : undefined
      }
      className="h-full"
    />
  );
}

export function SpecialEventCard({
  event,
  index,
  detailed = false,
}: {
  event: SpecialEvent;
  index: number;
  detailed?: boolean;
}) {
  const timing = specialTiming(event);
  return (
    <HideAfter endsAt={timing.endsAt}>
      <EventCard
        pill={timing.dateLabel}
        index={index}
        title={event.title}
        when={timing.timeLabel}
        description={event.description}
        priceNote={event.priceNote}
        actions={
          detailed || event.ctaUrl ? (
            <>
              {detailed && <AddToCalendar special={event} />}
              <EventCta url={event.ctaUrl} label={event.ctaLabel} />
            </>
          ) : undefined
        }
        className="h-full"
      />
    </HideAfter>
  );
}
