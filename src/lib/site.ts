// Single source of truth for business details. Pages, metadata and
// structured data (JSON-LD) all read from here, so update it in one place.

export const site = {
  name: "Dirty South Bar",
  url: "https://www.dirtysouthbar.com",
  tagline: "Surf, Sand & Sips",
  slogan: "Come for the cocktails. Stay dirty.",
  description:
    // Keep under ~160 characters so Google shows it in full.
    "Cocktail club in the old Bank of Stuart, downtown Stuart, FL. Signature cocktails, ice-cold beer, cheeky merch and private parties. Voted best bar in the 772.",
  foundingYear: 2024,
  phone: {
    display: "772.210.2095",
    tel: "+17722102095",
  },
  email: "daisy@dirtysouthbar.com",
  address: {
    street: "301 SW St. Lucie Ave",
    city: "Stuart",
    region: "FL",
    postalCode: "34994",
    country: "US",
  },
  // Opens the bar's Google Business listing (CID from the listing's embed code).
  mapsUrl: "https://maps.google.com/?cid=14044226869372328756",
  // Map pin location, from the listing's embed code.
  geo: { latitude: 27.19977, longitude: -80.25461 },
  // Toast online ordering ("Order a round" announcement bar).
  orderUrl: "https://order.toasttab.com/order-and-pay/dirty-south-301-southwest-saint-lucie-avenue/4/",
  // TODO: add the online merch store URL. Until then merch buttons render as labels.
  shopUrl: "",
  // Linked from the current dirtysouthbar.com. Rendered in the header, footer and
  // contact page, and listed in structured data (sameAs).
  social: {
    instagram: "https://www.instagram.com/dirtysouthbar",
    facebook: "https://www.facebook.com/profile.php?id=61565578493483",
    tiktok: "https://www.tiktok.com/@dirtysouthbar",
  },
  priceRange: "$$",
  // Hours must match the Google Business Profile (mismatched hours confuse Google).
  // Keep `hoursDisplay` and `hours` in sync when they change.
  hoursVerified: true,
  hoursDisplay: ["Fri 7PM–2AM", "Sat 5PM–2AM · Sun 2–8PM", "Mon–Thu 8PM–12AM"],
  hours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "20:00", closes: "00:00" },
    { days: ["Friday"], opens: "19:00", closes: "02:00" },
    { days: ["Saturday"], opens: "17:00", closes: "02:00" },
    { days: ["Sunday"], opens: "14:00", closes: "20:00" },
  ],
} as const;

// Header navigation, split around the centered logo. Hash links target homepage sections.
export const NAV_LEFT = [
  { label: "About", href: "/#about" },
  { label: "Menu", href: "/menu" },
  { label: "Events", href: "/events" },
  { label: "Merch", href: "/#merch" },
] as const;

export const NAV_RIGHT = [
  { label: "Book Us", href: "/contact" },
  { label: "Visit", href: "/#visit" },
  { label: "Join", href: "/#join" },
] as const;

// Indexable pages, used for the sitemap.
export const PAGES = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/menu", priority: 0.9, changeFrequency: "monthly" },
  { path: "/events", priority: 0.9, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
] as const;

// Social share image (1200x630) used for Open Graph and Twitter cards.
export const shareImage = {
  url: "/images/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "The bar at Dirty South Bar in downtown Stuart, Florida",
};

export const socialLinks = Object.entries(site.social)
  .filter(([, url]) => url)
  .map(([network, url]) => ({ network: network as keyof typeof site.social, url }));
