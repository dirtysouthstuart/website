import { site, socialLinks } from "@/lib/site";
import type { Occurrence, SpecialTiming } from "@/lib/events";
import type { SpecialEvent } from "@/sanity/types";

export type MenuSchemaItem = { name: string; description?: string; price?: number };

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

const LOCATION = {
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
};

function eventSchema(e: { name: string; description: string; startDate: string; endDate?: string; url: string }): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${e.name} at ${site.name}`,
    description: e.description,
    startDate: e.startDate,
    ...(e.endDate ? { endDate: e.endDate } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    url: e.url,
    image: [`${site.url}/images/og-image.jpg`],
    location: LOCATION,
    organizer: { "@type": "BarOrPub", "@id": BAR_ID, name: site.name, url: site.url },
  };
}

// One Event per upcoming occurrence of weekly events, as Google recommends for
// recurring events, plus one per upcoming special event.
export function eventSchemas(
  occurrences: Occurrence[],
  specials: { event: SpecialEvent; timing: SpecialTiming }[]
): Schema[] {
  return [
    ...specials.map(({ event, timing }) =>
      eventSchema({
        name: event.title,
        description: event.description,
        startDate: timing.startIso,
        endDate: timing.hasEnd ? timing.endIso : undefined,
        url: `${site.url}/events#${event._id}`,
      })
    ),
    ...occurrences.map((occ) =>
      eventSchema({
        name: occ.event.title,
        description: occ.event.description,
        startDate: occ.startIso,
        endDate: occ.endIso,
        url: `${site.url}/events#${occ.event._id}`,
      })
    ),
  ];
}

export function menuSchema(sections: { name: string; items: MenuSchemaItem[] }[]): Schema {
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
          ...(item.description ? { description: item.description } : {}),
          ...(item.price != null ? { offers: { "@type": "Offer", price: item.price, priceCurrency: "USD" } } : {}),
        })),
      })),
  };
}
