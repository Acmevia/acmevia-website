/**
 * Site content hub. Services, projects, reviews, and the logo are
 * CMS-managed: they live in /content/*.json (edited at /admin/ — see
 * CMS_GUIDE.md) and are re-exported from here so every component keeps
 * one import path. Everything else (products, process, stats, copy)
 * stays in this file — see HANDOFF.md.
 */

import servicesJson from "@/content/services.json";
import projectsJson from "@/content/projects.json";
import reviewsJson from "@/content/reviews.json";
import settingsJson from "@/content/settings.json";

export const site = {
  name: "Acmevia",
  legalName: "Acmevia Pvt Ltd",
  url: "https://acmevia.com",
  emailSupport: "support@acmevia.com",
  emailSales: "sales@acmevia.com",
  whatsapp: "+94 76 159 2541",
  whatsappLink: "https://wa.me/94761592541",
  linkedin: "https://www.linkedin.com/company/acmevia",
  facebook: "https://www.facebook.com/profile.php?id=61590874711928",
  regions: ["Asia-Pacific", "Europe", "North America", "Middle East", "Australia"],
  responseCommitment: "We reply within 24 hours.",
} as const;

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export type Service = {
  id: string;
  index: string;
  name: string;
  short: string; // one-line outcome for list rows
  problem: string;
  delivered: string[];
  outcome: string;
  glyph: "web" | "mobile" | "wordpress" | "ecommerce" | "erp" | "crm" | "automation" | "uiux";
  /** optional CMS-uploaded illustration; the line-art glyph is the fallback */
  image?: { src: string; alt: string };
};

export const services: Service[] = servicesJson.items.map((s, i) => ({
  ...s,
  index: String(i + 1).padStart(2, "0"),
  image: s.image && s.image.src ? s.image : undefined,
})) as Service[];

/* ------------------------------------------------------------------ */
/* Products                                                            */
/* ------------------------------------------------------------------ */

export type Product = {
  id: string;
  name: string;
  audience: string;
  tagline: string;
  description: string;
  features: { title: string; detail: string }[];
  keyClaim: string;
  pricingNote: string;
  mock: "lms" | "hall" | "dms";
};

export const products: Product[] = [
  {
    id: "lms",
    name: "Acmevia LMS",
    audience: "Schools · Universities · Tuition classes · Training centers",
    tagline: "Run your entire institute from one screen.",
    description:
      "A cloud-based learning management system for institutions that are done with paper registers and WhatsApp groups. Fully white-label — your name, your logo, your domain.",
    features: [
      {
        title: "Student & course management",
        detail: "Enrolment, batches, attendance, and fee tracking in one place.",
      },
      {
        title: "Online exams with automated grading",
        detail: "Set papers once. Marking, grading, and result sheets happen on their own.",
      },
      {
        title: "Secure portals for every role",
        detail: "Students, teachers, parents, and admins each see exactly what they need.",
      },
      {
        title: "Works on any device",
        detail: "Fully responsive — most students will use it on a phone, so it's built for one.",
      },
      {
        title: "White-label & customizable",
        detail: "Your brand on the door. Modules shaped to how your institute runs.",
      },
    ],
    keyClaim: "Cuts administrative work by up to 80%.",
    pricingNote: "Plans from a simple monthly fee per institute — or request a custom quote.",
    mock: "lms",
  },
  {
    id: "hall-booking",
    name: "Hall Booking & Space Management",
    audience: "Corporations · Universities · Hotels · Public institutions",
    tagline: "Every room, every hour, one calendar.",
    description:
      "A reservation system for organizations juggling multiple venues, halls, and meeting rooms. No more double bookings, phone-call chains, or paper diaries at the front desk.",
    features: [
      {
        title: "Multi-venue calendar",
        detail: "All spaces visible at once. Conflicts are impossible, not just unlikely.",
      },
      {
        title: "Approval workflows",
        detail: "Requests route to the right approver with one tap — with a full audit trail.",
      },
      {
        title: "Resources & setup requirements",
        detail: "Projectors, catering, seating layouts — attached to the booking, not to memory.",
      },
      {
        title: "Billing & utilization reports",
        detail: "See which spaces earn their keep and which sit empty.",
      },
    ],
    keyClaim: "Double bookings drop to zero from day one.",
    pricingNote: "Priced per venue portfolio — request a custom quote.",
    mock: "hall",
  },
  {
    id: "dms",
    name: "Distribution Management System + Mobile POS",
    audience: "FMCG distributors · Wholesalers · Field sales operations",
    tagline: "Know where every unit, rupee, and rep is — right now.",
    description:
      "Real-time tracking of every unit, transaction, and agent in your distribution network. A mobile POS app for field agents, a live dashboard for management.",
    features: [
      {
        title: "Field-agent mobile POS",
        detail: "Orders, invoicing, and payments captured at the shopfront — even offline.",
      },
      {
        title: "Live management dashboard",
        detail: "Sales, stock, and agent activity by route, region, and SKU as it happens.",
      },
      {
        title: "Inventory across the chain",
        detail: "Warehouse to van to shelf. Stock variance stops being a mystery.",
      },
      {
        title: "Route planning & agent tracking",
        detail: "Who visited which outlet, when, and what was sold or returned.",
      },
      {
        title: "Credit & collections control",
        detail: "Outstanding balances per outlet, with limits enforced at the point of sale.",
      },
    ],
    keyClaim: "End-of-day reporting becomes any-second reporting.",
    pricingNote: "Licensed per agent and warehouse — request a custom quote.",
    mock: "dms",
  },
];

