import { MapPin, Phone, Star } from "./icons";
import HabibiLogo from "./HabibiLogo";

export default function Footer() {
  return (
    <footer id="visit" className="relative bg-black px-6 py-20">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
        <HabibiLogo className="h-28 w-28" />

        <h2 className="font-heading italic text-4xl tracking-[-1px] text-white md:text-5xl">
          Come say <span className="font-brand text-habibi-magenta">Habibi</span>
        </h2>

        <div className="grid w-full gap-4 sm:grid-cols-3">
          <div className="flex flex-col items-center gap-2 rounded-2xl liquid-glass p-6">
            <MapPin className="h-6 w-6 text-habibi-magenta" />
            <p className="font-body text-sm text-white/85">
              Shop No 1, Block A, Pak-Arab Housing Scheme, Lahore 54000
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-2xl liquid-glass p-6">
            <Phone className="h-6 w-6 text-habibi-gold" />
            <p className="font-body text-sm text-white/85">
              Home delivery
              <br />
              <a href="tel:03114444237" className="font-semibold text-white">
                0311 4444237
              </a>
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-2xl liquid-glass p-6">
            <Star className="h-6 w-6 text-habibi-gold" />
            <p className="font-body text-sm text-white/85">
              3.9 &#9733; on Google
              <br />
              234 reviews &middot; Open till 9pm
            </p>
          </div>
        </div>

        <p className="font-body text-xs uppercase tracking-[0.3em] text-white/40">
          &copy; {new Date().getFullYear()} Habibi Waffle &middot; Lahore
        </p>
      </div>
    </footer>
  );
}
