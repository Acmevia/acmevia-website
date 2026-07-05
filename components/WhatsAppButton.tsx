import { site } from "@/lib/data";

/**
 * Persistent floating WhatsApp entry point. Brand-strict: azure on ink,
 * no third-party green. Label expands on hover/focus (desktop).
 */
export default function WhatsAppButton() {
  return (
    <a
      href={site.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Message Acmevia on WhatsApp — ${site.whatsapp}`}
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-0 rounded-full border border-azure/40 bg-ink/80 p-3.5 backdrop-blur-md transition-all duration-500 ease-out-expo hover:border-azure hover:shadow-[0_0_36px_rgba(0,178,255,0.35)] md:bottom-8 md:right-8"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="size-6 shrink-0 text-azure"
      >
        <path d="M12.04 2a9.9 9.9 0 0 0-8.57 14.87L2 22l5.27-1.38A9.9 9.9 0 1 0 12.04 2zm0 18.06a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.06.8.82-2.98-.2-.31a8.14 8.14 0 1 1 6.87 3.8zm4.46-6.1c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.53.06-.24-.12-1.03-.38-1.96-1.21-.72-.64-1.21-1.44-1.35-1.68-.14-.24-.02-.37.1-.5.11-.11.25-.28.37-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.65.3-.22.24-.85.83-.85 2.03s.87 2.36 1 2.52c.12.16 1.72 2.62 4.16 3.68.58.25 1.04.4 1.39.51.58.19 1.12.16 1.54.1.47-.07 1.44-.59 1.65-1.16.2-.57.2-1.05.14-1.16-.06-.1-.22-.16-.46-.28z" />
      </svg>
      <span className="max-w-0 overflow-hidden whitespace-nowrap font-mono text-[0.75rem] uppercase tracking-[0.12em] text-paper transition-all duration-500 ease-out-expo group-hover:ml-3 group-hover:max-w-40 group-focus-visible:ml-3 group-focus-visible:max-w-40">
        WhatsApp us
      </span>
    </a>
  );
}
