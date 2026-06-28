import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CATEGORIES, CATEGORY_ORDER, type Category } from "../data/menu";
import BlurText from "../components/BlurText";
import HabibiLogo from "../components/HabibiLogo";
import { ArrowLeft, ArrowUpRight, Phone } from "../components/icons";

export default function MenuPage() {
  const { slug } = useParams<{ slug: string }>();
  useEffect(() => window.scrollTo(0, 0), [slug]);

  if (!slug || !(slug in CATEGORIES)) {
    return <Navigate to="/" replace />;
  }
  const info = CATEGORIES[slug as Category];

  return (
    <main className={`min-h-screen bg-gradient-to-b ${info.bg} pb-24`}>
      <div className="waffle-texture pointer-events-none fixed inset-0 opacity-15" />

      {/* top bar */}
      <header className="relative z-10 flex items-center justify-between px-5 py-5 md:px-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full liquid-glass px-4 py-2 font-body text-sm text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        <HabibiLogo className="h-12 w-12" rings={false} />
        <a
          href="tel:03114444237"
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-body text-sm font-semibold text-black"
        >
          <Phone className="h-4 w-4" /> Order
        </a>
      </header>

      {/* hero */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pt-12 text-center">
        <span className={`font-body text-xs uppercase tracking-[0.35em] ${info.accent}`}>
          {info.kicker}
        </span>
        <BlurText
          text={info.title}
          className={`mt-4 font-heading italic text-6xl leading-[0.9] tracking-[-2px] md:text-8xl ${info.accent}`}
        />
        <p className="mx-auto mt-6 max-w-2xl font-body text-base font-light text-white/85">
          {info.blurb}
        </p>
      </section>

      {/* products */}
      <section className="relative z-10 mx-auto mt-16 grid max-w-5xl gap-5 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {info.products.map((p, i) => (
          <motion.article
            key={p.name}
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            className="flex min-h-[180px] flex-col rounded-[1.25rem] liquid-glass p-6"
          >
            {p.tag && (
              <span className={`mb-3 self-start rounded-full liquid-glass px-3 py-1 font-body text-[11px] ${info.accent}`}>
                {p.tag}
              </span>
            )}
            <h3 className="font-heading italic text-2xl tracking-[-0.5px] text-white md:text-3xl">
              {p.name}
            </h3>
            <p className="mt-2 font-body text-sm font-light leading-snug text-white/80">
              {p.desc}
            </p>
            <div className="mt-auto flex items-center justify-between pt-5">
              <span className={`font-heading italic text-2xl ${info.accent}`}>
                {p.price}
              </span>
              <a
                href="tel:03114444237"
                className="inline-flex items-center gap-1.5 rounded-full liquid-glass-strong px-4 py-2 font-body text-xs font-medium text-white"
              >
                Order <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.article>
        ))}
      </section>

      {/* switch category */}
      <section className="relative z-10 mx-auto mt-20 max-w-5xl px-6 text-center">
        <p className="font-body text-xs uppercase tracking-[0.3em] text-white/50">
          Explore the other menus
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          {CATEGORY_ORDER.filter((s) => s !== slug).map((s) => (
            <Link
              key={s}
              to={`/menu/${s}`}
              className="inline-flex items-center gap-2 rounded-full liquid-glass px-5 py-3 font-body text-sm text-white"
            >
              {CATEGORIES[s].title}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
