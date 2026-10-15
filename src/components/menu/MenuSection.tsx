import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** A full-width band on the menu page with a big heading and optional note. */
export function MenuSection({
  id,
  title,
  note,
  tone = "cream",
  children,
}: {
  id: string;
  title: string;
  note?: string;
  tone?: "cream" | "sand" | "blush";
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "px-[clamp(16px,4vw,56px)] py-[clamp(56px,7vw,96px)] text-center",
        tone === "sand" && "bg-sand",
        tone === "blush" && "bg-blush",
        tone === "cream" && "bg-cream"
      )}
    >
      <div className="max-w-[1180px] mx-auto">
        <h2 className="ultra text-[clamp(34px,4.4vw,58px)] leading-none text-ink">{title}</h2>
        {note && <p className="text-lg mt-3">{note}</p>}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
