import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Open Graph card used by iMessage / Twitter / Slack / etc. when someone
 * shares the homepage. Next renders this once at build (or first request)
 * via `next/og`'s satori-backed ImageResponse and caches the PNG at
 * `/_next/static/.../og.png`. The `<meta property="og:image">` tag is
 * generated automatically by App Router conventions.
 *
 * Format spec is the OG/Twitter sweet spot — 1200×630 (1.91:1) so iMessage
 * shows a full-width image card without letterboxing.
 */

export const alt = "Roam — Drive Together. Vibe Together.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  // Read the brand mark from public/ so satori can embed it directly.
  // (next/og can't fetch arbitrary URLs at build time, so we go through fs.)
  const logoData = await readFile(join(process.cwd(), "public", "logo.png"));
  const logoSrc = `data:image/png;base64,${Buffer.from(logoData).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#09090F",
          backgroundImage:
            "radial-gradient(900px 600px at 80% -10%, rgba(124,58,237,0.45), transparent 60%), radial-gradient(800px 500px at 0% 30%, rgba(236,72,153,0.30), transparent 60%), radial-gradient(700px 500px at 100% 90%, rgba(249,115,22,0.25), transparent 60%)",
          padding: "0 80px",
          position: "relative",
        }}
      >
        {/* Brand mark */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="" width={220} height={220} />

        {/* Wordmark */}
        <div
          style={{
            display: "flex",
            fontSize: 132,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            marginTop: 28,
            backgroundImage:
              "linear-gradient(95deg, #7C3AED 0%, #EC4899 35%, #F97316 70%, #FBBF24 100%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          ROAM
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            fontSize: 36,
            fontWeight: 600,
            color: "#F5F5F7",
            marginTop: 18,
            letterSpacing: "-0.01em",
          }}
        >
          Drive Together. Vibe Together.
        </div>

        {/* Subline */}
        <div
          style={{
            display: "flex",
            fontSize: 22,
            fontWeight: 500,
            color: "#9A9AA8",
            marginTop: 18,
            textAlign: "center",
            maxWidth: 880,
          }}
        >
          The convoy app for car people · iPhone + CarPlay
        </div>

        {/* Bottom-corner accent: gradient bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 8,
            backgroundImage:
              "linear-gradient(95deg, #7C3AED 0%, #EC4899 35%, #F97316 70%, #FBBF24 100%)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
