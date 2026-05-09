# Roam — Marketing Site

Next.js (App Router) + TypeScript implementation of the design in
[`../assets/web_design_handoff/`](../assets/web_design_handoff/). Single-route,
scroll-driven, dark-mode landing page for the Roam convoy app.

## Stack

- **Next.js 15** (App Router, statically prerendered)
- **React 19**
- **TypeScript** (strict)
- **Plain CSS** with design tokens — no Tailwind, no CSS-in-JS. Tokens live in
  `:root` inside `app/globals.css`. Per-component styling stays as inline
  `style={{}}` blocks where the handoff used them, which keeps fidelity tight
  without re-encoding every value as a utility class.
- **Fonts** via `next/font/google` — Poppins (display/UI) + JetBrains Mono
  (numerics, ETAs, leaderboard times). Self-hosted by `next/font` at build time.
- No Framer Motion: the only motion primitives the design needs are
  `IntersectionObserver` reveals, a `setInterval`-driven tick counter for the
  demos, and CSS `@keyframes`. Adding a runtime animation library would just
  pad the bundle.

## Run

```bash
npm install
npm run dev      # → http://localhost:3000
npm run build    # static prerender; serve with `npm start`
```

## Layout

```
app/
├── layout.tsx              Root layout, font loader, <html>/<body>
├── page.tsx                Section assembly
├── globals.css             Design tokens + every section's CSS
└── components/
    ├── RoamMark.tsx        Brand SVG mark (gradient "A")
    ├── PhoneFrame.tsx      iPhone bezel + dynamic island + status bar
    ├── MapBg.tsx           Stylized dark-map SVG background
    ├── RevealRoot.tsx      IntersectionObserver wrapper for `.reveal`
    ├── Nav.tsx
    ├── Hero.tsx            + ConvoyMapScreen, MemberPin
    ├── StatStrip.tsx
    ├── CarBrands.tsx       Marquee of car-brand wordmarks
    ├── Features.tsx        + ConvoyDemo / PTTDemo / NavDemo / AlertsDemo /
    │                         TripDemo (TripPage1, TripPage2) / CarPlayDemo
    ├── Customize.tsx       Drag-and-drop HUD canvas
    ├── EventsSpotlight.tsx
    ├── Achievements.tsx    15-trophy grid
    ├── Pricing.tsx         3-tier pricing cards
    ├── SocialProof.tsx     Reviews + press strip
    ├── FAQ.tsx             8-question accordion
    ├── FinalCTA.tsx
    └── Footer.tsx
```

## Notes

- Sections that don't need state or effects are server components (StatStrip,
  CarBrands, Achievements, EventsSpotlight, Pricing, SocialProof, FinalCTA,
  Footer). The animated demos and interactive bits (`Nav`, `Hero`, `Features`,
  `Customize`, `FAQ`) are marked `"use client"`.
- Reveal-on-scroll: any element with `class="reveal"` will fade and rise once
  it crosses 12% of the viewport. Wired up by `RevealRoot.tsx`, which sets up
  one `IntersectionObserver` for the whole tree.
- Pricing currently shows the prices the design handoff specified (`$0`,
  `$4.99`, `$14.99`). The iOS app's StoreKit flow isn't live yet, so all CTAs
  are no-op buttons; swap them to App Store URLs once published.
- Press logos (MotorTrend, CarBuzz, etc.) are placeholder text. Replace with
  real licensed lockups before shipping.
- App Store / Play Store buttons use inline SVG glyphs — for production, swap
  to the official Apple "Download on the App Store" and Google "Get it on
  Google Play" badges per their brand guidelines.
