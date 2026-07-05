import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const dynamic = "force-static";
export const alt =
  "Acmevia — Software built for how your business actually works";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const clash = await readFile(
    join(process.cwd(), "app/fonts/ClashDisplay-600.woff")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          padding: "72px 80px",
          fontFamily: "Clash Display",
        }}
      >
        {/* Monogram — strokes pre-expanded to fills (satori has no
            reliable SVG stroke support) */}
        <svg viewBox="0 0 1030 500" width="206" height="100">
          <path fill="#00B2FF" d="M330 0 L0 500 L100 500 L330 151 Z" />
          <path fill="#00B2FF" d="M330 0 L493 248 L443 324 L330 151 Z" />
          <path fill="#00B2FF" d="M230 352 L610 352 L544 452 L164 452 Z" />
          <path fill="#00B2FF" d="M455 0 L645 0 L550 240 Z" />
          <path fill="#00B2FF" d="M592 169 L658 151 L733 421 L667 439 Z" />
          <path fill="#00B2FF" d="M668 418 L732 442 L887 37 L823 13 Z" />
          <path fill="#00B2FF" d="M778 465 L802 475 L957 70 L933 60 Z" />
          <path fill="#00B2FF" d="M848 465 L872 475 L1022 83 L998 73 Z" />
        </svg>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", color: "#ffffff", fontSize: 64, lineHeight: 1.08 }}>
            Software built for how
          </div>
          <div style={{ display: "flex", color: "#ffffff", fontSize: 64, lineHeight: 1.08 }}>
            <span>your business</span>
            <span style={{ color: "#00B2FF", marginLeft: 18 }}>
              actually works.
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(0,178,255,0.5)",
            paddingTop: 28,
            color: "rgba(255,255,255,0.6)",
            fontSize: 22,
            letterSpacing: 4,
          }}
        >
          <span>ACMEVIA</span>
          <span>EST. SRI LANKA — DELIVERING WORLDWIDE</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Clash Display", data: clash, weight: 600, style: "normal" }],
    }
  );
}
