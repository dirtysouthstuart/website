import { cn } from "@/lib/utils";
import { formatAvailableUntil, type MenuItem } from "@/lib/content";

export function MenuCard({ item, className }: { item: MenuItem; className?: string }) {
  return (
    <div className={cn("card-ink px-5 py-[22px] text-left", className)}>
      <h3 className="ultra text-[21px] leading-[1.1] text-navy">{item.name}</h3>
      <p className="mt-2.5 leading-[1.55]">{item.description}</p>
      {(item.price || item.availableUntil) && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          {item.price && <p className="font-bold text-navy">${item.price}</p>}
          {item.availableUntil && (
            <p className="font-bold text-xs tracking-[.12em] uppercase text-navy">
              Until {formatAvailableUntil(item.availableUntil)}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
