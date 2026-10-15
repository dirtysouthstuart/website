import { TIME_ZONE } from "@/lib/events";
import type { Cocktail } from "@/sanity/types";

// Menu and events come from Sanity (see src/sanity). Merch and the Instagram
// grid stay hardcoded until merch launches.

/** Today's date in the bar's time zone as YYYY-MM-DD (en-CA formats that way). */
const barDate = (now: Date) => new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE }).format(now);

/** Seasonal and limited-time cocktails still on offer today. */
export function currentSpecialCocktails(cocktails: Cocktail[], now = new Date()) {
  const today = barDate(now);
  return cocktails.filter(
    (c) => c.availability !== "signature" && (!c.availableUntil || c.availableUntil >= today)
  );
}

/** "2026-10-31" -> "Oct 31" */
export function formatAvailableUntil(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" }).format(
    new Date(Date.UTC(y, m - 1, d))
  );
}

/** 14 -> "$14", 12.5 -> "$12.50" */
export function formatPrice(price?: number) {
  if (price == null) return null;
  return `$${Number.isInteger(price) ? price : price.toFixed(2)}`;
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
