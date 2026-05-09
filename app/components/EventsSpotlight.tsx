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

          <div className="event-card">
            <div className="event-card-icon">☕</div>
            <div className="event-card-body">
              <div className="event-card-title">Supercar Saturdays Florida</div>
              <div className="event-card-meta">
                Sat May 9 · 09:00 · Seminole Hard Rock Hotel
              </div>
              <div className="event-card-tags">
                <span className="event-card-tag cars">CARS &amp; COFFEE</span>
                <span className="event-card-tag recurring">↻ RECURRING</span>
              </div>
            </div>
            <button className="btn btn-primary event-card-cta">Start a convoy</button>
          </div>
        </div>
      </div>
    </section>
  );
}
