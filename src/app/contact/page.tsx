import { MapWithConsent } from "@/components/MapWithConsent";
import { SocialLinks } from "@/components/SocialLinks";
import { JsonLd, breadcrumbSchema } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { ContactForm } from "./contact-form";

export const metadata = pageMetadata({
  title: "Private Parties & Contact",
  description:
    "Book Dirty South Bar for bachelorettes, birthdays and private parties in downtown Stuart, FL. 301 SW St. Lucie Ave · 772.210.2095.",
  path: "/contact",
});

const headingClass = "font-bold text-sm tracking-[.14em] uppercase mb-3 text-navy";

export default function Contact() {
  return (
    <>
      <JsonLd data={breadcrumbSchema("Private Parties & Contact", "/contact")} />

      <section className="relative px-5 py-[clamp(70px,9vw,120px)] text-center overflow-hidden bg-[radial-gradient(ellipse_at_center,theme(colors.cream)_0%,theme(colors.blush)_45%,theme(colors.rose)_100%)]">
        <h1 className="ultra text-[clamp(40px,5.6vw,82px)] leading-none text-ink">
          Private parties.<br />Zero judgment.
        </h1>
        <p className="text-[19px] max-w-[560px] mx-auto mt-[18px] leading-[1.55]">
          Bachelorettes, birthdays, divorces, Tuesdays. Book the bar and we&apos;ll handle the pours, the playlist and the alibi.
        </p>
      </section>

      <div className="h-[34px] bg-checks" aria-hidden />

      <section className="px-[clamp(16px,4vw,56px)] py-[clamp(56px,7vw,96px)]">
        <div className="grid grid-cols-[1fr_1.4fr] max-[960px]:grid-cols-1 gap-[clamp(32px,5vw,72px)] max-w-[1180px] mx-auto items-start">
          <div className="space-y-8">
            <div>
              <h2 className="ultra text-[clamp(32px,3.6vw,48px)] leading-[1.05] mb-4">Get in touch</h2>
              <p className="text-lg leading-[1.6]">
                Planning a party or just have a question? Send us a note, give us a call or swing by the old Bank of Stuart.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 text-base leading-[1.8]">
              <div>
                <h3 className={headingClass}>Visit</h3>
                <address className="not-italic">
                  <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-navy">
                    {site.address.street}<br />
                    {site.address.city}, {site.address.region} {site.address.postalCode}
                  </a>
                  <br />
                  <a href={`tel:${site.phone.tel}`} className="hover:text-navy">{site.phone.display}</a>
                  <br />
                  <a href={`mailto:${site.email}`} className="underline underline-offset-[3px] hover:text-navy break-all">{site.email}</a>
                </address>
              </div>
              <div>
                <h3 className={headingClass}>Hours</h3>
                <p>
                  {site.hoursDisplay.map((line, i) => (
                    <span key={line}>
                      {i > 0 && <br />}
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            </div>
            <div>
              <h3 className={headingClass}>Follow along</h3>
              <SocialLinks />
            </div>
            <MapWithConsent />
          </div>

          <div className="card-ink p-[clamp(20px,3vw,40px)] shadow-[6px_6px_0_theme(colors.navy)]">
            <h2 className="script mb-8 text-center">book the bar</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
