// Sanity project settings. These are public identifiers (not secrets), so they
// have defaults here and can be overridden with env vars per environment.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "61myr3v6";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-10-01";
