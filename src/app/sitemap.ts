import type { MetadataRoute } from "next";
import { PAGES, site } from "@/lib/site";

// Generated once at build time (required for the static export).
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PAGES.map(({ path, priority, changeFrequency }) => ({
    url: path === "/" ? site.url : `${site.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
