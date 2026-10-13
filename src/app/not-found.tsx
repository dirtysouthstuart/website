import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <section className="min-h-[70vh] grid place-items-center px-5 py-24 text-center bg-[radial-gradient(ellipse_at_center,theme(colors.cream)_0%,theme(colors.blush)_55%,theme(colors.rose)_100%)]">
      <div className="max-w-md">
        <p className="ultra text-[clamp(72px,12vw,140px)] leading-none text-cream text-stroke-3 [text-shadow:5px_5px_0_theme(colors.ink)]">404</p>
        <h1 className="script mt-6 mb-4">lost your way, darling?</h1>
        <p className="text-lg mb-8">This page had one too many. Let&apos;s get you back to the bar.</p>
        <Link href="/" className="btn-block">Back to the Bar</Link>
      </div>
    </section>
  );
}
