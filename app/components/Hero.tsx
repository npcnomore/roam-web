import RealScreenshot from "./RealScreenshot";

export default function Hero() {
  return (
    <section className="hero">
      <div className="bg-grid" />
      <div className="container">
        <div className="hero-grid">
          <div>
            <div className="hero-eyebrow reveal in">
              <span className="dot" />
              <span>iOS · CarPlay · Now in TestFlight</span>
            </div>
            <h1>
              <span className="grad-text sweep">Drive Together.</span>
              <br />
              <span style={{ color: "#fff" }}>Vibe Together.</span>
            </h1>
            <p className="hero-sub reveal in">
              The first iPhone + CarPlay app built for <strong>the group</strong>, not the lone
              driver. Live convoy map, hands-free push-to-talk, and a Strava-style leaderboard for
              every drive your crew takes.
            </p>
            <div className="hero-ctas reveal in">
              <a className="btn btn-primary" href="#download">
                <svg width="18" height="20" viewBox="0 0 18 20" fill="white">
                  <path d="M14.94 10.65c-.02-2.43 1.99-3.6 2.08-3.66-1.13-1.66-2.9-1.89-3.53-1.91-1.5-.15-2.93.88-3.69.88-.78 0-1.94-.86-3.2-.84-1.64.02-3.16.96-4 2.43-1.71 2.97-.44 7.36 1.22 9.78.81 1.18 1.78 2.51 3.05 2.46 1.23-.05 1.69-.79 3.18-.79 1.48 0 1.9.79 3.2.76 1.32-.02 2.16-1.2 2.97-2.39.94-1.37 1.32-2.71 1.34-2.78-.03-.01-2.57-.99-2.59-3.94zM12.5 3.69c.68-.83 1.13-1.97 1.01-3.11-.98.04-2.16.65-2.86 1.47-.63.72-1.18 1.89-1.03 3 1.09.08 2.21-.55 2.88-1.36z" />
                </svg>
                Download on App Store
              </a>
              <a className="btn btn-ghost" href="#features">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6.5" stroke="white" strokeOpacity="0.4" />
                  <path d="M5.5 4.5 V 9.5 L 9.5 7 Z" fill="white" />
                </svg>
                See it in action
              </a>
            </div>

            <div
              style={{
                marginTop: 36,
                display: "flex",
                gap: 28,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ display: "flex" }}>
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: ["#7C3AED", "#EC4899", "#F97316", "#FBBF24"][i],
                        border: "2px solid #09090F",
                        marginLeft: i ? -10 : 0,
                      }}
                    />
                  ))}
                </div>
                <div style={{ fontSize: 13, color: "var(--text-dim)" }}>
                  <strong style={{ color: "#fff", fontWeight: 600 }}>2,400+ drivers</strong>{" "}
                  already roaming
                </div>
              </div>
            </div>
          </div>

          <div className="hero-art">
            <div className="glow-disc" />
            <div className="phone-tilt">
              {/* Real screenshot from the iOS app — Bay Area live convoy
                  with a peer driver at 73 mph and a route to Costco. */}
              <RealScreenshot
                src="/screenshots/IMG_0227.PNG"
                alt="Roam live convoy map showing a route through the Bay Area with peer drivers"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
