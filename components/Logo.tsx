import { siteSettings } from "@/lib/data";

/**
 * The Acmevia "AV" monogram, traced as vector geometry so it stays
 * crisp at every size and inherits color via `currentColor`.
 * Angular, slashed — every diagonal cut in the mark runs parallel,
 * and the site's slash motifs are derived from it.
 *
 * To use the original raster logos instead, see HANDOFF.md § Logo.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1030 500"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* A — left leg (full height) */}
      <path fill="currentColor" d="M330 0 L0 500 L100 500 L330 151 Z" />
      {/* A — right leg, cut short by the signature slash */}
      <path fill="currentColor" d="M330 0 L493 248 L443 324 L330 151 Z" />
      {/* A — floating crossbar, slashed both ends */}
      <path fill="currentColor" d="M230 352 L610 352 L544 452 L164 452 Z" />
      {/* Inverted counter triangle */}
      <path fill="currentColor" d="M455 0 L645 0 L550 240 Z" />
      {/* V — checkmark stroke */}
      <path
        stroke="currentColor"
        strokeWidth="68"
        d="M625 160 L700 430 L855 25"
      />
      {/* Twin slashes */}
      <path stroke="currentColor" strokeWidth="26" d="M790 470 L945 65" />
      <path stroke="currentColor" strokeWidth="26" d="M860 470 L1010 78" />
    </svg>
  );
}

/** Mark + wordmark lockup used in the nav and footer.
 *
 * When logo files are uploaded through the CMS (content/settings.json →
 * /admin/), they replace the traced lockup: the dark-bg variant shows on
 * the dark theme, the light-bg variant on light (CSS-swapped via
 * .logo-custom-* so both themes share the same markup). */
export function LogoLockup({
  className = "",
  markClass = "h-6 w-auto",
}: {
  className?: string;
  markClass?: string;
}) {
  const { logo } = siteSettings;
  if (logo.dark) {
    const light = logo.light ?? logo.dark;
    return (
      <span className={`inline-flex items-center ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element -- static export: no image optimizer */}
        <img src={logo.dark} alt={logo.alt} className="logo-custom-dark h-7 w-auto" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={light} alt={logo.alt} className="logo-custom-light h-7 w-auto" />
      </span>
    );
  }
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      {/* brand mark stays true azure in both themes (logos are contrast-exempt) */}
      <LogoMark className={`${markClass} text-azure`} />
      <span className="font-display text-[1.05rem] font-semibold tracking-[0.08em] leading-none">
        ACMEVIA
      </span>
    </span>
  );
}
