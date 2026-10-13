import type { NextConfig } from "next";

// Static export: `npm run build` writes a plain HTML/CSS/JS site to `out/`,
// which can be dragged onto Netlify Drop or served by any static host.
const nextConfig: NextConfig = {
  output: "export",
  poweredByHeader: false,
  images: {
    // No image server on a static host. Images in public/images are
    // pre-sized WebP files instead.
    unoptimized: true,
  },
};

export default nextConfig;
