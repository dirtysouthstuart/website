import { createClient, type QueryParams } from "next-sanity";
import { defineLive } from "next-sanity/live";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

// <SanityLive /> (in the root layout) listens to Sanity's Live Content API and,
// when content is published, revalidates the "sanity:<sync tag>" cache tags of
// the queries affected. Only published content is shown, so no tokens are needed.
export const { SanityLive } = defineLive({
  client,
  serverToken: false,
  browserToken: false,
});

// Safety net: cached query results also expire after this many seconds. Live
// updates only reach the server while someone has the site open, so without
// this, a change published with no visitors could stay stale indefinitely.
const MAX_AGE_SECONDS = 60;

/**
 * GROQ fetch with the same cache tags next-sanity's `sanityFetch` uses (so
 * <SanityLive /> can refresh them instantly), plus a time limit on the cache.
 */
export async function sanityFetch<T>({ query, params = {} }: { query: string; params?: QueryParams }) {
  // The CDN's "noStale" mode never returns stale results; skipped during builds,
  // as next-sanity does.
  const cacheMode = process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD ? undefined : "noStale";

  // 1. Which content this query depends on (Sanity "sync tags").
  const { syncTags } = await client.fetch(query, params, {
    filterResponse: false,
    cacheMode,
    tag: "fetch-sync-tags",
    next: { revalidate: MAX_AGE_SECONDS },
  });
  const tags = (syncTags ?? []).map((tag) => `sanity:${tag}`);

  // 2. The result, cached under those tags.
  const { result } = await client.fetch(query, params, {
    filterResponse: false,
    cacheMode,
    tag: "fetch",
    next: { revalidate: MAX_AGE_SECONDS, tags },
  });
  return { data: result as T };
}
