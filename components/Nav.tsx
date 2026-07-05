"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoLockup } from "./Logo";

const links = [
  { href: "/services/", label: "Services" },
  { href: "/products/", label: "Products" },
  { href: "/projects/", label: "Projects" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the overlay on route change and lock scroll while it's open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname === href.replace(/\/$/, "");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled || open
          ? "border-b border-white/10 bg-ink/70 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="container-page flex h-[var(--spacing-nav)] items-center justify-between"
      >
        <Link
          href="/"
          className="relative z-50 text-paper"
          aria-label="Acmevia — home"
        >
          <LogoLockup />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`group relative text-meta font-medium transition-colors duration-300 ${
                    isActive(l.href)
                      ? "text-paper"
                      : "text-paper/60 hover:text-paper"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-azure transition-all duration-500 ease-out-expo ${
                      isActive(l.href) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact/#book"
            className="rounded-full bg-azure px-5 py-2.5 font-mono text-[0.75rem] font-medium uppercase tracking-[0.12em] text-ink transition-shadow duration-400 hover:shadow-[0_0_32px_rgba(0,178,255,0.45)]"
          >
            Book a Free Demo
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative z-50 flex h-11 w-11 items-center justify-center lg:hidden"
        >
          <span className="relative block h-3.5 w-6">
            <span
              className={`absolute left-0 top-0 h-px w-full bg-paper transition-transform duration-400 ease-out-expo ${
                open ? "translate-y-[7px] -rotate-45" : ""
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-px w-full bg-paper transition-transform duration-400 ease-out-expo ${
                open ? "-translate-y-[6px] rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Full-screen overlay menu (mobile) */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 bg-ink transition-opacity duration-500 ease-out-expo lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="container-page flex h-full flex-col justify-center">
          <p className="eyebrow mb-8">Menu</p>
          <ul className="space-y-2">
            {[{ href: "/", label: "Home" }, ...links].map((l, i) => (
              <li
                key={l.href}
                style={{ transitionDelay: open ? `${0.08 + i * 0.06}s` : "0s" }}
                className={`transition-[opacity,transform] duration-700 ease-out-expo ${
                  open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
              >
                <Link
                  href={l.href}
                  className={`font-display text-[2.25rem] font-medium leading-tight tracking-tight ${
                    isActive(l.href) ? "text-azure" : "text-paper"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div
            style={{ transitionDelay: open ? "0.5s" : "0s" }}
            className={`mt-10 transition-opacity duration-700 ${
              open ? "opacity-100" : "opacity-0"
            }`}
          >
            <Link href="/contact/#book" className="btn btn-primary">
              Book a Free Demo
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
