"use client";

import { useEffect, useState } from "react";
import { MenuCard } from "@/components/MenuCard";
import { currentSeasonalItems, type MenuItem } from "@/lib/content";

// Seasonal drinks that were current at build time. The list is re-checked in the
// browser so drinks past their `availableUntil` date drop off without a redeploy.
export function SeasonalSips({ items, gridClass }: { items: MenuItem[]; gridClass: string }) {
  const [current, setCurrent] = useState(items);

  useEffect(() => {
    setCurrent(currentSeasonalItems(items));
  }, [items]);

  if (current.length === 0) return null;

  return (
    <div
      id="seasonal"
      className="relative bg-blush border-[3px] border-ink shadow-[6px_6px_0_theme(colors.navy)] px-[clamp(20px,3vw,44px)] pt-16 pb-[clamp(28px,3vw,44px)] scroll-mt-28"
    >
      {/* Tag straddles the top border; pt-16 keeps the heading clear of it at every width */}
      <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-2 bg-ink text-cream px-5 py-2 font-bold text-xs tracking-[.16em] uppercase whitespace-nowrap">
        ★ Limited time ★
      </span>
      <h2 className="ultra text-[clamp(30px,3.6vw,46px)] leading-[1.05] text-ink">Seasonal Sips</h2>
      <p className="font-script italic text-[clamp(20px,2vw,26px)] text-navy mt-2 mb-7">
        Here for a good time, not a long time.
      </p>
      <div className={gridClass}>
        {current.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
