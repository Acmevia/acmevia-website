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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${clashDisplay.variable} ${switzer.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:bg-azure focus:px-4 focus:py-2 focus:font-mono focus:text-label focus:uppercase focus:text-ink"
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
