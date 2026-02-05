"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const LINKS = [
  { label: "Découvrir", href: "#pourquoi" },
  { label: "Infos pratiques", href: "#infos" },
  { label: "Programme", href: "#programme" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [open, setOpen] = useState(false);

  // ✅ Dark dès le départ + plus dense au scroll (aucun blanc/gris)
  const bg = useTransform(scrollY, [0, 140], ["rgba(5,10,18,0.75)", "rgba(5,10,18,0.92)"]);
  const border = useTransform(scrollY, [0, 140], ["rgb(255, 255, 255)", "rgb(255, 255, 255)"]);
  const shadow = useTransform(scrollY, [0, 140], ["0 0 0 rgba(0,0,0,0)", "0 18px 55px rgba(0,0,0,0.55)"]);
  const blurFilter = useTransform(scrollY, [0, 140], ["blur(10px)", "blur(16px)"]);

  // ✅ bloque scroll quand menu mobile ouvert
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // ✅ ferme le menu si l’utilisateur scroll (évite bugs)
  useMotionValueEvent(scrollY, "change", (v: number) => {
    if (open && v > 10) setOpen(false);
  });

  const onLink = (href: string) => {
    setOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.location.hash = href;
    }, 80);
  };

  const DesktopNav = useMemo(() => {
    return (
      <nav className="hidden lg:flex items-center">
        <div className="relative rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur-xl">
          {/* petit glow discret */}
          <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-40" />
          <div className="relative flex items-center gap-1">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative rounded-full px-5 py-2.5 text-sm font-semibold text-white/80 transition hover:text-white"
              >
                <span className="relative z-10">{l.label}</span>
                <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            ))}
          </div>
        </div>
      </nav>
    );
  }, []);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        style={{
          backgroundColor: bg,
          borderBottomColor: border,
          boxShadow: shadow,
          backdropFilter: blurFilter,
          WebkitBackdropFilter: blurFilter,
        }}
      >
        {/* ligne brillante très fine */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <div className="container h-[78px] flex items-center justify-between">
          {/* ✅ LOGO IMAGE (tu as demandé d’enlever le texte) */}
          <a href="#" className="flex items-center" aria-label="Accueil">
            <Image
              src="/logoiut.png"
              alt="Logo IUT / UGE"
              width={320}
              height={90}
              priority
              className="h-10 w-auto sm:h-11 md:h-12 object-contain"
            />
          </a>

          {DesktopNav}

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-extrabold text-white
                         border border-white/15 bg-white/10 hover:bg-white/15 transition"
            >
              Contact
            </a>

            {/* burger mobile */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="lg:hidden h-11 w-11 rounded-2xl border border-white/15 bg-white/10 text-white grid place-items-center hover:bg-white/15 transition"
              aria-label="Ouvrir le menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M5 17h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      {/* MENU MOBILE */}
      <AnimatePresence>
        {open && (
          <>
            {/* backdrop */}
            <motion.button
              type="button"
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              aria-label="Fermer"
            />

            {/* panel bottom-sheet (meilleur sur iPhone) */}
            <motion.aside
              className="fixed inset-0 z-[70] flex items-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              role="dialog"
              aria-modal="true"
            >
              <motion.div
                className="w-full rounded-t-[28px] bg-[#050A12] border-t border-white/10"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
                transition={{ duration: 0.22 }}
              >
                <div className="container pt-5 pb-7">
                  {/* grabber */}
                  <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-white/15" />

                  <div className="flex items-center justify-between gap-3">
                    <Image
                      src="/logoiut.png"
                      alt="Logo IUT / UGE"
                      width={260}
                      height={80}
                      className="h-10 w-auto object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="h-11 w-11 rounded-2xl border border-white/15 bg-white/10 text-white grid place-items-center hover:bg-white/15 transition"
                      aria-label="Fermer le menu"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="mt-5 grid gap-3">
                    {LINKS.map((l) => (
                      <button
                        key={l.href}
                        type="button"
                        onClick={() => onLink(l.href)}
                        className="text-left rounded-3xl px-5 py-4 border border-white/10 bg-white/5 hover:bg-white/8 transition"
                      >
                        <div className="text-white font-extrabold text-lg">{l.label}</div>
                        <div className="text-white/55 text-sm mt-1">Aller à la section</div>
                      </button>
                    ))}

                    <button
                      type="button"
                      onClick={() => onLink("#contact")}
                      className="text-left rounded-3xl px-5 py-4 border border-white/15 bg-white/10 hover:bg-white/14 transition"
                    >
                      <div className="text-white font-extrabold text-lg">Contact</div>
                      <div className="text-white/60 text-sm mt-1">Email / téléphone</div>
                    </button>
                  </div>

                  <div className="mt-6 text-xs text-white/45">
                    Journée Portes Ouvertes — IUT de Meaux
                  </div>
                </div>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* spacer */}
      <div className="h-[78px]" />
    </>
  );
}
