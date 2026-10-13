import Link from "next/link";
import Image from "next/image";
import { JoinClubForm } from "@/components/JoinClubForm";
import { MenuCard } from "@/components/MenuCard";
import { EventCard } from "@/components/EventCard";
import { events } from "@/lib/events";
import { instagramPhotos, merch, regularMenuItems } from "@/lib/content";
import { site } from "@/lib/site";

const sectionPad = "px-[clamp(16px,4vw,56px)] py-[clamp(60px,8vw,110px)] text-center";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[min(88vh,820px)] py-10 grid place-items-center text-center overflow-hidden bg-navy">
        <Image
          src="/images/bar-v3.webp"
          alt="The bar at Dirty South Bar in downtown Stuart, Florida"
          fill
          preload
          fetchPriority="high"
          sizes="100vw"
          className="object-cover blur-[2px] saturate-[1.05] scale-[1.04]"
        />
        <div className="absolute inset-0 bg-[rgba(43,61,77,.28)]" aria-hidden />
        <div className="relative z-[2] px-5">
          <h1>
            <span className="block mb-3.5 font-semibold uppercase text-[clamp(20px,2.4vw,32px)] tracking-[.12em] text-sand text-stroke-1 [text-shadow:3px_3px_0_theme(colors.ink)]">
              {site.name}
            </span>
            <span className="block ultra text-[clamp(42px,6.6vw,96px)] leading-none text-cream text-stroke-3 [text-shadow:5px_5px_0_theme(colors.ink)]">
              Come for the<br />cocktails.<br /><em className="not-italic text-blush">Stay dirty.</em>
            </span>
          </h1>
          <p className="font-script italic font-semibold text-[clamp(28px,3.4vw,46px)] mt-[18px] mb-1.5 text-cream [text-shadow:0_2px_10px_rgba(0,0,0,.4)]">
            {site.tagline}
          </p>
          <p className="font-semibold text-[clamp(16px,1.6vw,20px)] tracking-[.06em] mb-[26px] text-cream [text-shadow:0_2px_10px_rgba(0,0,0,.4)]">
            ★ Voted best bar in the 772 ★
          </p>
          <Link href="#visit" className="btn-block">Find Us</Link>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="grid grid-cols-2 max-[860px]:grid-cols-1 items-center gap-[clamp(24px,5vw,80px)] py-[clamp(70px,9vw,130px)] pl-0 pr-[clamp(16px,5vw,80px)] max-[860px]:pr-4 max-w-[1320px] mx-auto"
      >
        <Image
          src="/images/gen-hand-martini.webp"
          alt="Hand with pink nails holding a dirty martini"
          width={900}
          height={1330}
          sizes="(max-width: 860px) 100vw, 620px"
          className="w-full max-w-[620px] h-auto"
        />
        <div className="max-[860px]:pl-4">
          <h2 className="ultra text-[clamp(44px,5.4vw,78px)] leading-none text-ink">
            We make<br />dirty<br /><span className="text-rose">drinks.</span>
          </h2>
          <p className="text-lg leading-[1.7] mt-[22px] max-w-[520px]">
            Welcome to Dirty South Bar. We&apos;re a cocktail club inside the old Bank of Stuart, the oldest building in Stuart, that specializes in drinks with personality: signature cocktails, ice-cold beer, cheeky merch and a good time. A great place for cocktail snobs and basic beach babes looking for a good time.
          </p>
          <p className="font-script italic text-[26px] text-navy mt-[18px]">Cheers, darling.</p>
        </div>
      </section>

      {/* Menu highlights */}
      <section id="menu" className={`${sectionPad} bg-sand`}>
        <h2 className="script">the dirty list</h2>
        <p className="text-lg mt-2.5 mb-10">A few house favorites. Ask the bartender about the ones we can&apos;t print.</p>
        <div className="grid grid-cols-5 max-[1100px]:grid-cols-3 max-[700px]:grid-cols-1 gap-[18px] max-w-[1180px] mx-auto mb-10">
          {regularMenuItems.slice(0, 5).map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
        <Link href="/menu" className="btn-block">See the Full Menu</Link>
      </section>

      {/* Weekly events */}
      <section id="events" className={`${sectionPad} bg-navy`}>
        <h2 className="ultra text-[clamp(44px,6vw,84px)] leading-[.9] text-blush text-stroke-3 [text-shadow:5px_5px_0_theme(colors.ink)]">
          What&apos;s <em className="not-italic text-cream">on</em>
        </h2>
        <p className="text-lg text-cream mt-4 mb-11">Every week at the Dirty South.</p>
        <div className="grid grid-cols-3 max-[1000px]:grid-cols-1 gap-[clamp(16px,2.4vw,32px)] max-w-[1180px] mx-auto mb-11">
          {events.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>
        <Link href="/events" className="btn-block bg-blush text-ink hover:bg-cream">See All Events</Link>
      </section>

      {/* Merch */}
      <section id="merch" className={`${sectionPad} bg-blush`}>
        <h2 className="script">meet the merch</h2>
        <p className="text-lg mt-2.5 mb-11">Our cheeky lineup of take-home souvenirs.</p>
        <div className="grid grid-cols-3 max-[860px]:grid-cols-1 gap-[clamp(16px,2.4vw,32px)] max-w-[1180px] mx-auto">
          {merch.map((product) => {
            const labelClass =
              "inline-block border-[3px] border-ink bg-sand px-5 py-[11px] font-bold text-sm tracking-[.12em] uppercase";
            return (
              <div key={product.name} className="group">
                <div className="card-ink p-3.5 shadow-[6px_6px_0_theme(colors.navy)] transition-transform [transition-duration:250ms] group-hover:-rotate-[1.5deg] group-hover:-translate-y-1.5">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    width={600}
                    height={600}
                    sizes="(max-width: 860px) 100vw, 360px"
                    className="aspect-square object-cover w-full"
                  />
                </div>
                <p className="mt-5 mb-2.5 text-base">{product.kicker}</p>
                {site.shopUrl ? (
                  <a href={site.shopUrl} target="_blank" rel="noopener noreferrer" className={`${labelClass} hover:bg-cream transition-colors`}>
                    {product.name}
                  </a>
                ) : (
                  <span className={labelClass}>{product.name}</span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Private parties */}
      <section
        id="parties"
        className="relative px-5 py-[clamp(70px,9vw,120px)] text-center overflow-hidden bg-[radial-gradient(ellipse_at_center,theme(colors.cream)_0%,theme(colors.blush)_45%,theme(colors.rose)_100%)]"
      >
        <Image
          src="/images/flamingo-staydirty.webp"
          alt=""
          width={380}
          height={339}
          sizes="190px"
          className="absolute w-[clamp(120px,14vw,190px)] h-auto opacity-95 left-[4%] top-[16%] -rotate-[10deg] max-[860px]:hidden"
        />
        <Image
          src="/images/borndirty-board.webp"
          alt=""
          width={380}
          height={352}
          sizes="190px"
          className="absolute w-[clamp(120px,14vw,190px)] h-auto opacity-95 right-[4%] bottom-[12%] rotate-[9deg] max-[860px]:hidden"
        />
        <h2 className="relative ultra text-[clamp(40px,5.6vw,82px)] leading-none text-ink">
          Private parties.<br />Zero judgment.
        </h2>
        <p className="relative text-[19px] max-w-[560px] mx-auto mt-[18px] mb-[30px] leading-[1.55]">
          Bachelorettes, birthdays, divorces, Tuesdays. Book the bar and we&apos;ll handle the pours, the playlist and the alibi.
        </p>
        <Link href="/contact" className="relative btn-block">Book Us</Link>
      </section>

      <div className="h-[34px] bg-checks" aria-hidden />

      {/* Instagram */}
      <section className="px-[clamp(16px,4vw,56px)] py-[clamp(56px,7vw,96px)] text-center">
        <h2 className="ultra text-[clamp(28px,3.4vw,46px)] leading-[1.1]">
          Making downtown Stuart a little{" "}
          <i className="font-script italic normal-case font-normal text-rose">dirtier</i> since {site.foundingYear}
        </h2>
        <div className="grid grid-cols-6 max-[860px]:grid-cols-3 gap-2.5 mt-9">
          {instagramPhotos.map((photo) => {
            const img = (
              <Image
                src={photo.src}
                alt={photo.alt}
                width={400}
                height={400}
                sizes="(max-width: 860px) 33vw, 16vw"
                className="aspect-square object-cover w-full transition-[filter] duration-200 group-hover:saturate-[1.3] group-hover:brightness-105"
              />
            );
            return site.social.instagram ? (
              <a key={photo.src} href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="group">
                {img}
              </a>
            ) : (
              <div key={photo.src}>{img}</div>
            );
          })}
        </div>
      </section>

      {/* Email club */}
      <section id="join" className="px-5 py-[clamp(60px,8vw,110px)] text-center bg-sand">
        <h2 className="ultra text-[clamp(36px,4.6vw,62px)] leading-[1.05]">
          Emails are boring.<br />Ours are dirty.
        </h2>
        <p className="text-lg mt-4 mb-[30px] mx-auto max-w-[460px] leading-[1.55]">
          Join the Born Dirty Club for event drops, secret menu nights and a birthday shot on us.
        </p>
        <JoinClubForm />
      </section>
    </>
  );
}
