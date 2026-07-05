/**
 * The world-map moment — deliberately abstract. A dark field with a dot
 * grid, the Colombo hub, and azure delivery arcs that draw themselves
 * toward each served region when the section scrolls into view (driven
 * by the parent Reveal — see .map-arc in globals.css).
 * No literal continents: the geometry is honest about being a diagram.
 */

const hub = { x: 520, y: 300 };

const nodes = [
  { label: "EUROPE", x: 300, y: 110, d: 0.35 },
  { label: "NORTH AMERICA", x: 110, y: 180, d: 0.5 },
  { label: "MIDDLE EAST", x: 372, y: 216, d: 0.65 },
  { label: "ASIA-PACIFIC", x: 770, y: 190, d: 0.8 },
  { label: "AUSTRALIA", x: 850, y: 412, d: 0.95 },
];

function arc(from: typeof hub, to: { x: number; y: number }) {
  // Quadratic arc: control point is the midpoint lifted upward,
  // for a simple flight-path curve in every direction.
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const len = Math.hypot(to.x - from.x, to.y - from.y) || 1;
  const lift = Math.min(90, len * 0.28);
  return `M ${from.x} ${from.y} Q ${mx} ${my - lift} ${to.x} ${to.y}`;
}

export default function GlobalMap() {
  return (
    <svg
      viewBox="0 0 1000 520"
      role="img"
      aria-label="Delivery map: projects delivered from Sri Lanka to Europe, North America, the Middle East, Asia-Pacific, and Australia"
      className="w-full border border-paper/10 bg-surface"
    >
      <defs>
        <pattern id="dotgrid" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="var(--color-paper)" fillOpacity="0.07" />
        </pattern>
      </defs>
      <rect width="1000" height="520" fill="url(#dotgrid)" />

      {/* Delivery arcs */}
      {nodes.map((n) => (
        <path
          key={n.label}
          d={arc(hub, n)}
          pathLength={1}
          fill="none"
          stroke="rgba(0,178,255,0.55)"
          strokeWidth="1.2"
          className="map-arc"
          style={{ "--d": `${n.d}s` } as React.CSSProperties}
        />
      ))}

      {/* Region nodes */}
      {nodes.map((n) => (
        <g
          key={n.label}
          className="map-node"
          style={{ "--d": `${n.d + 0.7}s` } as React.CSSProperties}
        >
          <circle cx={n.x} cy={n.y} r="4" fill="#00b2ff" />
          <circle
            cx={n.x}
            cy={n.y}
            r="7"
            fill="none"
            stroke="#00b2ff"
            strokeWidth="1"
            className="node-pulse"
          />
          <text
            x={n.x}
            y={n.y - 16}
            textAnchor="middle"
            fill="var(--color-paper)"
            fillOpacity="0.55"
            fontSize="11"
            letterSpacing="2"
            fontFamily="var(--font-mono)"
          >
            {n.label}
          </text>
        </g>
      ))}

      {/* Hub — Colombo */}
      <g>
        <circle cx={hub.x} cy={hub.y} r="6" fill="#00b2ff" />
        <circle
          cx={hub.x}
          cy={hub.y}
          r="11"
          fill="none"
          stroke="#00b2ff"
          strokeWidth="1"
          className="node-pulse"
        />
        <text
          x={hub.x}
          y={hub.y + 30}
          textAnchor="middle"
          fill="var(--color-azure-text)"
          fontSize="12"
          letterSpacing="2.5"
          fontFamily="var(--font-mono)"
        >
          COLOMBO — HQ
        </text>
      </g>
    </svg>
  );
}
