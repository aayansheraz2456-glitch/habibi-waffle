import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CATEGORIES, CATEGORY_ORDER, type Category } from "../data/menu";
import FoodModel from "../components/FoodModel";
import Grain from "../components/Grain";
import { ArrowLeft, ArrowRight, Phone } from "../components/icons";

const LOGO: Record<Category, { src: string; cls: string }> = {
  waffle: { src: "/images/logo-waffle.webp", cls: "h-10 w-10" },
  chinese: { src: "/images/logo-habibi-light.webp", cls: "h-7 w-auto" },
  fastfood: { src: "/images/logo-h.webp", cls: "h-10 w-10" },
};

export default function MenuPage() {
  const { slug } = useParams<{ slug: string }>();
  useEffect(() => window.scrollTo(0, 0), [slug]);

  if (!slug || !(slug in CATEGORIES)) {
    return <Navigate to="/" replace />;
  }
  const info = CATEGORIES[slug as Category];

  return (
    <main
      className="relative min-h-screen overflow-hidden pb-24"
      style={{ backgroundColor: info.color }}
    >
      <Grain className="z-[1] fixed" opacity={0.35} />

      {/* giant ghost word */}
      <span
        className="pointer-events-none absolute left-1/2 top-[14%] z-0 -translate-x-1/2 select-none font-display uppercase leading-none text-white/[0.13]"
        style={{ fontSize: "clamp(90px, 24vw, 340px)", letterSpacing: "-0.02em" }}
      >
        {info.word}
      </span>

      {/* top bar */}
      <header className="relative z-[60] flex items-center justify-between px-4 py-5 sm:px-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-body text-sm font-bold uppercase tracking-wide text-toon-ink shadow-toon-sm transition-transform duration-150 hover:scale-105"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        <img
          src={LOGO[info.slug].src}
          alt={`Habibi ${info.title}`}
          className={`${LOGO[info.slug].cls} object-contain`}
          draggable={false}
        />
        <a
          href="tel:03114444237"
          className="inline-flex items-center gap-2 rounded-full bg-toon-ink px-4 py-2 font-body text-sm font-bold uppercase tracking-wide text-white shadow-toon-sm transition-transform duration-150 hover:scale-105"
        >
          <Phone className="h-4 w-4" /> Order
        </a>
      </header>

      {/* hero */}
      <section className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pt-6 text-center">
        <FoodModel
          slug={info.slug}
          className="h-[40vh] w-[40vh] max-w-[86vw]"
        />
        <p className="mt-4 font-body text-xs font-bold uppercase tracking-[0.3em] text-white/85">
          {info.kicker}
        </p>
        <h1
          className="mt-2 font-display uppercase leading-[0.9] text-white"
          style={{ fontSize: "clamp(44px, 9vw, 110px)", letterSpacing: "-0.01em" }}
        >
          {info.title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl font-body text-base font-medium text-white/90">
          {info.blurb}
        </p>
      </section>

      {/* products */}
      <section className="relative z-10 mx-auto mt-14 grid max-w-5xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {info.products.map((p, i) => (
          <motion.article
            key={p.name}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
            className="toon-card flex min-h-[190px] flex-col rounded-[1.5rem] p-6"
            style={{ backgroundColor: info.panel }}
          >
            {p.tag && (
              <span className="mb-3 self-start rounded-full bg-toon-ink px-3 py-1 font-body text-[11px] font-bold uppercase tracking-wide text-white">
                {p.tag}
              </span>
            )}
            <h3 className="font-round text-2xl font-extrabold leading-tight text-white">
              {p.name}
            </h3>
            <p className="mt-2 font-body text-sm font-medium leading-snug text-white/90">
              {p.desc}
            </p>
            <div className="mt-auto flex items-center justify-between pt-5">
              <span className="font-display text-3xl text-white">{p.price}</span>
              <a
                href="tel:03114444237"
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 font-body text-xs font-bold uppercase tracking-wide text-toon-ink shadow-toon-sm transition-transform duration-150 hover:scale-105"
              >
                Order <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.article>
        ))}
      </section>

      {/* switch category */}
      <section className="relative z-10 mx-auto mt-20 max-w-5xl px-6 text-center">
        <p className="font-body text-xs font-bold uppercase tracking-[0.3em] text-white/80">
          Explore the other menus
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-4">
          {CATEGORY_ORDER.filter((s) => s !== slug).map((s) => (
            <Link
              key={s}
              to={`/menu/${s}`}
              className="toon-card inline-flex items-center gap-2 rounded-full px-6 py-3 font-round text-base font-bold text-white transition-transform duration-150 hover:scale-105"
              style={{ backgroundColor: CATEGORIES[s].color }}
            >
              {CATEGORIES[s].title}
              <ArrowRight className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
