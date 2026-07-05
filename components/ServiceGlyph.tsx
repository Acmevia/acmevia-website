import type { Service } from "@/lib/data";

/**
 * Line-art schematics — one per service. Drawn in the site's own hand
 * (thin azure strokes, slashed corners) instead of stock imagery.
 */
export default function ServiceGlyph({
  glyph,
  className = "",
}: {
  glyph: Service["glyph"];
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      className={className}
    >
      {glyph === "web" && (
        <>
          <path d="M14 26 H106 V94 H14 Z" />
          <path d="M14 40 H106" />
          <circle cx="22" cy="33" r="1.6" fill="currentColor" stroke="none" />
          <circle cx="30" cy="33" r="1.6" fill="currentColor" stroke="none" />
          <path d="M26 56 H70 M26 68 H94 M26 80 H58" strokeOpacity="0.6" />
          <path d="M82 52 L96 60 L82 68" />
        </>
      )}
      {glyph === "mobile" && (
        <>
          <rect x="40" y="14" width="40" height="92" rx="6" />
          <path d="M54 22 H66" />
          <path d="M48 40 H72 M48 52 H72 M48 64 H64" strokeOpacity="0.6" />
          <path d="M14 60 H32 M24 52 L32 60 L24 68" />
          <path d="M106 60 H88 M96 52 L88 60 L96 68" />
        </>
      )}
      {glyph === "wordpress" && (
        <>
          <circle cx="60" cy="60" r="42" />
          <path d="M24 46 H96" strokeOpacity="0.6" />
          <path d="M40 46 L54 88 L62 62 L70 88 L84 46" />
        </>
      )}
      {glyph === "ecommerce" && (
        <>
          <path d="M16 24 H30 L44 78 H92 L102 40 H36" />
          <circle cx="50" cy="94" r="6" />
          <circle cx="84" cy="94" r="6" />
          <path d="M60 52 L68 60 L82 46" />
        </>
      )}
      {glyph === "erp" && (
        <>
          <rect x="46" y="14" width="28" height="22" />
          <rect x="14" y="84" width="28" height="22" />
          <rect x="46" y="84" width="28" height="22" />
          <rect x="78" y="84" width="28" height="22" />
          <path d="M60 36 V60 M60 60 H28 V84 M60 60 V84 M60 60 H92 V84" strokeOpacity="0.7" />
          <circle cx="60" cy="60" r="3" fill="currentColor" stroke="none" />
        </>
      )}
      {glyph === "crm" && (
        <>
          <path d="M20 22 H100 L74 58 V96 L46 84 V58 Z" />
          <path d="M36 36 H84" strokeOpacity="0.6" />
          <circle cx="60" cy="70" r="2" fill="currentColor" stroke="none" />
        </>
      )}
      {glyph === "automation" && (
        <>
          <circle cx="36" cy="40" r="14" />
          <path d="M36 18 V26 M36 54 V62 M14 40 H22 M50 40 H58 M20 24 L26 30 M46 50 L52 56 M52 24 L46 30 M26 50 L20 56" />
          <path d="M58 84 H74 L82 74 L90 94 L98 84 H106" />
          <path d="M64 40 H84 V64" strokeOpacity="0.6" />
        </>
      )}
      {glyph === "uiux" && (
        <>
          <rect x="14" y="18" width="92" height="66" rx="2" />
          <path d="M30 34 H62 M30 46 H50" strokeOpacity="0.6" />
          <path d="M66 52 L92 78 L80 80 L86 94 L78 98 L72 84 L62 92 Z" fill="none" />
        </>
      )}
    </svg>
  );
}
