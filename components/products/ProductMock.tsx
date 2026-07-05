/**
 * Product hero mockups — dashboards sketched in pure CSS inside a
 * browser frame. Deliberately abstract: enough UI to feel real, no
 * fake screenshots. All decorative (aria-hidden).
 */

function Frame({
  url,
  children,
  overlay,
}: {
  url: string;
  children: React.ReactNode;
  overlay?: React.ReactNode;
}) {
  return (
    <div aria-hidden="true" className="relative">
      <div className="overflow-hidden rounded-lg border border-white/15 bg-surface shadow-[0_24px_80px_rgba(0,178,255,0.08)]">
        {/* Browser chrome */}
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-2.5">
          <span className="flex gap-1.5">
            <span className="size-2 rounded-full bg-white/20" />
            <span className="size-2 rounded-full bg-white/20" />
            <span className="size-2 rounded-full bg-azure/60" />
          </span>
          <span className="rounded-full bg-white/5 px-3 py-1 font-mono text-[0.625rem] tracking-wide text-paper/50">
            {url}
          </span>
        </div>
        <div className="aspect-[16/10] p-4">{children}</div>
      </div>
      {overlay}
    </div>
  );
}

const Bar = ({ w, className = "bg-white/15" }: { w: string; className?: string }) => (
  <div className={`h-1.5 rounded-full ${className}`} style={{ width: w }} />
);

function LmsMock() {
  return (
    <Frame url="lms.yourbrand.com/admin">
      <div className="flex h-full gap-3">
        {/* Sidebar */}
        <div className="hidden w-1/5 flex-col gap-3 rounded border border-white/10 p-3 sm:flex">
          <div className="size-3 bg-azure" style={{ clipPath: "polygon(0 100%, 55% 0, 100% 100%, 70% 100%, 55% 55%, 30% 100%)" }} />
          <Bar w="80%" className="bg-azure/60" />
          <Bar w="65%" />
          <Bar w="70%" />
          <Bar w="55%" />
        </div>
        {/* Main */}
        <div className="flex flex-1 flex-col gap-3">
          <div className="grid grid-cols-3 gap-3">
            {[
              ["2,314", "STUDENTS"],
              ["48", "COURSES"],
              ["92%", "ATTENDANCE"],
            ].map(([v, l]) => (
              <div key={l} className="rounded border border-white/10 p-2.5">
                <p className="font-display text-base font-semibold text-paper sm:text-xl">{v}</p>
                <p className="mt-1 font-mono text-[0.5rem] tracking-[0.14em] text-paper/40">{l}</p>
              </div>
            ))}
          </div>
          <div className="flex-1 rounded border border-white/10 p-3">
            <p className="font-mono text-[0.5rem] tracking-[0.14em] text-azure">EXAM RESULTS — AUTO-GRADED</p>
            <div className="mt-2.5 space-y-2">
              {["82%", "74%", "91%", "68%"].map((p, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Bar w="26%" />
                  <div className="h-1.5 flex-1 rounded-full bg-white/5">
                    <div className="h-full rounded-full bg-azure/70" style={{ width: p }} />
                  </div>
                  <span className="font-mono text-[0.5rem] text-paper/50">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

function HallMock() {
  // 5 days × 4 slots; azure cells are confirmed bookings
  const booked = new Set([1, 3, 4, 7, 10, 12, 15, 18]);
  return (
    <Frame url="spaces.yourbrand.com/calendar">
      <div className="flex h-full flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[0.55rem] tracking-[0.14em] text-azure">
            ALL VENUES — WEEK 41
          </p>
          <div className="flex gap-2">
            <span className="rounded-full border border-azure/50 px-2 py-0.5 font-mono text-[0.5rem] text-azure">
              0 CONFLICTS
            </span>
          </div>
        </div>
        <div className="grid flex-1 grid-cols-5 gap-1.5">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className={`rounded-sm border p-1.5 ${
                booked.has(i)
                  ? "border-azure/50 bg-azure/15"
                  : "border-white/10 bg-white/[0.02]"
              }`}
            >
              {booked.has(i) && <Bar w="70%" className="bg-azure/70" />}
            </div>
          ))}
        </div>
        <div className="flex gap-4 font-mono text-[0.5rem] tracking-wide text-paper/40">
          <span>■ AUDITORIUM</span>
          <span>■ BOARDROOM A</span>
          <span>■ LAB 2</span>
        </div>
      </div>
    </Frame>
  );
}

function DmsMock() {
  return (
    <Frame
      url="dms.yourbrand.com/live"
      overlay={
        /* Field-agent POS phone overlapping the frame */
        <div className="absolute -bottom-8 right-4 w-24 rounded-xl border border-azure/40 bg-ink p-2.5 shadow-[0_16px_48px_rgba(0,0,0,0.6)] sm:w-28">
          <p className="font-mono text-[0.5rem] tracking-[0.14em] text-azure">POS — RT-14</p>
          <p className="mt-1.5 font-display text-sm font-semibold text-paper">Rs 48,200</p>
          <div className="mt-2 space-y-1.5">
            <Bar w="90%" />
            <Bar w="70%" />
          </div>
          <div className="mt-2.5 h-5 rounded bg-azure" />
        </div>
      }
    >
      <div className="flex h-full gap-3">
        <div className="flex flex-1 flex-col gap-2">
          <p className="font-mono text-[0.55rem] tracking-[0.14em] text-azure">
            LIVE TRANSACTIONS
          </p>
          {[
            ["14:02", "RT-14 · KANDY", "+ 12,400"],
            ["14:02", "RT-07 · GALLE", "+ 3,150"],
            ["14:01", "RT-22 · COLOMBO N", "+ 9,760"],
            ["14:00", "RT-09 · MATARA", "+ 5,020"],
            ["13:58", "RT-14 · KANDY", "+ 7,300"],
          ].map(([t, r, v], i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded border border-white/10 px-2 py-1.5 font-mono text-[0.5rem] text-paper/60"
            >
              <span className="text-paper/35">{t}</span>
              <span>{r}</span>
              <span className="text-azure">{v}</span>
            </div>
          ))}
        </div>
        <div className="hidden w-2/5 flex-col gap-3 sm:flex">
          <div className="rounded border border-white/10 p-2.5">
            <p className="font-mono text-[0.5rem] tracking-[0.14em] text-paper/40">UNITS TODAY</p>
            <p className="mt-1 font-display text-xl font-semibold text-paper">11,847</p>
          </div>
          <div className="relative flex-1 rounded border border-white/10">
            {/* Agent positions */}
            {[
              [22, 30], [58, 22], [40, 55], [72, 62], [30, 78], [64, 84],
            ].map(([x, y], i) => (
              <span
                key={i}
                className="absolute size-1.5 rounded-full bg-azure"
                style={{ left: `${x}%`, top: `${y}%` }}
              />
            ))}
            <span className="absolute bottom-1.5 left-2 font-mono text-[0.5rem] tracking-[0.14em] text-paper/35">
              AGENTS — LIVE
            </span>
          </div>
        </div>
      </div>
    </Frame>
  );
}

export default function ProductMock({ variant }: { variant: "lms" | "hall" | "dms" }) {
  if (variant === "lms") return <LmsMock />;
  if (variant === "hall") return <HallMock />;
  return <DmsMock />;
}
