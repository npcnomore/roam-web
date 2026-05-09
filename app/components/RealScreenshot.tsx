"use client";

import Image from "next/image";
import PhoneFrame from "./PhoneFrame";

type Props = {
  src: string;
  alt: string;
  w?: number;
  h?: number;
};

/**
 * Drops a real iPhone screenshot into the same `PhoneFrame` bezel + shadow
 * the rest of the page uses, without the fake status bar / dynamic island
 * (the screenshot already has its own). The screenshot fills the screen
 * area edge-to-edge with `object-cover` so it crops cleanly to the bezel
 * radius even though source images are slightly taller (1320×2868 vs the
 * 360×740 frame ratio).
 */
export default function RealScreenshot({ src, alt, w = 360, h = 740 }: Props) {
  return (
    <PhoneFrame w={w} h={h} chromeless>
      <Image
        src={src}
        alt={alt}
        width={w}
        height={h}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        priority
      />
    </PhoneFrame>
  );
}
