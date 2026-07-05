import Reveal from "./Reveal";

/** Standard section opener: mono eyebrow, display heading, optional lead. */
export default function SectionHead({
  eyebrow,
  title,
  lead,
  light = false,
  className = "",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={`max-w-3xl ${className}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2
        className={`mt-4 font-display text-display font-semibold ${
          light ? "text-ink" : "text-paper"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p className={`mt-5 text-lead ${light ? "text-ink/70" : "text-paper/60"}`}>
          {lead}
        </p>
      )}
    </Reveal>
  );
}
