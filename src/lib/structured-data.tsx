import { site, socialLinks } from "@/lib/site";
import type { MenuItem } from "@/lib/content";
import type { Occurrence } from "@/lib/events";

type Schema = Record<string, unknown>;

const BAR_ID = `${site.url}/#bar`;

export function JsonLd({ data }: { data: Schema | Schema[] }) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so the payload can never close the script tag early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function barSchema(): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "BarOrPub",
    "@id": BAR_ID,
    name: site.name,
    slogan: site.slogan,
    description: site.description,
    url: site.url,
    logo: `${site.url}/images/arch-girl-surf.png`,
    image: [`${site.url}/images/bar-v3.webp`, `${site.url}/images/og-image.jpg`],
    telephone: site.phone.tel,
    email: site.email,
    priceRange: site.priceRange,
    foundingDate: String(site.foundingYear),
    servesCuisine: ["Cocktails"],
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    hasMap: site.mapsUrl,
    hasMenu: `${site.url}/menu`,
    ...((site.hoursVerified as boolean)
      ? {
          openingHoursSpecification: site.hours.map((h) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: h.days,
            opens: h.opens,
            closes: h.closes,
          })),
        }
      : {}),
    ...(socialLinks.length > 0 ? { sameAs: socialLinks.map((s) => s.url) } : {}),
  };
}

export function websiteSchema(): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    publisher: { "@id": BAR_ID },
  };
}

export function breadcrumbSchema(name: string, path: string): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name, item: `${site.url}${path}` },
    ],
  };
}

// One Event per upcoming occurrence, as Google recommends for recurring events.
export function eventSchemas(occurrences: Occurrence[]): Schema[] {
  return occurrences.map((occ) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${occ.event.title} at ${site.name}`,
    description: occ.event.description,
    startDate: occ.startIso,
    endDate: occ.endIso,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    url: `${site.url}/events#${occ.event.id}`,
    image: [`${site.url}/images/og-image.jpg`],
    location: {
      "@type": "Place",
      name: site.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        addressLocality: site.address.city,
        addressRegion: site.address.region,
        postalCode: site.address.postalCode,
        addressCountry: site.address.country,
      },
    },
    organizer: { "@type": "BarOrPub", "@id": BAR_ID, name: site.name, url: site.url },
  }));
}

export function menuSchema(sections: { name: string; items: MenuItem[] }[]): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: `${site.name} Menu`,
    url: `${site.url}/menu`,
    inLanguage: "en-US",
    hasMenuSection: sections
      .filter((section) => section.items.length > 0)
      .map((section) => ({
        "@type": "MenuSection",
        name: section.name,
        hasMenuItem: section.items.map((item) => ({
          "@type": "MenuItem",
          name: item.name,
          description: item.description,
          ...(item.price ? { offers: { "@type": "Offer", price: item.price, priceCurrency: "USD" } } : {}),
        })),
      })),
  };
}
