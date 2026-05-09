"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import PhoneFrame from "./PhoneFrame";
import MapBg from "./MapBg";
import RoamMark from "./RoamMark";
import RealScreenshot from "./RealScreenshot";

export default function Features() {
  return (
    <section className="section" id="features">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span className="section-eyebrow">Built for the convoy</span>
          <h2 className="section-title">
            Everything you need to <span className="grad-text">drive together.</span>
          </h2>
          <p className="section-sub" style={{ margin: "20px auto 0" }}>
            Twelve features. One app. Zero "where are you?" texts.
          </p>
        </div>

        <FeatureRow
          tag="Live Convoy Map"
          title="See every car. In real time."
          copy="Per-member pins broadcast at 1 Hz with heading, speed, and brand-colored dots that stay consistent across the whole trip. Drag to reorder waypoints, get per-leg ETAs, and auto-stitch back into the convoy after a dropout."
          bullets={[
            "Realtime pins with heading + speed",
            "Multi-stop planner, drag-to-reorder",
            "Auto-rejoin after a dropout",
            "Three map styles: Standard / Satellite / Outdoors",
          ]}
          art={<ConvoyDemo />}
          glowColor="rgba(124,58,237,0.45)"
        />

        <FeatureRow
          reverse
          tag="Push-to-Talk"
          title="The killer feature you'll use every drive."
          copy="Hold the big mic button. Speak. Release. It auto-plays through every other phone and CarPlay speaker in the convoy. Tap-to-toggle on CarPlay. Halo-pulse on the speaker's pin so you always know who's on the air."
          bullets={[
            "Plays automatically across the crew",
            "Routes to CarPlay speakers, hands-free",
            "Halo-pulse on the speaker's pin",
            'Live "[Name] · talking…" banner',
          ]}
          art={<PTTDemo />}
          glowColor="rgba(249,115,22,0.4)"
        />

        <FeatureRow
          tag="Turn-by-Turn"
          title="Waze-style nav, built right in."
          copy="Mapbox-powered with lane guidance, off-route detection, and 4-second rerouting. Add a stop mid-trip without losing your destination. Customize the driving HUD by dragging tiles wherever you want them."
          bullets={[
            'Lane guidance ("Use the right 2 lanes")',
            "Off-route detection + auto-reroute ≤4s",
            "Add Stop mid-trip without losing your destination",
            "Drag-and-drop HUD editor",
          ]}
          art={<NavDemo />}
          glowColor="rgba(124,58,237,0.4)"
        />

        <FeatureRow
          reverse
          tag="Quick Alerts"
          title="One tap. The whole crew knows."
          copy="Nine alert types — cop ahead, hazard, brake, sexy car, photo op, and more. Each broadcasts a map pin and a 3.5-second banner to every receiver. No typing. No phone-fumbling. Just tap and roll."
          bullets={[
            "9 alert types, 1-tap broadcast",
            "Map pin + banner on every receiver",
            "CarPlay-friendly tap targets",
            "Custom alert sounds (Roam+)",
          ]}
          art={<AlertsDemo />}
          glowColor="rgba(236,72,153,0.4)"
        />

        <FeatureRow
          tag="Trip Leaderboards"
          title="A Strava for your crew."
          copy="Every drive auto-records the route, distance, max speed, and avg speed. Two-page swipeable share cards at 1080×1350 — IG-Stories ready. Confetti on first podium. Trash talk built-in."
          bullets={[
            "Map page + leaderboard page share cards",
            "Ranked finishers, gap to leader",
            "Save to Photos · Share to IG / iMessage",
            "Confetti on first podium",
          ]}
          art={
            <RealScreenshot
              src="/screenshots/IMG_0229.PNG"
              alt="Roam trip summary screen showing distance, max speed, elapsed time, and a route map"
            />
          }
          glowColor="rgba(251,191,36,0.4)"
        />

        <FeatureRow
          reverse
          tag="CarPlay"
          title="Full feature parity on the head unit."
          copy="Crew view, Talk button, Add Stop, Reroute — all on the dash. Search, POI categories, and the who's-talking banner display right where your eyes already are. Built for road-tripping with both hands on the wheel."
          bullets={[
            "Browse / Preview / Navigating modes",
            "Talk · Add Stop · Reroute on the dash",
            "POI search: Coffee · Gas · Food · Charging",
            "Who's-talking banner during PTT",
          ]}
          art={<CarPlayDemo />}
          glowColor="rgba(34,197,94,0.3)"
        />
      </div>
    </section>
  );
}

