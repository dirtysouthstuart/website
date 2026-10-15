import { createClient } from "next-sanity";
import { defineLive } from "next-sanity/live";
import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

// `sanityFetch` caches query results and tags them; `<SanityLive />` (in the
// root layout) listens to Sanity's Live Content API and refreshes those tags the
// moment content is published, so the site updates without a rebuild.
// Only published content is shown, so no tokens are needed.
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: false,
  browserToken: false,
});
