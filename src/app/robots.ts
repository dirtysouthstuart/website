import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Generated once at build time (required for the static export).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/__forms.html" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
