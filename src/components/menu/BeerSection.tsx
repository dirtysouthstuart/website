import { formatPrice } from "@/lib/content";
import { urlFor } from "@/sanity/image";
import type { Beer, MenuSettings } from "@/sanity/types";

const GROUPS: { serving: Beer["serving"]; title: string }[] = [
  { serving: "draft", title: "On Draft" },
  { serving: "package", title: "Bottles & Cans" },
];

/** Image dimensions are encoded in Sanity asset refs: image-<id>-<w>x<h>-<ext> */
function refDimensions(ref: string) {
  const match = ref.match(/-(\d+)x(\d+)-/);
  return match ? { width: Number(match[1]), height: Number(match[2]) } : { width: 1200, height: 1600 };
}

export function BeerSection({ beers, settings }: { beers: Beer[]; settings: MenuSettings | null }) {
  const image = settings?.beerListImage?.asset ? settings.beerListImage : null;
  const groups = GROUPS.map((g) => ({ ...g, beers: beers.filter((b) => b.serving === g.serving) })).filter(
    (g) => g.beers.length > 0
  );

  return (
    <div>
      {groups.length > 0 && (
        <div className={`grid gap-6 ${groups.length > 1 ? "grid-cols-2 max-[860px]:grid-cols-1" : "max-w-[640px] mx-auto"}`}>
          {groups.map((group) => (
            <div key={group.serving} className="card-ink px-[clamp(20px,2.6vw,36px)] py-7 text-left">
              <h3 className="ultra text-2xl text-navy mb-4">{group.title}</h3>
              <ul className="divide-y-2 divide-dashed divide-ink/30">
                {group.beers.map((beer) => (
                  <li key={beer._id} className="py-3 flex items-start justify-between gap-4">
                    <div>
                      <p className="font-bold leading-snug">
                        {beer.name}
                        {beer.local && (
                          <span className="ml-2 align-middle bg-blush border-2 border-ink px-1.5 text-[10px] font-bold uppercase tracking-[.1em]">
                            Local
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-navy">
                        {[beer.brewery, beer.style, beer.abv != null ? `${beer.abv}% ABV` : null].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                    {formatPrice(beer.price) && <p className="font-bold text-navy shrink-0">{formatPrice(beer.price)}</p>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {image && (
        <figure className={`${groups.length > 0 ? "mt-10" : ""} max-w-[720px] mx-auto`}>
          <a
            href={urlFor(image).width(2000).auto("format").url()}
            target="_blank"
            rel="noopener noreferrer"
            className="block card-ink p-3 shadow-[6px_6px_0_theme(colors.navy)] hover:-translate-y-1 transition-transform"
          >
            {/* Plain <img>: Sanity's CDN does the resizing. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={urlFor(image).width(1000).auto("format").url()}
              srcSet={[600, 1000, 1400].map((w) => `${urlFor(image).width(w).auto("format").url()} ${w}w`).join(", ")}
              sizes="(max-width: 760px) 100vw, 720px"
              {...refDimensions(image.asset!._ref)}
              alt={image.alt || "Beer list"}
              loading="lazy"
              className="w-full h-auto"
            />
          </a>
          <figcaption className="mt-3 text-sm">Tap the list to see it full size.</figcaption>
        </figure>
      )}
    </div>
  );
}
