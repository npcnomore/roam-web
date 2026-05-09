type Tier = {
  name: string;
  price: string;
  priceSuf?: string;
  sub: string;
  blurb: string;
  features: string[];
  cta: string;
  featured?: boolean;
  ghost?: boolean;
};

const tiers: Tier[] = [
  {
    name: "Free",
    price: "$0",
    sub: "Forever. Seriously.",
    blurb: "Everything you need for casual convoys.",
    features: [
      "Live convoy map (up to 4 members)",
      "Push-to-Talk + 9 quick alerts",
      "Turn-by-turn navigation",
      "Trip recording + share cards",
      "CarPlay / Android Auto",
      "All 15 achievements",
    ],
    cta: "Start free",
    ghost: true,
  },
  {
    name: "Roam+",
    price: "$4.99",
    priceSuf: "/mo",
    sub: "Or $39/yr — save 35%",
    blurb: "For the crews and the regulars.",
    features: [
      "Crews of up to 12 members",
      "Custom alert sounds + vehicle profiles",
      "Advanced HUD layouts + cloud sync",
      "Priority routing on Roam servers",
      "Premium share-card templates",
      "Hide ads · early access to new features",
    ],
    cta: "Try free for 7 days",
    featured: true,
  },
  {
    name: "Crew",
    price: "$14.99",
    priceSuf: "/mo",
    sub: "For organized clubs and shops",
    blurb: "Everything in Roam+, scaled for the whole club.",
    features: [
      "Unlimited crew size",
      "Custom branding for share cards",
      "Recurring event scheduling",
      "Member roles + permissions",
      "Trip exports (GPX/CSV)",
      "Priority support",
    ],
    cta: "Talk to us",
    ghost: true,
  },
];

export default function Pricing() {
  return (
    <section className="section" id="pricing">
      <div className="container">
        <div style={{ textAlign: "center" }} className="reveal">
          <span className="section-eyebrow">Pricing</span>
          <h2 className="section-title">
            Free for the casuals. <span className="grad-text">$5/mo for the obsessed.</span>
          </h2>
          <p className="section-sub" style={{ margin: "20px auto 0" }}>
            Free is fully featured. Roam+ unlocks bigger crews, custom alert sounds, vehicle
            profiles, and HUD cloud sync.
          </p>
        </div>

        <div className="pricing-grid">
          {tiers.map((t, i) => (
            <div
              key={i}
              className={`price-card ${t.featured ? "featured reveal" : "reveal"}`}
            >
              {t.featured && <div className="ribbon">Most popular</div>}
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  color: t.featured ? "#FBA88E" : "var(--text-faint)",
                  textTransform: "uppercase",
                }}
              >
                {t.name}
              </div>
              <div className="price-row">
                <div className="price">{t.price}</div>
                {t.priceSuf && <div className="price-suf">{t.priceSuf}</div>}
              </div>
              <div style={{ fontSize: 13, color: "var(--text-dim)", marginTop: 4 }}>{t.sub}</div>
              <div style={{ fontSize: 14, color: "var(--text)", marginTop: 14, fontWeight: 500 }}>
                {t.blurb}
              </div>
              <div className="divider" />
              <ul className="price-list">
                {t.features.map((f, j) => (
                  <li key={j}>
                    <span className="price-check">
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M2.5 6.5 L 5 9 L 9.5 3.5"
                          stroke="#fff"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`btn ${t.featured ? "btn-primary" : "btn-ghost"}`}
                style={{ width: "100%", marginTop: 24 }}
              >
                {t.cta}
              </button>
            </div>
          ))}
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: 36,
            fontSize: 13,
            color: "var(--text-faint)",
          }}
        >
          All plans include unlimited trip history, end-to-end encrypted PTT, and zero ads. Cancel
          anytime.
        </div>
      </div>
    </section>
  );
}
