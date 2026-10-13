import menuData from "@/data/menu.json";
import { TIME_ZONE } from "@/lib/events";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  category: string;
  // Optional: shown on the full menu and in structured data when set.
  price?: string;
  // Seasonal drinks are only around for a while. They get their own section on
  // the full menu instead of appearing under `category`.
  seasonal?: boolean;
  // Optional last day a seasonal drink is offered ("YYYY-MM-DD", inclusive).
  // After it passes the drink disappears from the site automatically.
  availableUntil?: string;
};

export const menuItems = menuData as MenuItem[];

// Year-round drinks.
export const regularMenuItems = menuItems.filter((item) => !item.seasonal);

// Menu sections in first-seen order, e.g. "Signature Cocktails".
export const menuCategories = [...new Set(regularMenuItems.map((item) => item.category))];

/** Seasonal drinks from `items` still on offer today (in the bar's time zone). */
export function currentSeasonalItems(items: MenuItem[] = menuItems, now = new Date()) {
  // en-CA formats as YYYY-MM-DD, so dates compare as strings.
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE }).format(now);
  return items.filter((item) => item.seasonal && (!item.availableUntil || item.availableUntil >= today));
}

/** "2026-10-31" -> "Oct 31" */
export function formatAvailableUntil(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" }).format(
    new Date(Date.UTC(y, m - 1, d))
  );
}

export const merch = [
  { name: "Stay Dirty Coasters", kicker: "Set your drink down, babe", image: "/images/coasters-v3.webp", alt: "Stay Dirty flamingo coasters" },
  { name: "Surf, Sand & Sips Trucker", kicker: "Bad hair night insurance", image: "/images/gen-hat.webp", alt: "Dirty South trucker hat" },
  { name: "Born Dirty Tee", kicker: "For the girls who were", image: "/images/tee-v2.webp", alt: "Born Dirty tee" },
];

export const instagramPhotos = [
  { src: "/images/gen-boots.webp", alt: "Cowgirl boots at the bar" },
  { src: "/images/gen-hand-martini-sq.webp", alt: "Dirty martini" },
  { src: "/images/coasters-v3.webp", alt: "Dirty South coasters and a cocktail on the bar" },
  { src: "/images/bar-v3-sq.webp", alt: "The bar" },
  { src: "/images/gen-hat.webp", alt: "Trucker hat" },
  { src: "/images/tee-v2.webp", alt: "Tee" },
];
