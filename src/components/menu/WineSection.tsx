import { formatPrice } from "@/lib/content";
import { WINE_TYPE_LABELS, type Wine, type WineType } from "@/sanity/types";

const ORDER: WineType[] = ["sparkling", "white", "rose", "red"];

export function WineSection({ wines }: { wines: Wine[] }) {
  const groups = ORDER.map((type) => ({ type, wines: wines.filter((w) => w.wineType === type) })).filter(
    (g) => g.wines.length > 0
  );
  const hasBottle = wines.some((w) => w.bottlePrice != null);

  return (
    <div className="card-ink max-w-[860px] mx-auto px-[clamp(20px,3vw,44px)] py-8 text-left">
      {/* Column headings for the prices */}
      <div className="flex justify-end gap-6 text-xs font-bold uppercase tracking-[.14em] text-navy pb-2">
        <span className="w-16 text-right">Glass</span>
        {hasBottle && <span className="w-16 text-right">Bottle</span>}
      </div>
      {groups.map((group) => (
        <div key={group.type} className="mt-4 first-of-type:mt-0">
          <h3 className="ultra text-2xl text-navy border-b-[3px] border-ink pb-1 mb-2">{WINE_TYPE_LABELS[group.type]}</h3>
          <ul className="divide-y-2 divide-dashed divide-ink/30">
            {group.wines.map((wine) => (
              <li key={wine._id} className="py-3 flex items-start gap-6">
                <div className="flex-1">
                  <p className="font-bold leading-snug">{wine.name}</p>
                  {wine.details && <p className="text-sm text-navy">{wine.details}</p>}
                </div>
                <span className="w-16 text-right font-bold text-navy">{formatPrice(wine.glassPrice) ?? "–"}</span>
                {hasBottle && <span className="w-16 text-right font-bold text-navy">{formatPrice(wine.bottlePrice) ?? "–"}</span>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
