import type { Metadata } from "next";
import { Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Roam — Drive Together. Vibe Together.",
  description:
    "The first iPhone + CarPlay app built for the group, not the lone driver. Live convoy map, hands-free push-to-talk, and a Strava-style leaderboard for every drive your crew takes.",
  metadataBase: new URL("https://roam.app"),
  applicationName: "Roam",
  appleWebApp: {
    capable: true,
    title: "Roam",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    title: "Roam — Drive Together. Vibe Together.",
    description:
      "The convoy app for car people. Live convoy map, hands-free push-to-talk, and a Strava-style leaderboard for every drive your crew takes.",
    type: "website",
    siteName: "Roam",
    locale: "en_US",
    // images is auto-populated from app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: "Roam — Drive Together. Vibe Together.",
    description:
      "The convoy app for car people. Live convoy map, hands-free push-to-talk, and a Strava-style leaderboard for every drive your crew takes.",
    // images is auto-populated from app/twitter-image.tsx
  },
  // Tints Safari mobile's address bar / chrome to match the dark hero so the
  // page reads as full-bleed on an iPhone instead of having a white toolbar.
  other: {
    "theme-color": "#09090F",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
