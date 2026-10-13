import Link from "next/link";
import { AddToCalendar } from "@/components/AddToCalendar";
import { EventCard } from "@/components/EventCard";
import { NextUp } from "@/components/NextUp";
import { WeekLineup } from "@/components/WeekLineup";
import { events, eventsVerified, upcomingOccurrences, weeklyLineup } from "@/lib/events";
import { JsonLd, breadcrumbSchema, eventSchemas } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Weekly Events",
  description:
    "What's on at Dirty South Bar in downtown Stuart, FL: live music and DJs every weekend, Wednesday comedy night and Sunday open mic.",
  path: "/events",
});

export default function Events() {
  // Computed at build time. Event structured data covers the next four weeks,
  // so redeploy at least monthly once `eventsVerified` is on. The visible
  // "Next up" dates update in the browser on their own.
  const occurrences = upcomingOccurrences(events);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema("Weekly Events", "/events"),
          ...(eventsVerified ? eventSchemas(occurrences) : []),
        ]}
      />

      {/* Hero */}
      <section className="bg-navy text-center px-5 py-[clamp(70px,9vw,120px)]">
        <h1 className="ultra text-[clamp(52px,8vw,110px)] leading-[.9] text-blush text-stroke-3 [text-shadow:5px_5px_0_theme(colors.ink)]">
          What&apos;s <em className="not-italic text-cream">on</em>
        </h1>
        <p className="font-script italic text-[clamp(26px,3vw,40px)] text-cream mt-5">every week at the Dirty South</p>
        <p className="text-cream text-lg max-w-[560px] mx-auto mt-4 leading-[1.6]">
          Live music, laughs and open mics inside the old Bank of Stuart. Just show up thirsty.
        </p>
      </section>

      {/* The week at a glance */}
      <section className="bg-sand px-[clamp(16px,4vw,56px)] py-[clamp(56px,7vw,96px)] text-center">
        <h2 className="script mb-3">the week at a glance</h2>
        <p className="text-lg mb-10">Doors and drinks every night. Here&apos;s what&apos;s happening when.</p>
        <WeekLineup lineup={weeklyLineup()} />
      </section>

      {/* Event details */}
      <section className="px-[clamp(16px,4vw,56px)] py-[clamp(60px,8vw,110px)]">
        <div className="grid grid-cols-3 max-[1000px]:grid-cols-1 gap-8 max-w-[1180px] mx-auto">
          {events.map((event, i) => (
            <div key={event.id} id={event.id} className="scroll-mt-28">
              <EventCard
                event={event}
                index={i}
                footer={
                  <>
                    <NextUp event={event} initial={occurrences.find((o) => o.event.id === event.id)?.dateLabel} />
                    <AddToCalendar event={event} />
                  </>
                }
                className="h-full"
              />
            </div>
          ))}
        </div>
      </section>

      <div className="h-[34px] bg-checks" aria-hidden />

      {/* Private parties CTA */}
      <section className="px-5 py-[clamp(60px,8vw,100px)] text-center bg-[radial-gradient(ellipse_at_center,theme(colors.cream)_0%,theme(colors.blush)_45%,theme(colors.rose)_100%)]">
        <h2 className="ultra text-[clamp(34px,4.6vw,62px)] leading-none text-ink">
          Want the stage<br />to yourself?
        </h2>
        <p className="text-[19px] max-w-[560px] mx-auto mt-[18px] mb-[30px] leading-[1.55]">
          Book the bar for your bachelorette, birthday or divorce party. We&apos;ll handle the pours, the playlist and the alibi.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/contact" className="btn-block">Book Us</Link>
          <Link href="/#join" className="btn-block bg-cream text-ink hover:bg-sand">Get Event Drops</Link>
        </div>
      </section>
    </>
  );
}
