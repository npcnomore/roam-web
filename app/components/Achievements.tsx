type Trophy = { n: string; d: string; u: boolean; ico: TrophyKind };

type TrophyKind =
  | "flag"
  | "check"
  | "podium"
  | "speed"
  | "road"
  | "trip"
  | "crew"
  | "moon"
  | "sun";

const trophies: Trophy[] = [
  { n: "First Ride", d: "Complete your first convoy", u: true, ico: "flag" },
  { n: "Finisher", d: "Finish a multi-stop trip", u: true, ico: "check" },
  { n: "Podium", d: "Top 3 in a leaderboard", u: true, ico: "podium" },
  { n: "Highway", d: "Hit 60 mph", u: true, ico: "speed" },
  { n: "Triple Digits", d: "Hit 100 mph", u: false, ico: "speed" },
  { n: "Top End", d: "Hit 150 mph", u: false, ico: "speed" },
  { n: "100 Miles", d: "Log 100 miles in convoys", u: true, ico: "road" },
  { n: "1,000 Miles", d: "Log 1,000 miles", u: false, ico: "road" },
  { n: "5 Trips", d: "Complete 5 convoy trips", u: true, ico: "trip" },
  { n: "25 Trips", d: "Complete 25 trips", u: false, ico: "trip" },
  { n: "Centurion", d: "Complete 100 trips", u: false, ico: "trip" },
  { n: "Pacesetter", d: "1st place in 3 trips", u: false, ico: "podium" },
  { n: "Crew Builder", d: "Convoy with 5+ members", u: true, ico: "crew" },
  { n: "Night Owl", d: "Convoy after 10 PM", u: true, ico: "moon" },
  { n: "Early Bird", d: "Convoy before 7 AM", u: false, ico: "sun" },
];

export default function Achievements() {
  return (
    <section className="section">
      <div className="container">
        <div style={{ textAlign: "center" }} className="reveal">
          <span className="section-eyebrow">Achievements</span>
          <h2 className="section-title">
            15 trophies. <span className="grad-text">Earn your stripes.</span>
          </h2>
          <p className="section-sub" style={{ margin: "20px auto 0" }}>
            Speed, distance, trip counts, crew, and odd-hours achievements. Stack them up. Flex on
            the group chat.
          </p>
        </div>
        <div className="ach-grid">
          {trophies.map((t, i) => (
            <div key={i} className={`ach-card ${t.u ? "" : "locked"} reveal`}>
              <div className="ach-icon">
                <TrophyIcon kind={t.ico} unlocked={t.u} />
              </div>
              <div>
                <div className="ach-name">{t.n}</div>
                <div className="ach-desc">{t.d}</div>
              </div>
              {t.u && (
                <div
                  style={{
                    marginLeft: "auto",
                    padding: "3px 8px",
                    borderRadius: 999,
                    background: "rgba(34,197,94,0.15)",
                    border: "1px solid rgba(34,197,94,0.4)",
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#4ADE80",
                    letterSpacing: "0.08em",
                  }}
                >
                  EARNED
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrophyIcon({ kind, unlocked }: { kind: TrophyKind; unlocked: boolean }) {
  const c = unlocked ? "#fff" : "#5C5C6A";
  switch (kind) {
    case "flag":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 22 V 4 M5 4 L 18 4 L 14 9 L 18 14 L 5 14"
            stroke={c}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "check":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke={c} strokeWidth="2" />
          <path
            d="M8 12 L 11 15 L 16 9"
            stroke={c}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "podium":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="14" width="6" height="7" rx="1" stroke={c} strokeWidth="2" />
          <rect x="9" y="9" width="6" height="12" rx="1" stroke={c} strokeWidth="2" />
          <rect x="16" y="12" width="6" height="9" rx="1" stroke={c} strokeWidth="2" />
        </svg>
      );
    case "speed":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke={c} strokeWidth="2" />
          <path d="M12 12 L 16 8" stroke={c} strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="12" cy="12" r="1.5" fill={c} />
        </svg>
      );
    case "road":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M6 22 L 9 2 M 18 22 L 15 2" stroke={c} strokeWidth="2" strokeLinecap="round" />
          <path
            d="M12 5 V 7 M 12 11 V 13 M 12 17 V 19"
            stroke={c}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "trip":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <circle cx="6" cy="18" r="3" stroke={c} strokeWidth="2" />
          <circle cx="18" cy="6" r="3" stroke={c} strokeWidth="2" />
          <path
            d="M9 18 H 15 a 3 3 0 0 0 3 -3 V 9"
            stroke={c}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "crew":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <circle cx="9" cy="9" r="3" stroke={c} strokeWidth="2" />
          <circle cx="17" cy="11" r="2.5" stroke={c} strokeWidth="2" />
          <path
            d="M3 20 a 6 6 0 0 1 12 0"
            stroke={c}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M14 20 a 6 6 0 0 1 7 -2"
            stroke={c}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "moon":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M20 14 a 8 8 0 1 1 -10 -10 a 6 6 0 0 0 10 10 z"
            stroke={c}
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "sun":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="4" stroke={c} strokeWidth="2" />
          <path
            d="M12 2 V4 M 12 20 V22 M2 12 H4 M 20 12 H22 M5 5 L 7 7 M 17 17 L 19 19 M 5 19 L 7 17 M 17 7 L 19 5"
            stroke={c}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}
