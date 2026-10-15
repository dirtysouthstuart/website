// Shapes returned by the GROQ queries in ./queries.ts. Keep in sync with the
// schemas in /studio/schemaTypes.

export type SanityImage = {
  asset?: { _ref: string };
  hotspot?: { x: number; y: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt?: string;
};

export type Availability = "signature" | "seasonal" | "limited";

export type Cocktail = {
  _id: string;
  name: string;
  description: string;
  availability: Availability;
  availableUntil?: string;
  zeroProof?: boolean;
  featured?: boolean;
  price?: number;
  image?: SanityImage;
};

export type Beer = {
  _id: string;
  name: string;
  brewery?: string;
  style?: string;
  abv?: number;
  serving: "draft" | "package";
  local?: boolean;
  price?: number;
};

export type WineType = "sparkling" | "white" | "rose" | "red";

export type Wine = {
  _id: string;
  name: string;
  wineType: WineType;
  details?: string;
  glassPrice?: number;
  bottlePrice?: number;
};

export type FoodCategory = "pizza" | "bites" | "sweets";

export type Food = {
  _id: string;
  name: string;
  category: FoodCategory;
  description?: string;
  dietary?: string[];
  price?: number;
  image?: SanityImage;
};

export type MenuSettings = {
  beerListImage?: SanityImage;
  beerNote?: string;
  wineNote?: string;
  foodNote?: string;
};

export type Menu = {
  cocktails: Cocktail[];
  beers: Beer[];
  wines: Wine[];
  food: Food[];
  settings: MenuSettings | null;
};

export type Weekday = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

export type EventSlot = { day: Weekday; start: string; end: string };

export type EventCta = { ctaUrl?: string; ctaLabel?: string };

export type WeeklyEvent = EventCta & {
  _id: string;
  title: string;
  description: string;
  dayLabel?: string;
  schedule: EventSlot[];
};

export type SpecialEvent = EventCta & {
  _id: string;
  title: string;
  date: string; // YYYY-MM-DD
  start: string; // HH:MM
  end?: string;
  description: string;
  priceNote?: string;
};

export type Events = {
  weekly: WeeklyEvent[];
  special: SpecialEvent[];
};

export const WINE_TYPE_LABELS: Record<WineType, string> = {
  sparkling: "Sparkling",
  white: "White",
  rose: "Rosé",
  red: "Red",
};

// Menu order for food categories (matches /studio/schemaTypes/food.ts).
export const FOOD_CATEGORY_LABELS: Record<FoodCategory, string> = {
  pizza: "Personal Pizzas",
  bites: "Bites",
  sweets: "Sweets",
};
