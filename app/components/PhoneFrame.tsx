"use client";

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  w?: number;
  h?: number;
  /**
   * When `true`, suppresses the painted dynamic island + 9:41 status bar.
   * Used when wrapping a real iPhone screenshot, which already has its own
   * status chrome rendered into the image; double-rendering would leave a
   * fake island floating over the screenshot's real one.
   */
  chromeless?: boolean;
};

export default function PhoneFrame({
  children,
  w = 360,
  h = 740,
  chromeless = false,
}: Props) {
  return (
    <div
      style={{
        width: w,
        height: h,
        borderRadius: 56,
        background: "linear-gradient(160deg, #2a2a35 0%, #0a0a10 60%)",
        padding: 8,
        boxShadow:
          "0 60px 120px -20px rgba(0,0,0,0.7), 0 30px 60px -15px rgba(124,58,237,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 48,
          overflow: "hidden",
          background: "#000",
          position: "relative",
        }}
      >
        {!chromeless ? (
          <>
            {/* Dynamic island */}
            <div
              style={{
                position: "absolute",
                top: 12,
                left: "50%",
                transform: "translateX(-50%)",
                width: 110,
                height: 32,
                borderRadius: 999,
                background: "#000",
                zIndex: 5,
              }}
            />
            {/* Status bar */}
            <div
              style={{
                position: "absolute",
                top: 16,
                left: 28,
                right: 28,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "#fff",
                fontSize: 13,
                fontWeight: 600,
                zIndex: 4,
              }}
            >
              <span>9:41</span>
              <span style={{ display: "flex", gap: 4, alignItems: "center" }}>
                <svg width="16" height="10" viewBox="0 0 16 10" fill="white">
                  <rect x="0" y="6" width="3" height="4" rx="0.5" />
                  <rect x="4" y="4" width="3" height="6" rx="0.5" />
                  <rect x="8" y="2" width="3" height="8" rx="0.5" />
                  <rect x="12" y="0" width="3" height="10" rx="0.5" />
                </svg>
                <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
                  <rect
                    x="1"
                    y="1"
                    width="18"
                    height="9"
                    rx="2.5"
                    stroke="white"
                    strokeOpacity="0.6"
                  />
                  <rect x="2.5" y="2.5" width="15" height="6" rx="1.5" fill="white" />
                  <rect
                    x="20"
                    y="4"
                    width="1.5"
                    height="3"
                    rx="0.5"
                    fill="white"
                    fillOpacity="0.6"
                  />
                </svg>
              </span>
            </div>
          </>
        ) : null}
        <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>{children}</div>
      </div>
    </div>
  );
}
