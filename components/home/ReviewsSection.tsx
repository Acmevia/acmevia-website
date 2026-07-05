import Link from "next/link";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import ReviewCard from "@/components/ReviewCard";
import { reviews } from "@/lib/data";

/**
 * Landing-page reviews: the CMS entries flagged `featured`, each carrying
 * its source-platform badge. Grid on desktop; a swipeable snap carousel
 * on mobile (.review-track — CSS scroll-snap, no JS, reduced-motion safe).
 */
export default function ReviewsSection() {
  const featured = reviews.filter((r) => r.featured);
  if (featured.length === 0) return null;

  return (
    <section aria-label="Client reviews" className="py-section">
      <div className="container-page">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Reviews</p>
          <h2 className="mt-4 font-display text-display font-semibold text-paper">
            What clients say after go-live.
          </h2>
          <p className="mt-5 text-lead text-paper/60">
            Taken from the platforms where clients wrote them — each card
            links to the original.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="review-track mt-14">
            {featured.map((r) => (
              <ReviewCard key={`${r.name}-${r.company}`} review={r} />
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-12">
          <Magnetic>
            <Link href="/contact/#book" className="btn btn-primary">
              Book a Free Demo
            </Link>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
