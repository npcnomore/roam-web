import Image from "next/image";

type Props = {
  size?: number;
  className?: string;
};

/**
 * Brand mark. Uses the same `Logo-Transparent.png` shipped with the iOS app
 * so the website wordmark is identical to the app icon. Served from
 * `/public/logo.png` and resized via `next/image` so we get the right
 * intrinsic dimensions for layout and a small download for small instances.
 */
export default function RoamMark({ size = 32, className = "" }: Props) {
  return (
    <Image
      src="/logo.png"
      alt="Roam"
      width={size}
      height={size}
      priority
      className={className}
      style={{ width: size, height: size }}
    />
  );
}
