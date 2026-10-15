import { beer } from "./beer";
import { cocktail } from "./cocktail";
import { food } from "./food";
import { menuSettings } from "./menuSettings";
import { specialEvent } from "./specialEvent";
import { weeklyEvent } from "./weeklyEvent";
import { wine } from "./wine";

export const schemaTypes = [cocktail, beer, wine, food, menuSettings, weeklyEvent, specialEvent];

// Documents that exist exactly once (fixed ID = type name).
export const SINGLETON_TYPES = new Set(["menuSettings"]);