type FeatureRowProps = {
  reverse?: boolean;
  tag: string;
  title: string;
  copy: string;
  bullets: string[];
  art: ReactNode;
  glowColor: string;
};

function FeatureRow({ reverse, tag, title, copy, bullets, art, glowColor }: FeatureRowProps) {
  return (
    <div className={`feature ${reverse ? "reverse" : ""} reveal`}>
      <div className="feature-art">
        <div
          className="glow-disc"
          style={{ background: `radial-gradient(circle, ${glowColor} 0%, transparent 65%)` }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>{art}</div>
      </div>
      <div className="feature-copy">
        <span className="feature-tag">{tag}</span>
        <h2>{title}</h2>
        <p>{copy}</p>
        <ul className="feature-bullets">
          {bullets.map((b, i) => (
            <li key={i}>
              <CheckIcon />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" fill="url(#checkGrad)" />
      <path
        d="M5.5 10 L 8.5 13 L 14.5 7"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="checkGrad" x1="0" y1="0" x2="20" y2="20">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// === CONVOY DEMO ===
function ConvoyDemo() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 50);
    return () => clearInterval(id);
  }, []);
  const t = (tick % 200) / 200;

  const path = "M 30 600 Q 80 480 140 420 T 240 280 Q 280 200 320 100";

  return (
    <PhoneFrame>
      <MapBg>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 360 740"
          preserveAspectRatio="xMidYMid slice"
          style={{ position: "absolute", inset: 0 }}
        >
          <path
            d={path}
            stroke="#7C3AED"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
            opacity="0.25"
          />
          <path
            d={path}
            stroke="url(#convoyG)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          <defs>
            <linearGradient id="convoyG" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
          </defs>
          <AnimatedCar path={path} t={t} color="#F97316" name="You" />
          <AnimatedCar path={path} t={(t + 0.18) % 1} color="#7C3AED" name="Maya" />
          <AnimatedCar path={path} t={(t + 0.34) % 1} color="#EC4899" name="Alex" />
          <AnimatedCar path={path} t={(t + 0.5) % 1} color="#FBBF24" name="Sam" />
        </svg>

        {/* Crew strip */}
        <div
          style={{
            position: "absolute",
            top: 56,
            left: 16,
            right: 16,
            padding: "10px 14px",
            display: "flex",
            gap: 8,
            alignItems: "center",
            background: "rgba(20,20,30,0.85)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 14,
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.14em",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            CREW · 4
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            {["#F97316", "#7C3AED", "#EC4899", "#FBBF24"].map((c, i) => (
              <div
                key={i}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: c,
                  border: "2px solid #14141e",
                  marginLeft: i ? -8 : 0,
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {["Y", "M", "A", "S"][i]}
              </div>
            ))}
          </div>
        </div>

        {/* Speed badge */}
        <div
          style={{
            position: "absolute",
            bottom: 80,
            right: 16,
            padding: "10px 18px",
            background: "linear-gradient(90deg, #F97316, #7C3AED)",
            borderRadius: 999,
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: 16,
            fontWeight: 700,
            color: "#fff",
            boxShadow: "0 0 20px rgba(124,58,237,0.5)",
          }}
        >
          72 mph
        </div>
      </MapBg>
    </PhoneFrame>
  );
}

type AnimatedCarProps = { path: string; t: number; color: string; name: string };

function AnimatedCar({ path, t, color, name }: AnimatedCarProps) {
  const ref = useRef<SVGPathElement | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0, angle: 0 });
  useEffect(() => {
    if (!ref.current) return;
    const len = ref.current.getTotalLength();
    const p = ref.current.getPointAtLength(len * t);
    const p2 = ref.current.getPointAtLength(Math.min(len, len * t + 1));
    const angle = (Math.atan2(p2.y - p.y, p2.x - p.x) * 180) / Math.PI;
    setPos({ x: p.x, y: p.y, angle });
  }, [t, path]);
  return (
    <>
      <path ref={ref} d={path} fill="none" stroke="none" />
      <g transform={`translate(${pos.x},${pos.y}) rotate(${pos.angle})`}>
        <circle r="18" fill={color} opacity="0.25" />
        <circle r="11" fill={color} stroke="#fff" strokeWidth="2.5" />
        <text x="0" y="3" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle">
          {name[0]}
        </text>
      </g>
    </>
  );
}

// === PUSH-TO-TALK DEMO ===
function PTTDemo() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 60);
    return () => clearInterval(id);
  }, []);
  const t = tick;

  const bars = Array.from({ length: 24 }).map((_, i) => {
    const phase = t * 0.18 + i * 0.4;
    const h = 8 + Math.abs(Math.sin(phase)) * 28 + Math.abs(Math.sin(phase * 0.5)) * 12;
    // Round to 1 decimal: Node and Chrome libm disagree on Math.sin in the
    // last ULP, so unrounded values serialize as different strings during
    // SSR (Node) vs hydration (Chrome) and trip a hydration mismatch.
    return Math.round(h * 10) / 10;
  });

  return (
    <PhoneFrame>
      <MapBg>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 360 740"
          preserveAspectRatio="xMidYMid slice"
          style={{ position: "absolute", inset: 0 }}
        >
          <path
            d="M 40 600 Q 100 500 180 380 T 320 140"
            stroke="#7C3AED"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />
          <g transform="translate(180, 380)">
            <circle r={28 + Math.sin(t * 0.2) * 8} fill="#F97316" opacity="0.2" />
            <circle r={20 + Math.sin(t * 0.2) * 4} fill="#F97316" opacity="0.35" />
            <circle r="14" fill="#F97316" stroke="#fff" strokeWidth="3" />
            <text x="0" y="4" fontSize="10" fontWeight="700" fill="#fff" textAnchor="middle">
              M
            </text>
          </g>
          <circle cx="40" cy="600" r="14" fill="#7C3AED" stroke="#fff" strokeWidth="2.5" />
          <circle cx="320" cy="140" r="14" fill="#FBBF24" stroke="#fff" strokeWidth="2.5" />
        </svg>

        {/* Talking banner */}
        <div
          style={{
            position: "absolute",
            top: 56,
            left: 16,
            right: 16,
            padding: "12px 16px",
            display: "flex",
            gap: 12,
            alignItems: "center",
            background: "linear-gradient(90deg, rgba(249,115,22,0.25), rgba(249,115,22,0.08))",
            border: "1px solid rgba(249,115,22,0.5)",
            borderRadius: 14,
            backdropFilter: "blur(12px)",
            boxShadow: "0 0 24px rgba(249,115,22,0.3)",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#F97316",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 800,
              fontSize: 12,
            }}
          >
            M
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>Maya · talking</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>
              Heads up — taking exit 5B
            </div>
          </div>
          <div style={{ display: "flex", gap: 2, alignItems: "flex-end", height: 28 }}>
            {bars.slice(0, 4).map((h, i) => (
              <div
                key={i}
                style={{ width: 3, height: h * 0.6 + 6, background: "#F97316", borderRadius: 2 }}
              />
            ))}
          </div>
        </div>

        {/* Big PTT button + waveform */}
        <div
          style={{
            position: "absolute",
            bottom: 24,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              padding: "16px 22px",
              background: "rgba(15,15,21,0.85)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              display: "flex",
              gap: 3,
              alignItems: "center",
              height: 56,
            }}
          >
            {bars.map((h, i) => (
              <div
                key={i}
                style={{
                  width: 3,
                  height: h,
                  borderRadius: 2,
                  background: "linear-gradient(180deg, #F97316, #7C3AED)",
                }}
              />
            ))}
          </div>
          <div style={{ position: "relative", marginBottom: 16 }}>
            <div
              style={{
                position: "absolute",
                inset: -16,
                borderRadius: "50%",
                background: "rgba(124,58,237,0.3)",
                filter: "blur(12px)",
              }}
            />
            <div
              style={{
                position: "relative",
                width: 96,
                height: 96,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #7C3AED, #EC4899)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow:
                  "0 0 40px rgba(124,58,237,0.7), inset 0 2px 0 rgba(255,255,255,0.2)",
              }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <rect x="9" y="3" width="6" height="12" rx="3" fill="white" />
                <path
                  d="M5 11 V12 a7 7 0 0 0 14 0 V11"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M12 19 V22 M9 22 H15"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.16em",
              color: "rgba(255,255,255,0.4)",
              textTransform: "uppercase",
            }}
          >
            Hold to talk
          </div>
        </div>
      </MapBg>
    </PhoneFrame>
  );
}

