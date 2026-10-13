import Link from "next/link";
import Image from "next/image";
import { NAV_LEFT, NAV_RIGHT, site } from "@/lib/site";
import { cn } from "@/lib/utils";

const navClass =
  "flex gap-[clamp(14px,2.4vw,34px)] font-bold text-[15px] tracking-[.08em] uppercase";

export function Header() {
  return (
    <header className="sticky top-0 z-20 grid grid-cols-[1fr_auto_1fr] items-center px-[clamp(16px,4vw,56px)] py-3 bg-cream border-b-2 border-navy">
      <nav aria-label="Main" className={cn(navClass, "max-[860px]:hidden")}>
        {NAV_LEFT.map((item) => (
          <Link key={item.href} href={item.href} className="hover:text-rose transition-colors">
            {item.label}
          </Link>
        ))}
      </nav>

      <Link href="/" aria-label={`${site.name} home`} className="col-start-2">
        <Image
          src="/images/arch-girl-surf.webp"
          alt={site.name}
          width={204}
          height={128}
          loading="eager"
          sizes="102px"
          className="h-16 w-auto"
        />
      </Link>

      <nav aria-label="Secondary" className={cn(navClass, "col-start-3 justify-end")}>
        {NAV_RIGHT.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "hover:text-rose transition-colors",
              // On small screens only the last link ("Join") stays visible.
              i < NAV_RIGHT.length - 1 && "max-[860px]:hidden"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
