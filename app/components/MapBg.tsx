"use client";

import type { CSSProperties, ReactNode } from "react";

type Props = {
  children?: ReactNode;
  style?: CSSProperties;
};

export default function MapBg({ children, style }: Props) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(180deg, #0a1220 0%, #07101c 50%, #050a14 100%)",
        overflow: "hidden",
        ...style,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 360 740"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <pattern id="streets" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M0 40 H80 M40 0 V80" stroke="rgba(120,140,180,0.10)" strokeWidth="1" />
            <path
              d="M0 20 H80 M0 60 H80 M20 0 V80 M60 0 V80"
              stroke="rgba(120,140,180,0.05)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#streets)" />
        <ellipse cx="40" cy="200" rx="80" ry="50" fill="rgba(40,80,60,0.25)" />
        <ellipse cx="320" cy="500" rx="100" ry="70" fill="rgba(40,80,60,0.20)" />
        <ellipse cx="180" cy="650" rx="120" ry="40" fill="rgba(30,60,100,0.30)" />
        <path
          d="M-20 180 Q 100 200 200 280 T 400 380"
          stroke="rgba(160,180,210,0.15)"
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M40 -20 Q 80 200 160 360 T 280 760"
          stroke="rgba(160,180,210,0.12)"
          strokeWidth="2.5"
          fill="none"
        />
      </svg>
      {children}
    </div>
  );
}
