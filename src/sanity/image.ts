import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "./env";
import type { SanityImage } from "./types";

const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (image: SanityImage) => builder.image(image);

const WIDTHS = [320, 480, 640, 960, 1280];

/**
 * Responsive image attributes served by Sanity's image CDN, so menu photos
 * uploaded at any size are delivered at the width each device needs (WebP/AVIF).
 */
export function sanityImageProps(image: SanityImage, aspect: number) {
  const url = (w: number) =>
    urlFor(image).width(w).height(Math.round(w / aspect)).fit("crop").auto("format").quality(75).url();
  return {
    src: url(640),
    srcSet: WIDTHS.map((w) => `${url(w)} ${w}w`).join(", "),
    width: 640,
    height: Math.round(640 / aspect),
  };
}
