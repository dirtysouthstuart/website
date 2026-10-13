import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

const headingClass = "font-bold text-sm tracking-[.14em] uppercase mb-3 text-navy";
const linkClass = "underline underline-offset-[3px] hover:text-navy";

export function Footer() {
  return (
    <footer id="visit" className="bg-blush px-[clamp(16px,4vw,56px)] pt-[clamp(56px,7vw,90px)] pb-10">
      <div className="grid grid-cols-[auto_1fr_1fr_1fr] max-[860px]:grid-cols-2 gap-10 max-w-[1180px] mx-auto items-start text-base leading-[1.8]">
        <Image src="/images/vert-dirtysouth.webp" alt={site.name} width={140} height={649} sizes="70px" className="w-[70px] h-auto" />

        <div>
          <h2 className={headingClass}>Visit</h2>
          <address className="not-italic">
            <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-navy">
              {site.address.street}<br />
              {site.address.city}, {site.address.region} {site.address.postalCode}
            </a>
            <br />
            <a href={`tel:${site.phone.tel}`} className="hover:text-navy">{site.phone.display}</a>
            <br />
            <a href={`mailto:${site.email}`} className="hover:text-navy">{site.email}</a>
          </address>
        </div>

        <div>
          <h2 className={headingClass}>Hours</h2>
          <p>
            {site.hoursDisplay.map((line, i) => (
              <span key={line}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </p>
        </div>

        <div>
          <h2 className={headingClass}>Explore</h2>
          <ul>
            <li><Link href="/menu" className={linkClass}>Cocktail menu</Link></li>
            <li><Link href="/events" className={linkClass}>Weekly events</Link></li>
            <li><Link href="/contact" className={linkClass}>Private parties</Link></li>
            <li><Link href="/#merch" className={linkClass}>Merch</Link></li>
            {site.social.instagram && (
              <li>
                <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className={linkClass}>Instagram</a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <p className="text-center mt-11 text-[13px] text-navy">
        © {new Date().getFullYear()} {site.name} · Stuart, Florida · Please drink responsibly. Or at least dirty.
      </p>
    </footer>
  );
}
