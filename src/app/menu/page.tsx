import Link from "next/link";
import { MenuCard } from "@/components/MenuCard";
import { SeasonalSips } from "@/components/SeasonalSips";
import { BeerSection } from "@/components/menu/BeerSection";
import { MenuSection } from "@/components/menu/MenuSection";
import { WineSection } from "@/components/menu/WineSection";
import { currentSpecialCocktails } from "@/lib/content";
import { JsonLd, breadcrumbSchema, menuSchema } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/metadata";
import { getMenu } from "@/sanity/fetch";
import { FOOD_CATEGORY_LABELS, type Beer, type FoodCategory } from "@/sanity/types";

// Content updates arrive instantly via Sanity Live; the hourly refresh also
// drops seasonal drinks once their "available until" date has passed.
export const revalidate = 3600;

export const metadata = pageMetadata({
  title: "Menu",
  description:
    "Signature craft cocktails, seasonal sips, beer, wine and food at Dirty South Bar in downtown Stuart, FL, inside the old Bank of Stuart.",
  path: "/menu",
});

const gridClass = "grid grid-cols-3 max-[860px]:grid-cols-2 max-[600px]:grid-cols-1 gap-[18px]";

const describeBeer = (b: Beer) =>
  [b.brewery, b.style, b.abv != null ? `${b.abv}% ABV` : null, b.serving === "draft" ? "On draft" : "Bottle or can"]
    .filter(Boolean)
    .join(" · ");

export default async function Menu() {
  const { cocktails, beers, wines, food, settings } = await getMenu();

  const seasonal = currentSpecialCocktails(cocktails);
  const signature = cocktails.filter((c) => c.availability === "signature" && !c.zeroProof);
  const zeroProof = cocktails.filter((c) => c.availability === "signature" && c.zeroProof);
  const hasBeer = beers.length > 0 || Boolean(settings?.beerListImage?.asset);
  const foodGroups = (Object.keys(FOOD_CATEGORY_LABELS) as FoodCategory[])
    .map((category) => ({ category, items: food.filter((f) => f.category === category) }))
    .filter((g) => g.items.length > 0);

  // Jump links for the sections that have something in them.
  const sections = [
    { id: "seasonal", label: "Seasonal", show: seasonal.length > 0 },
    { id: "cocktails", label: "Cocktails", show: signature.length > 0 },
    { id: "zero-proof", label: "Zero-Proof", show: zeroProof.length > 0 },
    { id: "beer", label: "Beer", show: hasBeer },
    { id: "wine", label: "Wine", show: wines.length > 0 },
    { id: "food", label: "Food", show: foodGroups.length > 0 },
  ].filter((s) => s.show);

  const schema = menuSchema([
    { name: "Seasonal & Limited Time", items: seasonal },
    { name: "Signature Cocktails", items: signature },
    { name: "Zero-Proof", items: zeroProof },
    { name: "Beer", items: beers.map((b) => ({ name: b.name, description: describeBeer(b), price: b.price })) },
    { name: "Wine", items: wines.map((w) => ({ name: w.name, description: w.details, price: w.glassPrice })) },
    ...foodGroups.map((g) => ({ name: FOOD_CATEGORY_LABELS[g.category], items: g.items })),
  ]);

  return (
    <>
      <JsonLd data={[breadcrumbSchema("Menu", "/menu"), schema]} />

      {/* Cocktails band (also holds the page heading) */}
      <section className="bg-sand px-[clamp(16px,4vw,56px)] py-[clamp(60px,8vw,110px)] text-center">
        <h1 className="script">the dirty list</h1>
        <p className="text-lg mt-2.5">Ask the bartender about the ones we can&apos;t print.</p>

        {sections.length > 1 && (
          <nav aria-label="Menu sections" className="mt-8 flex flex-wrap justify-center gap-2.5">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="border-[3px] border-ink bg-cream px-4 py-2 font-bold text-sm tracking-[.12em] uppercase hover:bg-blush transition-colors"
              >
                {s.label}
              </a>
            ))}
          </nav>
        )}

        <div className="max-w-[1180px] mx-auto mt-14 space-y-16">
          <SeasonalSips items={seasonal} gridClass={gridClass} />

          {signature.length > 0 && (
            <div id="cocktails" className="scroll-mt-28">
              <h2 className="ultra text-[clamp(26px,3vw,38px)] leading-[1.1] text-ink mb-6">Signature Cocktails</h2>
              <div className={gridClass}>
                {signature.map((c) => (
                  <MenuCard key={c._id} name={c.name} description={c.description} price={c.price} image={c.image} />
                ))}
              </div>
            </div>
          )}

          {zeroProof.length > 0 && (
            <div id="zero-proof" className="scroll-mt-28">
              <h2 className="ultra text-[clamp(26px,3vw,38px)] leading-[1.1] text-ink mb-6">Zero-Proof</h2>
              <div className={gridClass}>
                {zeroProof.map((c) => (
                  <MenuCard key={c._id} name={c.name} description={c.description} price={c.price} image={c.image} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {hasBeer && (
        <MenuSection id="beer" title="Beer" note={settings?.beerNote} tone="cream">
          <BeerSection beers={beers} settings={settings} />
        </MenuSection>
      )}

      {wines.length > 0 && (
        <MenuSection id="wine" title="Wine" note={settings?.wineNote} tone="sand">
          <WineSection wines={wines} />
        </MenuSection>
      )}

      {foodGroups.length > 0 && (
        <MenuSection id="food" title="Food" note={settings?.foodNote} tone="blush">
          <div className="space-y-14">
            {foodGroups.map((group) => (
              <div key={group.category}>
                {foodGroups.length > 1 && (
                  <h3 className="font-script italic text-[clamp(30px,3.4vw,44px)] text-ink mb-6">
                    {FOOD_CATEGORY_LABELS[group.category].toLowerCase()}
                  </h3>
                )}
                <div className={gridClass}>
                  {group.items.map((item) => (
                    <MenuCard
                      key={item._id}
                      name={item.name}
                      description={item.description}
                      price={item.price}
                      dietary={item.dietary}
                      image={item.image}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </MenuSection>
      )}

      {sections.length === 0 && (
        <section className="px-5 pb-[clamp(56px,7vw,96px)] text-center bg-sand -mt-10">
          <p className="text-lg max-w-[460px] mx-auto">
            Our menu is being shaken up. Swing by and ask the bartender what&apos;s pouring tonight.
          </p>
        </section>
      )}

      <section className="px-5 py-[clamp(56px,7vw,96px)] text-center">
        <h2 className="ultra text-[clamp(32px,4vw,54px)] leading-[1.05]">Thirsty yet?</h2>
        <p className="text-lg mt-4 mb-[30px] mx-auto max-w-[460px] leading-[1.55]">
          Pull up a stool at the old Bank of Stuart, or book the whole bar for your crew.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/#visit" className="btn-block">Find Us</Link>
          <Link href="/contact" className="btn-block bg-blush text-ink hover:bg-cream">Book Us</Link>
        </div>
      </section>
    </>
  );
}
