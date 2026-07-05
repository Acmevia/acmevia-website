/**
 * All site content lives here. Replace placeholder projects and
 * testimonials with real data — see HANDOFF.md for instructions.
 */

export const site = {
  name: "Acmevia",
  legalName: "Acmevia Pvt Ltd",
  url: "https://acmevia.com",
  emailSupport: "support@acmevia.com",
  emailSales: "sales@acmevia.com",
  whatsapp: "+94 76 159 2541",
  whatsappLink: "https://wa.me/94761592541",
  linkedin: "https://www.linkedin.com/company/acmevia",
  facebook: "https://www.facebook.com/acmevia",
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
};

export const services: Service[] = [
  {
    id: "custom-web-development",
    index: "01",
    name: "Custom Web Development",
    short: "Systems shaped around your workflow, not the other way round.",
    glyph: "web",
    problem:
      "Off-the-shelf software forces your team to work the way the software wants. The workarounds pile up — spreadsheets on the side, double entry, steps nobody can explain.",
    delivered: [
      "A web application designed around your actual process",
      "Role-based access, reporting, and audit trails",
      "Integrations with the tools you already use",
      "Documentation and training for your team",
    ],
    outcome:
      "One system that matches how you work. Fewer manual steps, fewer errors, and numbers you can trust.",
  },
  {
    id: "mobile-app-development",
    index: "02",
    name: "Mobile App Development",
    short: "Your operation in your team's pocket — online or offline.",
    glyph: "mobile",
    problem:
      "Field teams and customers live on their phones. If your process still needs a desk, a laptop, or a phone call, work waits — and waiting costs money.",
    delivered: [
      "iOS and Android apps from one codebase",
      "Offline-first design for unreliable connections",
      "Push notifications tied to real business events",
      "App Store and Play Store publishing, handled",
    ],
    outcome:
      "Work gets captured where it happens. Same-day data instead of end-of-week paperwork.",
  },
  {
    id: "wordpress-websites",
    index: "03",
    name: "WordPress Websites",
    short: "A fast, editable site your team can run without us.",
    glyph: "wordpress",
    problem:
      "Your website is often the first meeting a client has with you. A slow, dated, or hard-to-edit site quietly loses the deals you never hear about.",
    delivered: [
      "Custom WordPress theme — no page-builder bloat",
      "Editor experience your marketing team can actually use",
      "Speed, SEO, and security hardening as standard",
      "Hosting setup and a maintenance retainer if you want one",
    ],
    outcome:
      "A site that loads fast, ranks properly, and gets updated in minutes — by your own people.",
  },
  {
    id: "ecommerce",
    index: "04",
    name: "E-commerce",
    short: "A store that sells while you sleep — and syncs with your stock.",
    glyph: "ecommerce",
    problem:
      "Selling online fails in the details: stock that doesn't match reality, checkouts that leak buyers, orders retyped into other systems by hand.",
    delivered: [
      "Storefront built for conversion, not decoration",
      "Live inventory sync with your warehouse or ERP",
      "Local and international payment gateways",
      "Order, delivery, and returns workflows",
    ],
    outcome:
      "More completed checkouts, accurate stock, and orders that flow straight into fulfilment.",
  },
  {
    id: "erp-systems",
    index: "05",
    name: "ERP Systems",
    short: "Every department reading from the same numbers.",
    glyph: "erp",
    problem:
      "When finance, inventory, sales, and production each keep their own records, month-end becomes archaeology. Decisions get made on numbers that disagree.",
    delivered: [
      "ERP scoped to your operation — not a bloated suite",
      "Finance, inventory, procurement, and production modules",
      "Migration from spreadsheets and legacy systems",
      "Dashboards for owners, not just accountants",
    ],
    outcome:
      "One source of truth. Month-end closes in days, not weeks, and managers see problems while they're still small.",
  },
  {
    id: "crm-systems",
    index: "06",
    name: "CRM Systems",
    short: "No lead forgotten, no follow-up missed.",
    glyph: "crm",
    problem:
      "Leads arrive by phone, WhatsApp, email, and referral — then live in someone's head. When that person is busy or leaves, the pipeline leaves with them.",
    delivered: [
      "A CRM matched to your actual sales process",
      "Lead capture from every channel in one queue",
      "Automated follow-up reminders and quotation tracking",
      "Pipeline reporting the whole team can see",
    ],
    outcome:
      "Every enquiry tracked to a yes or a no. More deals closed from the leads you already have.",
  },
  {
    id: "business-automation",
    index: "07",
    name: "Business Automation",
    short: "The repetitive 20% of everyone's week, done by software.",
    glyph: "automation",
    problem:
      "Copying data between systems. Chasing approvals. Sending the same report every Monday. Skilled people spend hours on work a machine should do.",
    delivered: [
      "Process audit to find the highest-value automations",
      "Automated data flows between your existing tools",
      "Approval chains, alerts, and scheduled reports",
      "Error handling and logs so nothing fails silently",
    ],
    outcome:
      "Hours back every week, per person. Work moves without being pushed.",
  },
  {
    id: "ui-ux-design",
    index: "08",
    name: "UI/UX Design",
    short: "Software people don't need a manual to use.",
    glyph: "uiux",
    problem:
      "If a system is confusing, people avoid it — and then the data in it stops being true. Adoption is a design problem before it's a training problem.",
    delivered: [
      "User research and journey mapping",
      "Wireframes and clickable prototypes before any code",
      "A design system your product can grow with",
      "Usability testing with your real users",
    ],
    outcome:
      "Tools your team actually uses. Less training, fewer support tickets, cleaner data.",
  },
];

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

