export default function EventsSpotlight() {
  const cities = ["SF Bay Area", "Greater LA", "NY Metro", "Miami / S. Florida"];
  const categories = [
    { n: "Cars & Coffee", e: "☕" },
    { n: "Car Show", e: "🏆" },
    { n: "Track Day", e: "🏁" },
    { n: "Cruise Night", e: "🌙" },
  ];
  return (
    <section className="section">
      <div className="container">
        <div className="events-spot reveal">
          <span className="section-eyebrow">Events</span>
          <h3>
            Find the meet. Start a convoy.
            <br />
            Show up <span className="grad-text">together.</span>
          </h3>
          <p
            style={{
              fontSize: 17,
              color: "var(--text-dim)",
              lineHeight: 1.55,
              maxWidth: 540,
              marginTop: 16,
            }}
          >
            Auto-scraped Cars & Coffee, car shows, track days, and cruise nights — every week,
            every region. Tap one event, the whole crew gets the address, and the convoy starts
            itself.
          </p>

          <div className="event-pills">
            <div className="group-label">Cities</div>
            {cities.map((c) => (
              <div key={c} className="event-pill">
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "var(--purple)",
                  }}
                />
                {c}
              </div>
            ))}
            <div className="group-label">Categories</div>
            {categories.map((c) => (
              <div
                key={c.n}
                className={`event-pill ${c.n === "Cars & Coffee" ? "glow" : ""}`}
              >
                <span>{c.e}</span>
                {c.n}
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 40,
              padding: 18,
              background: "rgba(15,15,21,0.7)",
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              gap: 16,
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 14,
                background: "linear-gradient(135deg, #7C3AED, #EC4899, #F97316)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
              }}
            >
              ☕
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 17, color: "#fff" }}>
                Supercar Saturdays Florida
              </div>
              <div style={{ fontSize: 13, color: "var(--text-dim)", marginTop: 2 }}>
                Sat May 9 · 09:00 · Seminole Hard Rock Hotel
              </div>
              <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                <span
                  style={{
                    padding: "3px 10px",
                    borderRadius: 999,
                    background: "rgba(124,58,237,0.18)",
                    color: "#D9C2FF",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                  }}
                >
                  CARS &amp; COFFEE
                </span>
                <span
                  style={{
                    padding: "3px 10px",
                    borderRadius: 999,
                    background: "rgba(34,197,94,0.18)",
                    color: "#4ADE80",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                  }}
                >
                  ↻ RECURRING
                </span>
              </div>
            </div>
            <button className="btn btn-primary" style={{ padding: "10px 16px", fontSize: 13 }}>
              Start a convoy
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
