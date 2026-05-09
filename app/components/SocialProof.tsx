type Review = {
  stars: number;
  title: string;
  body: string;
  who: string;
  role: string;
  c: string;
};

const reviews: Review[] = [
  {
    stars: 5,
    title: "Replaced 3 group chats and Waze",
    body: "We used to coordinate with Discord, iMessage and Waze on three different phones. Roam is just… one app. The Push-to-Talk alone is worth $5/mo.",
    who: "Marcus T.",
    role: "BMW M3 · Bay Area Crew",
    c: "#7C3AED",
  },
  {
    stars: 5,
    title: "Convoy auto-rejoin is sorcery",
    body: "Got separated at a 4-way light, hit two missed exits and somehow Roam stitched us back into formation before I even noticed. Wild.",
    who: "Priya K.",
    role: "Toyota GR86 · LA",
    c: "#EC4899",
  },
  {
    stars: 5,
    title: "The trip recap cards are dangerous",
    body: "My crew has now made trash-talking the leaderboard a sport. The 1080×1350 share format hits perfectly on IG Stories. Built for car people.",
    who: "Devon R.",
    role: "Honda S2K · NYC",
    c: "#F97316",
  },
  {
    stars: 5,
    title: "CarPlay parity is real",
    body: "Half of these 'CarPlay-friendly' apps make you pick up the phone for everything important. Roam genuinely lets me drive with both hands on the wheel.",
    who: "Sasha M.",
    role: "Porsche Cayman · Miami",
    c: "#FBBF24",
  },
];

const logos = [
  "MotorTrend",
  "CarBuzz",
  "TopGear",
  "Road & Track",
  "Jalopnik",
  "DriveTribe",
  "Hagerty",
  "The Drive",
];

export default function SocialProof() {
  return (
    <section className="section">
      <div className="container">
        <div style={{ textAlign: "center" }} className="reveal">
          <span className="section-eyebrow">Loved by drivers</span>
          <h2 className="section-title">
            4.8 stars. <span className="grad-text">12,000+ ratings.</span>
          </h2>
          <p className="section-sub" style={{ margin: "20px auto 0" }}>
            From weekend Cars &amp; Coffee folks to club organizers running 80-car convoys.
          </p>
        </div>

        <div className="reviews-grid">
          {reviews.map((r, i) => (
            <div key={i} className="review-card reveal">
              <div className="stars">
                {Array.from({ length: r.stars }).map((_, k) => (
                  <svg key={k} width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 1 L 10.2 5.6 L 15 6.3 L 11.5 9.7 L 12.4 14.5 L 8 12.2 L 3.6 14.5 L 4.5 9.7 L 1 6.3 L 5.8 5.6 Z"
                      fill="#FBBF24"
                    />
                  </svg>
                ))}
              </div>
              <div className="review-title">{r.title}</div>
              <div className="review-body">{r.body}</div>
              <div className="review-meta">
                <div className="review-avatar" style={{ background: r.c }}>
                  {r.who[0]}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{r.who}</div>
                  <div style={{ fontSize: 11, color: "var(--text-faint)" }}>{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="press-strip reveal">
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "var(--text-faint)",
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            Featured in
          </div>
          <div className="press-logos">
            {logos.map((l) => (
              <div key={l} className="press-logo">
                {l}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
