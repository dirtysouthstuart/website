import { sanityFetch } from "./live";
import { EVENTS_QUERY, FEATURED_COCKTAILS_QUERY, MENU_QUERY } from "./queries";
import type { Cocktail, Events, Menu } from "./types";

// Each helper falls back to empty content if Sanity can't be reached, so a
// section hides instead of the whole page failing.
async function safeFetch<T>(query: string, fallback: T): Promise<T> {
  try {
    const { data } = await sanityFetch({ query });
    return (data as T) ?? fallback;
  } catch (error) {
    console.error("[sanity] query failed:", error);
    return fallback;
  }
}

const EMPTY_MENU: Menu = { cocktails: [], beers: [], wines: [], food: [], settings: null };

export async function getMenu(): Promise<Menu> {
  const menu = await safeFetch<Menu>(MENU_QUERY, EMPTY_MENU);
  return {
    cocktails: menu.cocktails ?? [],
    beers: menu.beers ?? [],
    wines: menu.wines ?? [],
    food: menu.food ?? [],
    settings: menu.settings ?? null,
  };
}

export const getFeaturedCocktails = () => safeFetch<Cocktail[]>(FEATURED_COCKTAILS_QUERY, []);

export async function getEvents(): Promise<Events> {
  const events = await safeFetch<Events>(EVENTS_QUERY, { weekly: [], special: [] });
  return { weekly: events.weekly ?? [], special: events.special ?? [] };
}
