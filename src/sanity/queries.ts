import { defineQuery } from "next-sanity";

const IMAGE = /* groq */ `{ asset, hotspot, crop, alt }`;

export const MENU_QUERY = defineQuery(`{
  "cocktails": *[_type == "cocktail" && available != false] | order(orderRank) {
    _id, name, description, availability, availableUntil, zeroProof, featured, price, image ${IMAGE}
  },
  "beers": *[_type == "beer" && available != false] | order(orderRank) {
    _id, name, brewery, style, abv, serving, local, price
  },
  "wines": *[_type == "wine" && available != false] | order(orderRank) {
    _id, name, wineType, details, glassPrice, bottlePrice
  },
  "food": *[_type == "food" && available != false] | order(orderRank) {
    _id, name, category, description, dietary, price, image ${IMAGE}
  },
  "settings": *[_id == "menuSettings"][0] {
    beerListImage ${IMAGE}, beerNote, wineNote, foodNote
  }
}`);

// Year-round cocktails for the homepage: featured ones first, then menu order.
export const FEATURED_COCKTAILS_QUERY = defineQuery(`
  *[_type == "cocktail" && available != false && availability == "signature" && zeroProof != true]
    | order(featured desc, orderRank) [0...5] {
    _id, name, description, availability, price
  }
`);

export const EVENTS_QUERY = defineQuery(`{
  "weekly": *[_type == "weeklyEvent" && active != false && count(schedule) > 0] | order(orderRank) {
    _id, title, description, dayLabel, schedule[]{ day, start, end }, ctaUrl, ctaLabel
  },
  "special": *[_type == "specialEvent" && defined(date) && defined(start)] | order(date asc, start asc) [0...100] {
    _id, title, date, start, end, description, priceNote, ctaUrl, ctaLabel
  }
}`);
