"use client";

import { useState } from "react";
import { site } from "@/lib/data";

/**
 * Demo slot picker — PLACEHOLDER for a Calendly/Cal.com embed
 * (see HANDOFF.md § Booking). Until then it's still functional:
 * picking a slot builds a pre-filled WhatsApp message, so a booking
 * request is one tap away with no backend.
 */
const days = [
  { day: "Tue", slots: ["09:00", "11:30", "15:00"] },
  { day: "Wed", slots: ["10:00", "14:00", "16:30"] },
  { day: "Thu", slots: ["09:30", "13:00", "17:00"] },
];

export default function BookDemo() {
  const [picked, setPicked] = useState<string | null>(null);

  const waHref = picked
    ? `${site.whatsappLink}?text=${encodeURIComponent(
        `Hi Acmevia — I'd like to book a free demo. Preferred slot: ${picked} (my local time).`
      )}`
    : site.whatsappLink;

  return (
    <div className="border border-paper/10 bg-surface p-8 md:p-10">
      <p className="eyebrow">Book a Free Demo</p>
      <h3 className="mt-3 font-display text-title font-medium text-paper">
        Pick a slot. We'll confirm within the day.
      </h3>
      <p className="mt-3 text-meta text-paper/55">
        30 minutes, your use case on screen, no slideware. Times shown in your
        local timezone.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {days.map((d) => (
          <div key={d.day}>
            <p className="font-mono text-label uppercase tracking-[0.14em] text-paper/40">
              {d.day}
            </p>
            <div className="mt-3 space-y-2">
              {d.slots.map((s) => {
                const id = `${d.day} ${s}`;
                const active = picked === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setPicked(active ? null : id)}
                    aria-pressed={active}
                    className={`block w-full border px-4 py-2.5 font-mono text-meta transition-colors duration-300 ${
                      active
                        ? "border-azure bg-azure text-ink"
                        : "border-paper/15 text-paper/70 hover:border-azure/60 hover:text-paper"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-paper/10 pt-6">
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn ${picked ? "btn-primary" : "btn-ghost"}`}
        >
          {picked ? `Confirm ${picked} on WhatsApp` : "Ask for another time"}
        </a>
        {picked && (
          <p className="text-meta text-paper/50">
            We'll reply with a calendar invite.
          </p>
        )}
      </div>
    </div>
  );
}
