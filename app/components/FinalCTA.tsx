export default function FinalCTA() {
  return (
    <section className="section" id="download">
      <div className="container" style={{ maxWidth: 1080 }}>
        <div className="final-cta reveal">
          <div className="cta-bg" />
          <h2>
            Pull up <span className="grad-text">together.</span>
          </h2>
          <p>The first convoy app worth driving for. Free forever. $5/mo for the obsessed.</p>
          <div className="cta-row">
            <button className="btn btn-primary btn-lg">
              <AppleIcon /> Download for iOS
            </button>
            <button className="btn btn-ghost btn-lg">
              <PlayIcon /> Get on Google Play
            </button>
          </div>
          <div style={{ marginTop: 24, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
            Free tier includes everything. No card required.
          </div>
        </div>
      </div>
    </section>
  );
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 3.5 L 14 12 L 3 20.5 Z" opacity="0.7" />
      <path d="M3 3.5 V 20.5 L 14 12 Z M 14 12 L 21 8 L 21 16 Z" />
    </svg>
  );
}
