import type { Review, ReviewPlatform } from "@/lib/data";

/* Platform badge icons — small, monochrome, inherit currentColor. */
const platformPaths: Record<ReviewPlatform, string> = {
  facebook:
    "M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.89v2.26h3.32l-.53 3.49h-2.79V24C19.61 23.09 24 18.1 24 12.07z",
  google:
    "M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.4 3.62v3h3.87c2.27-2.09 3.58-5.17 3.58-8.81zM12 24c3.24 0 5.96-1.07 7.94-2.91l-3.87-3.01c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.28v3.1A12 12 0 0 0 12 24zM5.27 14.27a7.2 7.2 0 0 1 0-4.54v-3.1H1.28a12 12 0 0 0 0 10.74l3.99-3.1zM12 4.77c1.77 0 3.35.61 4.6 1.8l3.44-3.44A11.97 11.97 0 0 0 12 0 12 12 0 0 0 1.28 6.63l3.99 3.1C6.22 6.88 8.87 4.77 12 4.77z",
  instagram:
    "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.35 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.42.16-1.06.35-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.35-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.35 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.9 5.9 0 0 0-2.13 1.38A5.9 5.9 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13a5.9 5.9 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm7.85-10.4a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44z",
  linkedin:
    "M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-7.9c0-1.88-.03-4.3-2.62-4.3-2.63 0-3.03 2.05-3.03 4.17V23H8V8z",
  other:
    "M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0zm0 22a10 10 0 1 1 10-10 10 10 0 0 1-10 10zm1-15h-2v6l5.25 3.15 1-1.65-4.25-2.5z",
};

const platformNames: Record<ReviewPlatform, string> = {
  facebook: "Facebook",
  google: "Google Reviews",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  other: "Review",
};

function Stars({ rating }: { rating: number }) {
  return (
    <span
      className="review-stars"
      role="img"
      aria-label={`Rated ${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          viewBox="0 0 20 20"
          aria-hidden="true"
          className={`size-3.5 ${n <= rating ? "" : "opacity-25"}`}
          fill="currentColor"
        >
          <path d="M10 1.5l2.47 5.29 5.8.71-4.28 3.98 1.12 5.72L10 14.4l-5.11 2.8 1.12-5.72L1.73 7.5l5.8-.71z" />
        </svg>
      ))}
    </span>
  );
}

function Avatar({ review }: { review: Review }) {
  if (review.avatar) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- static export: no image optimizer
      <img
        src={review.avatar}
        alt={review.avatarAlt || ""}
        width={44}
        height={44}
        loading="lazy"
        className="size-11 shrink-0 rounded-full border border-paper/10 object-cover"
      />
    );
  }
  const initials = review.name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <span
      aria-hidden="true"
      className="flex size-11 shrink-0 items-center justify-center rounded-full border border-azure/30 bg-azure/10 font-mono text-[0.75rem] tracking-wide text-azure-text"
    >
      {initials}
    </span>
  );
}

/** One review: avatar, author, stars, quote, source-platform badge. */
export default function ReviewCard({ review }: { review: Review }) {
  const badge = (
    <>
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
        <path d={platformPaths[review.platform]} />
      </svg>
      <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em]">
        {platformNames[review.platform]}
      </span>
    </>
  );

  return (
    <article className="flex h-full flex-col border border-paper/10 bg-surface p-7 transition-colors duration-300 hover:border-azure/40">
      <div className="flex items-center gap-4">
        <Avatar review={review} />
        <div className="min-w-0">
          <p className="truncate text-body font-medium text-paper">{review.name}</p>
          <p className="truncate text-meta text-paper/50">{review.company}</p>
        </div>
      </div>
      <div className="mt-5">
        <Stars rating={review.rating} />
      </div>
      <blockquote className="mt-4 flex-1 text-body text-paper/75">
        “{review.quote}”
      </blockquote>
      <footer className="mt-6 border-t border-paper/10 pt-4">
        {review.url ? (
          <a
            href={review.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 text-paper/50 transition-colors duration-300 hover:text-azure-text"
            aria-label={`Read the original review on ${platformNames[review.platform]}`}
          >
            {badge}
          </a>
        ) : (
          <span className="inline-flex min-h-11 items-center gap-2 text-paper/50">
            {badge}
          </span>
        )}
      </footer>
    </article>
  );
}
