import type { Metadata, Viewport } from "next";
import { clashDisplay, switzer, jetbrainsMono } from "./fonts";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import WhatsAppButton from "@/components/WhatsAppButton";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Acmevia — Software built for how your business actually works",
    template: "%s | Acmevia",
  },
  description:
    "Acmevia is a boutique software engineering partner in Sri Lanka. Custom systems and SaaS products — ERP, CRM, LMS, e-commerce, mobile apps — delivered across Asia-Pacific, Europe, the Americas, the Middle East, and Australia.",
  openGraph: {
    type: "website",
    siteName: "Acmevia",
    url: site.url,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.legalName,
  brand: site.name,
  url: site.url,
  logo: `${site.url}/icon.svg`,
  description:
    "Boutique software engineering partner delivering custom systems and SaaS products worldwide from Sri Lanka.",
  address: { "@type": "PostalAddress", addressCountry: "LK" },
  areaServed: [...site.regions],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.emailSales,
      telephone: site.whatsapp.replace(/\s/g, ""),
    },
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: site.emailSupport,
    },
  ],
  sameAs: [site.linkedin, site.facebook],
};

/**
 * Runs before first paint: marks JS as available (scroll-reveal hidden
 * states are scoped to html.js so content is never invisible without it)
 * and resolves the theme — stored choice first, then OS preference,
 * defaulting to dark. Kept inline so there is no flash of wrong theme.
 */
const themeInit = `(function(){try{var d=document.documentElement;d.classList.add("js");var t;try{t=localStorage.getItem("theme")}catch(e){}if(t!=="light"&&t!=="dark"){t=window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}d.setAttribute("data-theme",t);var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",t==="light"?"#ffffff":"#000000")}catch(e){document.documentElement.setAttribute("data-theme","dark")}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${clashDisplay.variable} ${switzer.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:bg-azure focus:px-4 focus:py-2 focus:font-mono focus:text-label focus:uppercase focus:text-azure-ink"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppButton />
        <Cursor />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
