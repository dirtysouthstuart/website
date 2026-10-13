import Link from "next/link";
import { MenuCard } from "@/components/MenuCard";
import { SeasonalSips } from "@/components/SeasonalSips";
import { currentSeasonalItems, menuCategories, regularMenuItems } from "@/lib/content";
import { JsonLd, breadcrumbSchema, menuSchema } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Cocktail Menu",
  description:
    "The dirty list: seasonal sips plus signature cocktails like the Dirty Shirley, Jam On It and Espresso-tini at Dirty South Bar in downtown Stuart, FL.",
  path: "/menu",
});

const gridClass = "grid grid-cols-3 max-[860px]:grid-cols-2 max-[600px]:grid-cols-1 gap-[18px]";

export default function Menu() {
  const seasonal = currentSeasonalItems();
  const sections = [
    { name: "Seasonal", items: seasonal },
    ...menuCategories.map((category) => ({
      name: category,
      items: regularMenuItems.filter((item) => item.category === category),
    })),
  ];

  return (
    <>
      <JsonLd data={[breadcrumbSchema("Cocktail Menu", "/menu"), menuSchema(sections)]} />

      <section className="bg-sand px-[clamp(16px,4vw,56px)] py-[clamp(60px,8vw,110px)] text-center">
        <h1 className="script">the dirty list</h1>
        <p className="text-lg mt-2.5 mb-10">Ask the bartender about the ones we can&apos;t print.</p>

        <div className="max-w-[1180px] mx-auto space-y-14">
          <SeasonalSips items={seasonal} gridClass={gridClass} />

          {menuCategories.map((category) => (
            <div key={category}>
              <h2 className="ultra text-[clamp(26px,3vw,38px)] leading-[1.1] text-ink mb-6">{category}</h2>
              <div className={gridClass}>
                {regularMenuItems
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <MenuCard key={item.id} item={item} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

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