// === NAV DEMO ===
function NavDemo() {
  return (
    <PhoneFrame>
      <MapBg>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 360 740"
          preserveAspectRatio="xMidYMid slice"
          style={{ position: "absolute", inset: 0 }}
        >
          <path
            d="M 180 740 V 400 L 260 360 V 200 L 180 160 V 0"
            stroke="#7C3AED"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
            opacity="0.3"
          />
          <path
            d="M 180 740 V 400 L 260 360 V 200 L 180 160 V 0"
            stroke="#A855F7"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          <g transform="translate(180, 540)">
            <circle r="22" fill="rgba(249,115,22,0.3)" />
            <polygon
              points="0,-12 -8,8 0,4 8,8"
              fill="#F97316"
              stroke="#fff"
              strokeWidth="2"
            />
          </g>
        </svg>

        {/* Maneuver banner */}
        <div
          style={{
            position: "absolute",
            top: 56,
            left: 16,
            right: 16,
            padding: 16,
            display: "flex",
            gap: 14,
            alignItems: "center",
            background: "rgba(15,15,21,0.92)",
            border: "1px solid rgba(168,85,247,0.5)",
            borderRadius: 18,
            backdropFilter: "blur(12px)",
            boxShadow: "0 0 32px rgba(124,58,237,0.4)",
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: 14,
              background: "linear-gradient(135deg, #7C3AED, #EC4899)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="26" height="26" viewBox="0 0 22 22" fill="none">
              <path
                d="M4 14 L 14 14 M 14 14 L 11 10 M 14 14 L 11 18"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                color: "#fff",
                fontWeight: 800,
                fontSize: 22,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
              }}
            >
              800 ft
            </div>
            <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, marginTop: 2 }}>
              Right onto Page Mill Rd.
            </div>
          </div>
        </div>

        {/* Lane guidance */}
        <div
          style={{
            position: "absolute",
            top: 168,
            left: 16,
            padding: "10px 14px",
            display: "flex",
            gap: 10,
            alignItems: "center",
            background: "rgba(15,15,21,0.85)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 12,
            backdropFilter: "blur(12px)",
          }}
        >
          <div style={{ display: "flex", gap: 4 }}>
            {["d", "d", "r", "r"].map((k, i) => (
              <div
                key={i}
                style={{
                  width: 18,
                  height: 28,
                  borderRadius: 4,
                  background:
                    i >= 2
                      ? "linear-gradient(180deg, rgba(168,85,247,0.4), rgba(168,85,247,0.1))"
                      : "rgba(255,255,255,0.06)",
                  border:
                    i >= 2
                      ? "1px solid rgba(168,85,247,0.6)"
                      : "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
                  {k === "r" ? (
                    <path
                      d="M2 12 V 6 L 5 4 L 8 6 V 12"
                      stroke="#A855F7"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  ) : (
                    <path
                      d="M5 12 V 2 M 5 2 L 2 5 M 5 2 L 8 5"
                      stroke="rgba(255,255,255,0.4)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  )}
                </svg>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#A855F7" }}>
            Use the right 2 lanes
          </div>
        </div>

        {/* Bottom nav summary */}
        <div
          style={{
            position: "absolute",
            bottom: 16,
            left: 16,
            right: 16,
            padding: 16,
            background: "rgba(15,15,21,0.92)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 18,
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: 28,
                fontWeight: 700,
                color: "#22C55E",
                lineHeight: 1,
              }}
            >
              59 min
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 2 }}>
              51 mi · 10:14 PM
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="3" fill="#A855F7" />
                <circle cx="10" cy="10" r="7" stroke="#A855F7" strokeWidth="1.5" />
              </svg>
            </div>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "#EF4444",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 2 L 12 12 M 12 2 L 2 12"
                  stroke="#fff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </MapBg>
    </PhoneFrame>
  );
}

// === ALERTS DEMO ===
function AlertsDemo() {
  const alerts = [
    { i: "🛡️", n: "Cop ahead", c: "#7C3AED" },
    { i: "⚠️", n: "Hazard", c: "#FBBF24" },
    { i: "🛑", n: "Brake!", c: "#EF4444" },
    { i: "📍", n: "Add stop", c: "#22C55E" },
    { i: "🔥", n: "Sexy car", c: "#EC4899" },
    { i: "😬", n: "Bad driver", c: "#F97316" },
    { i: "🔊", n: "Loud exhaust", c: "#A855F7" },
    { i: "🔔", n: "Honk train", c: "#FBBF24" },
    { i: "📸", n: "Photo op", c: "#EC4899" },
  ];
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % 9), 1800);
    return () => clearInterval(id);
  }, []);

  const current = alerts[active];

  return (
    <PhoneFrame>
      <MapBg>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 360 740"
          preserveAspectRatio="xMidYMid slice"
          style={{ position: "absolute", inset: 0 }}
        >
          <path
            d="M 50 700 Q 120 500 180 360 T 320 100"
            stroke="#7C3AED"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            opacity="0.5"
          />
          {/* Active alert pin */}
          <g transform="translate(180, 360)" key={active}>
            <circle r="28" fill={current.c} opacity="0.2">
              <animate attributeName="r" values="20;36;20" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <circle r="20" fill={current.c} />
            <text x="0" y="6" fontSize="20" textAnchor="middle">
              {current.i}
            </text>
          </g>
        </svg>

        {/* Alert banner */}
        <div
          key={`${active}b`}
          style={{
            position: "absolute",
            top: 56,
            left: 16,
            right: 16,
            padding: "12px 14px",
            display: "flex",
            gap: 12,
            alignItems: "center",
            background: `linear-gradient(90deg, ${current.c}40, rgba(15,15,21,0.95))`,
            border: `1px solid ${current.c}80`,
            borderRadius: 14,
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: current.c,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
            }}
          >
            {current.i}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>{current.n}</div>
            <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 11 }}>
              From Maya · 1.2 mi ahead
            </div>
          </div>
        </div>

        {/* Alert grid */}
        <div
          style={{
            position: "absolute",
            bottom: 24,
            left: 16,
            right: 16,
            padding: 16,
            background: "rgba(15,15,21,0.92)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 18,
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.16em",
              color: "rgba(255,255,255,0.5)",
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            Quick Alerts
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {alerts.map((a, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  padding: "12px 8px",
                  borderRadius: 12,
                  background: i === active ? `${a.c}30` : "rgba(255,255,255,0.04)",
                  border:
                    i === active ? `1px solid ${a.c}` : "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  transition: "all 200ms",
                }}
              >
                <div style={{ fontSize: 22 }}>{a.i}</div>
                <div
                  style={{
                    fontSize: 10,
                    color: "#fff",
                    fontWeight: 600,
                    textAlign: "center",
                    lineHeight: 1.2,
                  }}
                >
                  {a.n}
                </div>
              </button>
            ))}
          </div>
        </div>
      </MapBg>
    </PhoneFrame>
  );
}

