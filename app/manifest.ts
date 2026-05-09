import type { MetadataRoute } from "next";

/**
 * Web manifest for Add-to-Home-Screen and PWA semantics. iOS Safari
 * largely ignores this in favour of `apple-icon.png` + `appleWebApp` meta
 * (already set in layout.tsx), but Chrome / Edge / Android use it for
 * tab + install icons, and Lighthouse expects it. Color values match
 * the brand tokens in globals.css.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Roam — Drive Together. Vibe Together.",
    short_name: "Roam",
    description:
      "The convoy app for car people. Live convoy map, hands-free push-to-talk, and a Strava-style leaderboard for every drive your crew takes.",
    start_url: "/",
    display: "standalone",
    background_color: "#09090F",
    theme_color: "#09090F",
    icons: [
      {
        src: "/logo.png",
        sizes: "500x500",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
