import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import ServicesPreview from "@/components/home/ServicesPreview";
import ProductsPreview from "@/components/home/ProductsPreview";
import ProcessSection from "@/components/home/ProcessSection";
import OutcomeBand from "@/components/home/OutcomeBand";
import ReviewsSection from "@/components/home/ReviewsSection";
import FinalCta from "@/components/FinalCta";

export const metadata: Metadata = {
  title: "Acmevia — Software built for how your business actually works",
  description:
    "Boutique software engineering from Sri Lanka. Custom systems, ERP, CRM, e-commerce, mobile apps, and SaaS products delivered across five regions. Book a free demo.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServicesPreview />
      <ProductsPreview />
      <ProcessSection />
      <OutcomeBand />
      <ReviewsSection />
      <FinalCta />
    </>
  );
}
