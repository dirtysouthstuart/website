import { cn } from "@/lib/utils";
import { formatAvailableUntil, formatPrice } from "@/lib/content";
import { sanityImageProps } from "@/sanity/image";
import type { SanityImage } from "@/sanity/types";

const DIETARY_LABELS: Record<string, string> = {
  vegetarian: "V",
  vegan: "VG",
  "gluten-free": "GF",
  spicy: "Spicy",
};

export function MenuCard({
  name,
  description,
  price,
  badge,
  availableUntil,
  dietary,
  image,
  className,
}: {
  name: string;
  description?: string;
  price?: number;
  /** e.g. "Seasonal" or "Limited time" */
  badge?: string;
  availableUntil?: string;
  dietary?: string[];
  image?: SanityImage;
  className?: string;
}) {
  const priceLabel = formatPrice(price);
  return (
    <div className={cn("card-ink text-left flex flex-col overflow-hidden", className)}>
      {image?.asset && (
        // Plain <img>: Sanity's CDN does the resizing (see sanityImageProps).
        // eslint-disable-next-line @next/next/no-img-element
        <img
          {...sanityImageProps(image, 4 / 3)}
          alt={image.alt || name}
          sizes="(max-width: 600px) 100vw, (max-width: 860px) 50vw, 380px"
          loading="lazy"
          decoding="async"
          className="w-full h-auto aspect-[4/3] object-cover border-b-[3px] border-ink"
        />
      )}
      <div className="px-5 py-[22px] flex-1 flex flex-col">
        {badge && (
          <span className="self-start mb-2.5 bg-ink text-cream px-2.5 py-1 font-bold text-[11px] tracking-[.14em] uppercase">
            {badge}
          </span>
        )}
        <div className="flex items-start justify-between gap-3">
          <h3 className="ultra text-[21px] leading-[1.1] text-navy">{name}</h3>
          {priceLabel && <p className="font-bold text-navy shrink-0">{priceLabel}</p>}
        </div>
        {description && <p className="mt-2.5 leading-[1.55]">{description}</p>}
        {(availableUntil || (dietary && dietary.length > 0)) && (
          <div className="mt-auto pt-3 flex flex-wrap items-center gap-2">
            {dietary?.map((tag) => (
              <span key={tag} className="border-2 border-ink px-1.5 text-[11px] font-bold uppercase tracking-[.08em]" title={tag}>
                {DIETARY_LABELS[tag] ?? tag}
              </span>
            ))}
            {availableUntil && (
              <p className="font-bold text-xs tracking-[.12em] uppercase text-navy">
                Until {formatAvailableUntil(availableUntil)}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
