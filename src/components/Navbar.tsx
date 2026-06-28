import { Link } from "react-router-dom";
import { Phone } from "./icons";

export default function Navbar() {
  return (
    <nav className="fixed left-0 right-0 top-4 z-50 flex items-center justify-between px-5 md:px-10">
      <Link
        to="/"
        className="grid h-12 place-items-center rounded-full liquid-glass px-5 font-brand text-xl text-habibi-magenta"
      >
        Habibi
      </Link>

      <div className="hidden items-center gap-1 rounded-full liquid-glass px-1.5 py-1.5 md:flex">
        <a href="#story" className="px-3 py-2 font-body text-sm font-medium text-white/90">
          Story
        </a>
        <a href="#menus" className="px-3 py-2 font-body text-sm font-medium text-white/90">
          Menus
        </a>
        <a href="#visit" className="px-3 py-2 font-body text-sm font-medium text-white/90">
          Visit
        </a>
        <a
          href="tel:03114444237"
          className="ml-1 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-body text-sm font-semibold text-black"
        >
          <Phone className="h-4 w-4" /> Order
        </a>
      </div>

      <a
        href="tel:03114444237"
        className="grid h-12 w-12 place-items-center rounded-full liquid-glass text-white md:hidden"
        aria-label="Call to order"
      >
        <Phone className="h-5 w-5" />
      </a>
    </nav>
  );
}
