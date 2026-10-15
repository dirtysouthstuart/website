import Link from "next/link";
import { WeekLineup } from "@/components/WeekLineup";
import { SpecialEventCard, WeeklyEventCard } from "@/components/events/EventCards";
import { upcomingOccurrences, upcomingSpecials, weeklyLineup } from "@/lib/events";
import { JsonLd, breadcrumbSchema, eventSchemas } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { getEvents } from "@/sanity/fetch";

// Content updates arrive instantly via Sanity Live; the hourly refresh keeps
// "next up" dates and event listings for Google current.
export const revalidate = 3600;

export const metadata = pageMetadata({
  title: "Events",
  description:
    "What's on at Dirty South Bar in downtown Stuart, FL: special events, live music and weekly nights out inside the old Bank of Stuart.",
  path: "/events",
});

const gridClass = "grid grid-cols-3 max-[1000px]:grid-cols-1 gap-8 max-w-[1180px] mx-auto";

export default async function Events() {
  const { weekly, special } = await getEvents();
  const specials = upcomingSpecials(special);
  const occurrences = upcomingOccurrences(weekly);

  return (
    <>
      <JsonLd data={[breadcrumbSchema("Events", "/events"), ...eventSchemas(occurrences, specials)]} />

      {/* Hero */}
      <section className="bg-navy text-center px-5 py-[clamp(70px,9vw,120px)]">
        <h1 className="ultra text-[clamp(52px,8vw,110px)] leading-[.9] text-blush text-stroke-3 [text-shadow:5px_5px_0_theme(colors.ink)]">
          What&apos;s <em className="not-italic text-cream">on</em>
        </h1>
        <p className="font-script italic text-[clamp(26px,3vw,40px)] text-cream mt-5">at the Dirty South</p>
        <p className="text-cream text-lg max-w-[560px] mx-auto mt-4 leading-[1.6]">
          Special nights and weekly regulars inside the old Bank of Stuart. Just show up thirsty.
        </p>
      </section>

      {/* One-off events */}
      {specials.length > 0 && (
        <section className="px-[clamp(16px,4vw,56px)] py-[clamp(60px,8vw,110px)] text-center">
          <h2 className="script mb-3">coming up</h2>
          <p className="text-lg mb-10">One night only. Don&apos;t miss it.</p>
          <div className={gridClass}>
            {specials.map(({ event }, i) => (
              <div key={event._id} id={event._id} className="scroll-mt-28">
                <SpecialEventCard event={event} index={i} detailed />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Weekly regulars */}
      {weekly.length > 0 && (
        <>
          <section className="bg-sand px-[clamp(16px,4vw,56px)] py-[clamp(56px,7vw,96px)] text-center">
            <h2 className="script mb-3">every week</h2>
            <p className="text-lg mb-10">Doors and drinks every night. Here&apos;s what&apos;s happening when.</p>
            <WeekLineup lineup={weeklyLineup(weekly)} />
          </section>

          <section className="px-[clamp(16px,4vw,56px)] py-[clamp(60px,8vw,110px)]">
            <div className={gridClass}>
              {weekly.map((event, i) => (
                <div key={event._id} id={event._id} className="scroll-mt-28">
                  <WeeklyEventCard
                    event={event}
                    index={i}
                    next={occurrences.find((o) => o.event._id === event._id)}
                    detailed
                  />
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {specials.length === 0 && weekly.length === 0 && (
        <section className="px-5 py-[clamp(60px,8vw,110px)] text-center">
          <p className="text-lg max-w-[480px] mx-auto">
            Nothing on the books just yet. Follow{" "}
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="underline underline-offset-[3px] font-bold">
              @dirtysouthbar
            </a>{" "}
            or join the club for event drops.
          </p>
        </section>
      )}

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
