"use client";

import { useState } from "react";
import { services, products, site } from "@/lib/data";

type Status = "idle" | "sending" | "success" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

/**
 * Static-export friendly contact form.
 * — Client-side validation, plain interface voice.
 * — Honeypot field ("website") silently drops bots.
 * — POSTs to NEXT_PUBLIC_FORM_ENDPOINT (Formspree/Basin/own API).
 *   Without an endpoint configured it falls back to a mailto: draft,
 *   so the form is never a dead end. See HANDOFF.md § Forms.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  const validate = (data: FormData): Errors => {
    const next: Errors = {};
    if (!String(data.get("name") ?? "").trim()) {
      next.name = "We need a name to reply to.";
    }
    const email = String(data.get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      next.email = "That email doesn't look right.";
    }
    if (String(data.get("message") ?? "").trim().length < 10) {
      next.message = "Tell us a little more — a sentence or two is plenty.";
    }
    return next;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: real users never see or fill this field.
    if (String(data.get("website") ?? "") !== "") {
      setStatus("success");
      return;
    }

    const nextErrors = validate(data);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
    const payload = Object.fromEntries(data.entries());
    delete (payload as Record<string, unknown>).website;

    if (!endpoint) {
      // No backend configured: open a pre-filled email instead.
      const body = encodeURIComponent(
        `Name: ${payload.name}\nCompany: ${payload.company || "—"}\nEmail: ${payload.email}\nNeed: ${payload.need}\n\n${payload.message}`
      );
      window.location.href = `mailto:${site.emailSales}?subject=${encodeURIComponent(
        "Project enquiry — " + String(payload.name)
      )}&body=${body}`;
      setStatus("success");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="border border-azure/40 bg-surface p-10" role="status">
        <p className="eyebrow">Message received</p>
        <h3 className="mt-4 font-display text-title font-medium text-paper">
          Got it. We'll reply within 24 hours — usually much sooner.
        </h3>
        <p className="mt-4 text-body text-paper/60">
          If it's urgent,{" "}
          <a
            href={site.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-azure underline underline-offset-4"
          >
            message us on WhatsApp
          </a>{" "}
          and someone will pick it up now.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full border border-white/15 bg-surface px-4 py-3.5 text-body text-paper placeholder:text-paper/30 transition-colors duration-300 focus:border-azure focus:outline-none";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Honeypot — hidden from people, tempting to bots */}
      <div className="absolute -left-[9999px] top-auto" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="eyebrow mb-2 block text-paper/50">
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className={inputClass}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-2 text-meta text-azure">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="company" className="eyebrow mb-2 block text-paper/50">
            Company
          </label>
          <input id="company" name="company" type="text" autoComplete="organization" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="eyebrow mb-2 block text-paper/50">
          Email *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className={inputClass}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-2 text-meta text-azure">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="need" className="eyebrow mb-2 block text-paper/50">
          What do you need?
        </label>
        <select id="need" name="need" className={inputClass} defaultValue="Not sure yet">
          <optgroup label="Services">
            {services.map((s) => (
              <option key={s.id}>{s.name}</option>
            ))}
          </optgroup>
          <optgroup label="Products">
            {products.map((p) => (
              <option key={p.id}>{p.name}</option>
            ))}
          </optgroup>
          <option>Not sure yet</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="eyebrow mb-2 block text-paper/50">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="What's slowing you down? Rough numbers help — team size, order volume, anything."
          className={inputClass}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-2 text-meta text-azure">
            {errors.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <p role="alert" className="border border-azure/40 bg-surface p-4 text-meta text-paper">
          That didn't send. Try again, or email us directly at{" "}
          <a href={`mailto:${site.emailSales}`} className="text-azure underline underline-offset-4">
            {site.emailSales}
          </a>
          .
        </p>
      )}

      <div className="flex flex-wrap items-center gap-5 pt-2">
        <button type="submit" disabled={status === "sending"} className="btn btn-primary disabled:opacity-60">
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        <p className="font-mono text-label uppercase tracking-[0.14em] text-paper/40">
          {site.responseCommitment}
        </p>
      </div>
    </form>
  );
}
