import type { Metadata, Viewport } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { JsonLd, barSchema, websiteSchema } from "@/lib/structured-data";
import { shareImage, site } from "@/lib/site";
import { SanityLive } from "@/sanity/live";
import "./globals.css";

// Fonts are bundled in src/fonts (latin subsets, SIL Open Font License) so builds
// never depend on downloading from Google Fonts.
const ultra = localFont({
  src: "../fonts/ultra-latin.woff2",
  weight: "400",
  variable: "--font-ultra",
  display: "swap",
});
const jost = localFont({
  src: "../fonts/jost-latin.woff2", // variable font
  weight: "400 700",
  variable: "--font-jost",
  display: "swap",
});
const dmSerif = localFont({
  src: "../fonts/dm-serif-display-italic-latin.woff2",
  weight: "400",
  style: "italic",
  variable: "--font-dm-serif",
  display: "swap",
});

const defaultTitle = `${site.name} | Cocktail Bar in Downtown Stuart, FL`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: defaultTitle,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Dirty South Bar",
    "bar in Stuart FL",
    "cocktail bar Stuart",
    "best bar in Stuart",
    "downtown Stuart nightlife",
    "Bank of Stuart",
    "bachelorette party Stuart FL",
    "private party venue Stuart FL",
    "Treasure Coast bars",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    url: "/",
    title: defaultTitle,
    description: site.description,
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: site.description,
    images: [shareImage.url],
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#3D566C",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${ultra.variable} ${jost.variable} ${dmSerif.variable}`}>
      <body>
        <JsonLd data={[barSchema(), websiteSchema()]} />
        <div className="bg-navy text-cream text-center font-semibold text-[13px] tracking-[.14em] uppercase p-[11px]">
          <a href={site.orderUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blush transition-colors">
            Order a round in downtown Stuart &nbsp;→
          </a>
        </div>
        <Header />
        <main>{children}</main>
        <Footer />
        <Link
          href="/#join"
          className="fixed left-[18px] bottom-[18px] z-30 bg-cream border-[3px] border-ink px-[22px] py-3 font-bold text-[15px] tracking-[.12em] uppercase shadow-[4px_4px_0_theme(colors.ink)] hover:bg-blush transition-colors"
        >
          Get on the list
        </Link>
        <Toaster />
        {/* Refreshes cached Sanity content the moment it is published. */}
        <SanityLive />
      </body>
    </html>
  );
}
