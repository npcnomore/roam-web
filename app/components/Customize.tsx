"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

type Tile = {
  id: string;
  label: string;
  icon: string;
  x: number;
  y: number;
  color: string;
};

const initialTiles: Tile[] = [
  { id: "speed", label: "Speed", icon: "S", x: 24, y: 24, color: "linear-gradient(135deg, #F97316, #7C3AED)" },
  { id: "mic", label: "Mic", icon: "M", x: 220, y: 24, color: "linear-gradient(135deg, #7C3AED, #EC4899)" },
  { id: "alerts", label: "Alerts", icon: "A", x: 24, y: 110, color: "linear-gradient(135deg, #EF4444, #F97316)" },
  { id: "crew", label: "Crew", icon: "C", x: 220, y: 110, color: "linear-gradient(135deg, #FBBF24, #F97316)" },
  { id: "eta", label: "ETA", icon: "E", x: 24, y: 200, color: "linear-gradient(135deg, #22C55E, #7C3AED)" },
  { id: "music", label: "Music", icon: "♫", x: 220, y: 200, color: "linear-gradient(135deg, #EC4899, #FBBF24)" },
];

const mapStyles = ["standard", "satellite", "outdoors"] as const;
type MapStyle = (typeof mapStyles)[number];

type DragState = { id: string; offX: number; offY: number };

export default function Customize() {
  const [tiles, setTiles] = useState<Tile[]>(initialTiles);
  // dragId drives the `.dragging` class for visual feedback. The actual
  // pointer offsets live in `dragRef` so the move handler reads them
  // without waiting for a React re-render to commit.
  const [dragId, setDragId] = useState<string | null>(null);
  const dragRef = useRef<DragState | null>(null);
  const [mapStyle, setMapStyle] = useState<MapStyle>("standard");
  const canvasRef = useRef<HTMLDivElement>(null);

  // Attach window pointer listeners *once on mount*. The previous version
  // attached them inside a useEffect with `[drag]` dependency, which meant
  // listeners only became live AFTER React committed the post-pointerdown
  // re-render. Real users moving their pointer in the first ~16ms saw their
  // move events dropped — the tile would lock in place under the cursor and
  // never follow. Read drag state from the ref instead so the listener is
  // always armed.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag || !canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      let nx = e.clientX - rect.left - drag.offX;
      let ny = e.clientY - rect.top - drag.offY;
      nx = Math.max(8, Math.min(rect.width - 130, nx));
      ny = Math.max(8, Math.min(rect.height - 56, ny));
      setTiles((ts) => ts.map((t) => (t.id === drag.id ? { ...t, x: nx, y: ny } : t)));
    };
    const onUp = () => {
      if (dragRef.current) {
        dragRef.current = null;
        setDragId(null);
      }
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  const onDown = (id: string, e: ReactPointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    const tile = tiles.find((t) => t.id === id);
    if (!tile || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    dragRef.current = {
      id,
      offX: e.clientX - rect.left - tile.x,
      offY: e.clientY - rect.top - tile.y,
    };
    setDragId(id);
  };

  return (
    <section className="section">
      <div className="container">
        <div className="customize-grid reveal">
          <div>
            <span className="section-eyebrow">Customize Your Drive</span>
            <h2 className="section-title">
              Make the dash <span className="grad-text">yours.</span>
            </h2>
            <p className="section-sub">
              Drag every HUD tile wherever you want it. Speed, mic, alerts, crew strip, ETA — all of
              it. Pair with three map styles tuned for the time of day.
            </p>
            <div className="map-style-row">
              {mapStyles.map((s) => (
                <button
                  key={s}
                  className={`map-style ${mapStyle === s ? "active" : ""}`}
                  onClick={() => setMapStyle(s)}
                >
                  <div className={`swatch ${s}`} />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ textTransform: "capitalize" }}>{s}</span>
                    {mapStyle === s && (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="6" fill="#A855F7" />
                        <path
                          d="M4 7 L 6 9 L 10 5"
                          stroke="#fff"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
            <div style={{ marginTop: 24, fontSize: 13, color: "var(--text-faint)" }}>
              👆 Try dragging the tiles in the canvas →
            </div>
          </div>

          <div className="hud-canvas" ref={canvasRef}>
            <div
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.4)",
                textTransform: "uppercase",
                zIndex: 2,
              }}
            >
              Driving View · Edit
            </div>
            {tiles.map((t) => (
              <div
                key={t.id}
                className={`hud-tile ${dragId === t.id ? "dragging" : ""}`}
                style={{ left: t.x, top: t.y, width: 130 }}
                onPointerDown={(e) => onDown(t.id, e)}
              >
                <div
                  className="icon-dot"
                  style={{ background: t.color, color: "#fff", fontSize: 12 }}
                >
                  {t.icon}
                </div>
                <div>
                  <div style={{ fontSize: 13, color: "#fff" }}>{t.label}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>
                    drag me
                  </div>
                </div>
              </div>
            ))}
            <div
              style={{
                position: "absolute",
                bottom: 16,
                left: 16,
                right: 16,
                padding: "10px 14px",
                borderRadius: 12,
                background: "rgba(124,58,237,0.15)",
                border: "1px solid rgba(124,58,237,0.35)",
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: 12,
                fontWeight: 500,
                color: "#D9C2FF",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M7 4 V 8 M 7 10 V 10.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              Layout saves automatically · syncs to CarPlay
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