export const testimonials = [
  {
    quote:
      "They asked better questions about our business than most people who work in it. The system fits us — we didn't have to fit the system.",
    name: "Operations Director",
    company: "Manufacturing group, Sri Lanka",
  },
  {
    quote:
      "Delivered on the date they named at the start. In this industry that alone would be remarkable. It also just works.",
    name: "Managing Partner",
    company: "Education provider, UAE",
  },
] as const;

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
};

export const projects: Project[] = [
  {
    id: "erp-manufacturing",
    title: "ERP rollout for a mid-size manufacturer",
    client: "Manufacturing",
    region: "Sri Lanka",
    year: "2021",
    solution: "ERP System",
    summary:
      "Finance, inventory, and production were living in seventeen spreadsheets. We built an ERP around their actual flow — from raw material intake to dispatch — and migrated five years of records.",
    metric: { value: "-60%", label: "order-processing time" },
    meta: "MANUFACTURING // SRI LANKA // ERP // 2021",
  },
  {
    id: "ecommerce-retail",
    title: "E-commerce platform for a specialty retailer",
    client: "Retail",
    region: "Australia",
    year: "2022",
    solution: "E-commerce",
    summary:
      "A growing retailer was losing buyers at checkout and overselling stock they didn't have. New storefront, live warehouse sync, and a checkout rebuilt around fewer decisions.",
    metric: { value: "+34%", label: "checkout conversion" },
    meta: "RETAIL // AUSTRALIA // E-COMMERCE // 2022",
  },
  {
    id: "lms-training",
    title: "LMS deployment for a training institute",
    client: "Education",
    region: "Middle East",
    year: "2023",
    solution: "Acmevia LMS",
    summary:
      "Three thousand students, paper registers, and exam results compiled by hand. Acmevia LMS went live in six weeks — white-labelled, with online exams and automated grading.",
    metric: { value: "-80%", label: "administrative workload" },
    meta: "EDUCATION // MIDDLE EAST // LMS // 2023",
  },
  {
    id: "dms-fmcg",
    title: "DMS + Mobile POS for an FMCG distributor",
    client: "Distribution",
    region: "Sri Lanka",
    year: "2023",
    solution: "DMS + Mobile POS",
    summary:
      "Forty routes, two hundred agents, and stock counts that never matched. Field agents got a mobile POS; management got a dashboard that updates by the second.",
    metric: { value: "12,000", label: "units tracked daily, live" },
    meta: "FMCG // SRI LANKA // DMS + POS // 2023",
  },
  {
    id: "hall-university",
    title: "Space management for a university campus",
    client: "Higher education",
    region: "Europe",
    year: "2024",
    solution: "Hall Booking System",
    summary:
      "Ninety bookable spaces managed through a shared inbox. The booking system replaced it with one calendar, approval routing, and utilization reports the estates team runs monthly.",
    metric: { value: "0", label: "double bookings since launch" },
    meta: "EDUCATION // EUROPE // HALL BOOKING // 2024",
  },
  {
    id: "app-logistics",
    title: "Dispatch app for a logistics operator",
    client: "Logistics",
    region: "North America",
    year: "2025",
    solution: "Mobile App",
    summary:
      "Dispatchers coordinated drivers by phone call and printed manifests. A driver app with live job queues and proof-of-delivery replaced the whiteboard.",
    metric: { value: "9min", label: "average dispatch — down from hours" },
    meta: "LOGISTICS // NORTH AMERICA // MOBILE APP // 2025",
  },
];

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
