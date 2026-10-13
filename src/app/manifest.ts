import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Generated once at build time (required for the static export).
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Dirty South",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#FFFAF2",
    theme_color: "#3D566C",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