// === CARPLAY DEMO ===
function CarPlayDemo() {
  return (
    <div
      style={{
        // Fixed natural width on roomy viewports; clamp to the available
        // container width on narrow ones. `width: "100%"` collapses to
        // intrinsic content width here because the flex parent is auto-
        // sized (the FeatureRow's relative wrapper around the art slot
        // has no explicit width). Pinning to `480` keeps the head unit
        // at its design size, and `maxWidth: "calc(100vw - 40px)"` (the
        // 20px container padding × 2) makes it shrink on viewports
        // narrower than the design width without grid/flex contortions.
        width: 480,
        maxWidth: "calc(100vw - 40px)",
        borderRadius: 18,
        background: "linear-gradient(160deg, #2a2a35 0%, #0a0a10 60%)",
        padding: 10,
        boxShadow:
          "0 50px 100px -20px rgba(0,0,0,0.7), 0 30px 60px -15px rgba(124,58,237,0.3)",
      }}
    >
      <div
        style={{
          borderRadius: 12,
          overflow: "hidden",
          background: "#0a0a14",
          aspectRatio: "16/10",
          position: "relative",
        }}
      >
        <MapBg>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 480 300"
            preserveAspectRatio="xMidYMid slice"
            style={{ position: "absolute", inset: 0 }}
          >
            <path
              d="M 60 270 Q 200 200 260 140 T 440 60"
              stroke="#7C3AED"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
              opacity="0.3"
            />
            <path
              d="M 60 270 Q 200 200 260 140 T 440 60"
              stroke="#A855F7"
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
            />
            <g transform="translate(60, 270)">
              <circle r="14" fill="#F97316" stroke="#fff" strokeWidth="2" />
            </g>
            <g transform="translate(260, 140)">
              <circle r="22" fill="rgba(124,58,237,0.25)" />
              <circle r="11" fill="#7C3AED" stroke="#fff" strokeWidth="2" />
            </g>
            <g transform="translate(440, 60)">
              <rect x="-7" y="-7" width="14" height="14" rx="3" fill="#F97316" />
            </g>
          </svg>

          {/* Top-left maneuver */}
          <div
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              padding: "8px 14px",
              display: "flex",
              gap: 10,
              alignItems: "center",
              background: "rgba(15,15,21,0.92)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "linear-gradient(135deg, #7C3AED, #EC4899)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 22 22" fill="none">
                <path
                  d="M4 14 H14 M 14 14 L 11 10 M 14 14 L 11 18"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <div
                style={{ color: "#fff", fontWeight: 800, fontSize: 16, letterSpacing: "-0.02em" }}
              >
                0.5 mi
              </div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 10 }}>
                San Tomas Aquino Rd.
              </div>
            </div>
          </div>

          {/* Who's talking banner */}
          <div
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              padding: "6px 12px",
              display: "flex",
              gap: 8,
              alignItems: "center",
              background: "rgba(249,115,22,0.18)",
              border: "1px solid rgba(249,115,22,0.5)",
              borderRadius: 999,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#F97316",
                boxShadow: "0 0 8px #F97316",
              }}
            />
            <span style={{ color: "#FFA866", fontSize: 11, fontWeight: 700 }}>
              Maya · talking
            </span>
          </div>

          {/* Bottom CarPlay-style bar */}
          <div
            style={{
              position: "absolute",
              bottom: 12,
              left: 12,
              right: 12,
              display: "flex",
              gap: 8,
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: "linear-gradient(135deg, #7C3AED, #EC4899)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 20px rgba(124,58,237,0.5)",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="9" y="3" width="6" height="12" rx="3" fill="white" />
                <path
                  d="M5 11 V12 a7 7 0 0 0 14 0 V11"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            {[
              { n: "Coffee", e: "☕" },
              { n: "Gas", e: "⛽" },
              { n: "Food", e: "🍔" },
              { n: "Charge", e: "⚡" },
            ].map((p) => (
              <div
                key={p.n}
                style={{
                  flex: 1,
                  height: 56,
                  borderRadius: 12,
                  background: "rgba(20,20,30,0.85)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                <div style={{ fontSize: 18 }}>{p.e}</div>
                <div style={{ color: "#fff", fontSize: 10, fontWeight: 600 }}>{p.n}</div>
              </div>
            ))}
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: "rgba(20,20,30,0.85)",
                border: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2 L 14 9 L 22 10 L 16 15 L 18 22 L 12 18 L 6 22 L 8 15 L 2 10 L 10 9 Z"
                  fill="#A855F7"
                />
              </svg>
            </div>
          </div>
        </MapBg>
      </div>
      {/* Mock dashboard footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 16px 6px",
          color: "rgba(255,255,255,0.5)",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.1em",
        }}
      >
        <span>CARPLAY</span>
        <span style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <RoamMark size={12} />
          <span>ROAM</span>
        </span>
        <span>09:41</span>
      </div>
    </div>
  );
}