/* ------------------------------------------------------------------ */
/* Process                                                             */
/* ------------------------------------------------------------------ */

export const processSteps = [
  { step: "01", title: "Requirement analysis", detail: "We sit with the people who do the work and map what actually happens." },
  { step: "02", title: "Scope", detail: "A written scope with clear boundaries. You know what you're getting and when." },
  { step: "03", title: "UI/UX design", detail: "Clickable prototypes first. You approve screens before we write code." },
  { step: "04", title: "Sprint development", detail: "Working software every two weeks — not a big reveal at the end." },
  { step: "05", title: "Quality assurance", detail: "Tested against your real scenarios, your real data, your worst days." },
  { step: "06", title: "Client review", detail: "You and your team try it. We adjust until it fits." },
  { step: "07", title: "Deployment", detail: "A planned go-live with data migration and zero-drama cutover." },
  { step: "08", title: "Maintenance", detail: "Monitoring, updates, and support — we stay after the launch." },
] as const;

/* ------------------------------------------------------------------ */
/* Stats                                                               */
/* ------------------------------------------------------------------ */

export const stats = [
  { value: 40, suffix: "+", label: "Projects delivered" },
  { value: 9, suffix: "", label: "Industries served" },
  { value: 5, suffix: "", label: "Regions worldwide" },
  { value: 24, suffix: "h", label: "Support response SLA", prefix: "<" },
] as const;

/* ------------------------------------------------------------------ */
/* Outcomes / testimonials (placeholders — replace with real data)     */
/* ------------------------------------------------------------------ */

export const outcomes = [
  {
    problem: "Order processing took a full day of retyping between systems.",
    outcome: "Cut to under an hour with an ERP shaped to the workflow.",
  },
  {
    problem: "A training institute drowning in admissions paperwork.",
    outcome: "Admin workload down 80% after moving onto Acmevia LMS.",
  },
  {
    problem: "A distributor flying blind between month-end reports.",
    outcome: "Live visibility of 12,000 units a day across 40 routes.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Reviews (CMS-managed — content/reviews.json, edited at /admin/)     */
/* ------------------------------------------------------------------ */

export type ReviewPlatform = "facebook" | "google" | "instagram" | "linkedin" | "other";

export type Review = {
  name: string;
  role: string;
  company: string;
  avatar?: string; // /uploads/… — initials avatar renders when empty
  avatarAlt?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  platform: ReviewPlatform;
  url?: string; // link to the original review
  featured: boolean; // featured → landing-page reviews section
};

export const reviews: Review[] = reviewsJson.items.map((r) => ({
  ...r,
  avatar: r.avatar || undefined,
  url: r.url || undefined,
})) as Review[];

/** Pull quotes for the outcomes band: the non-featured reviews (the
 *  featured set already headlines the reviews section below it). */
export const testimonials = reviews
  .filter((r) => !r.featured)
  .slice(0, 2)
  .map((r) => ({ quote: r.quote, name: r.name, company: r.company }));

/* ------------------------------------------------------------------ */
/* Site settings (CMS-managed — content/settings.json)                 */
/* ------------------------------------------------------------------ */

export const siteSettings = {
  logo: {
    /** dark-bg variant (shown on the dark theme) */
    dark: settingsJson.logo.dark || undefined,
    /** light-bg variant (shown on the light theme; falls back to dark) */
    light: settingsJson.logo.light || undefined,
    alt: settingsJson.logo.alt || "Acmevia",
  },
};

/* ------------------------------------------------------------------ */
/* Projects timeline (placeholders — replace with real engagements)    */
/* ------------------------------------------------------------------ */

export type Project = {
  id: string;
  title: string;
  client: string; // industry descriptor, not a name
  region: string;
  year: string;
  solution: string;
  summary: string;
  metric: { value: string; label: string };
  meta: string; // typed-in ticker line
  /** optional CMS-uploaded gallery; the first image shows on the card */
  images?: { src: string; alt: string }[];
};

export const projects: Project[] = projectsJson.items.map((p) => ({
  ...p,
  images: p.images && p.images.length ? p.images : undefined,
})) as Project[];

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const capabilities = [
  {
    title: "Business Development",
    detail: "The people who translate your problem into a scope worth signing.",
  },
  {
    title: "Architecture & Infrastructure",
    detail: "Systems designed to be boring in the best way — stable, secure, scalable.",
  },
  {
    title: "Full-stack Engineering",
    detail: "Web, mobile, and integrations. The team that builds the thing.",
  },
  {
    title: "Project Management & QA",
    detail: "Deadlines kept, scope defended, defects found before you find them.",
  },
] as const;

export const values = [
  {
    title: "Partnership over projects",
    detail:
      "We'd rather run your systems for years than hand over a zip file and disappear. Most of our work is repeat work.",
  },
  {
    title: "Systems and SOPs",
    detail:
      "Every engagement runs on a written process — the same one that got the last forty projects delivered on time.",
  },
  {
    title: "Automation-first operations",
    detail:
      "We automate our own work before we sell automation to anyone else. If a step can be a script, it becomes one.",
  },
] as const;
