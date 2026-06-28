import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Phone } from "./icons";

const MENUS = [
  { label: "Waffle & Dessert", to: "/menu/waffle" },
  { label: "Chinese", to: "/menu/chinese" },
  { label: "Broast · Pizza · Wraps", to: "/menu/fastfood" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-[70] transition-all duration-300 ${
        scrolled
          ? "bg-toon-ink/90 shadow-[0_2px_24px_rgba(0,0,0,0.35)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
        {/* brand */}
        <a href="#hero" className="flex items-center gap-2.5">
          <img
            src="/images/logo-waffle.webp"
            alt="Habibi Waffle"
            className="h-10 w-10"
            draggable={false}
          />
          <img
            src="/images/logo-habibi-light.webp"
            alt="Häbibi"
            className="h-5 w-auto sm:h-6"
            draggable={false}
          />
        </a>

        {/* desktop links */}
        <div className="hidden items-center gap-7 md:flex">
          <a
            href="#offer"
            className="font-body text-sm font-semibold uppercase tracking-wide text-white/85 transition-colors hover:text-white"
          >
            What we offer
          </a>

          {/* Menus dropdown */}
          <div className="group relative">
            <button className="flex items-center gap-1 font-body text-sm font-semibold uppercase tracking-wide text-white/85 transition-colors hover:text-white">
              Menus <ChevronDown className="h-4 w-4" />
            </button>
            <div className="invisible absolute left-1/2 top-full w-56 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <div className="overflow-hidden rounded-2xl bg-toon-ink/95 p-2 shadow-toon backdrop-blur-md cartoon-border-white">
                {MENUS.map((m) => (
                  <Link
                    key={m.to}
                    to={m.to}
                    className="block rounded-xl px-4 py-2.5 font-body text-sm font-medium text-white/90 transition-colors hover:bg-white/10"
                  >
                    {m.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <a
            href="#visit"
            className="font-body text-sm font-semibold uppercase tracking-wide text-white/85 transition-colors hover:text-white"
          >
            Visit
          </a>

          <a
            href="tel:03114444237"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 font-body text-sm font-bold uppercase tracking-wide text-toon-ink shadow-toon-sm transition-transform duration-150 hover:scale-105"
          >
            <Phone className="h-4 w-4" /> Order
          </a>
        </div>

        {/* mobile toggle */}
        <button
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span
            className={`h-0.5 w-6 bg-white transition-all ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span className={`h-0.5 w-6 bg-white transition-all ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-0.5 w-6 bg-white transition-all ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* mobile panel */}
      <div
        className={`overflow-hidden bg-toon-ink/95 backdrop-blur-md transition-[max-height] duration-300 md:hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-5 py-4">
          <a
            href="#offer"
            onClick={() => setOpen(false)}
            className="rounded-xl px-3 py-3 font-body text-sm font-semibold uppercase tracking-wide text-white/90 hover:bg-white/10"
          >
            What we offer
          </a>
          {MENUS.map((m) => (
            <Link
              key={m.to}
              to={m.to}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 font-body text-sm font-medium text-white/85 hover:bg-white/10"
            >
              {m.label}
            </Link>
          ))}
          <a
            href="#visit"
            onClick={() => setOpen(false)}
            className="rounded-xl px-3 py-3 font-body text-sm font-semibold uppercase tracking-wide text-white/90 hover:bg-white/10"
          >
            Visit
          </a>
          <a
            href="tel:03114444237"
            className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-body text-sm font-bold uppercase tracking-wide text-toon-ink"
          >
            <Phone className="h-4 w-4" /> Order now
          </a>
        </div>
      </div>
    </nav>
  );
}
