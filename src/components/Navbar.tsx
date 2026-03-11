"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";

const LINKS = [
  { label: "Découvrir", href: "#pourquoi" },
  { label: "Infos pratiques", href: "#infos" },
  { label: "Programme", href: "#programme" },
  { label: "Après JPO", href: "#apres-jpo" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [open, setOpen] = useState(false);

  const alpha = useTransform(scrollY, [0, 140], [0.74, 0.92]);
  const blur = useTransform(scrollY, [0, 140], [10, 18]);
  const shadow = useTransform(
    scrollY,
    [0, 140],
    ["0 8px 30px rgba(0,0,0,0.22)", "0 18px 55px rgba(0,0,0,0.50)"]
  );

  const bg = useMotionTemplate`rgba(5, 10, 18, ${alpha})`;
  const blurFilter = useMotionTemplate`blur(${blur}px)`;

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const onLink = (href: string) => {
    setOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.location.hash = href;
    }, 80);
  };

  return (
    <>
      <motion.header className="fixed inset-x-0 top-0 z-50 px-3 sm:px-6">
        <motion.div
          style={{
            backgroundColor: bg,
            boxShadow: shadow,
            backdropFilter: blurFilter,
            WebkitBackdropFilter: blurFilter,
          }}
          className="mx-auto mt-3 max-w-7xl rounded-2xl border border-white/10"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          <div className="container h-[78px] flex items-center justify-between">
            <a href="#" className="flex items-center" aria-label="Accueil">
              <Image
                src="/logoiut.png"
                alt="Logo IUT / UGE"
                width={320}
                height={90}
                priority
                className="h-10 w-auto object-contain sm:h-11 md:h-12"
              />
            </a>

            <nav className="hidden lg:flex items-center rounded-full border border-white/10 bg-white/5 p-1.5">
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
            </nav>

            <div className="flex items-center gap-2">
              <a
                href="#contact"
                className="hidden sm:inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-extrabold text-white transition hover:bg-white/15"
              >
                Contact
              </a>

              <button
                type="button"
                onClick={() => setOpen(true)}
                className="grid h-11 w-11 place-items-center rounded-2xl border border-white/15 bg-white/10 text-white transition hover:bg-white/15 lg:hidden"
                aria-label="Ouvrir le menu"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M5 7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M5 17h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              aria-label="Fermer"
            />

            <motion.aside
              className="fixed inset-0 z-[70] flex items-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              role="dialog"
              aria-modal="true"
            >
              <motion.div
                className="w-full rounded-t-[28px] border-t border-white/10 bg-[#050A12]"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
                transition={{ duration: 0.22 }}
              >
                <div className="container pt-5 pb-7">
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
                      className="grid h-11 w-11 place-items-center rounded-2xl border border-white/15 bg-white/10 text-white transition hover:bg-white/15"
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
                        className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-left transition hover:bg-white/8"
                      >
                        <div className="text-lg font-extrabold text-white">{l.label}</div>
                        <div className="mt-1 text-sm text-white/55">Aller à la section</div>
                      </button>
                    ))}

                    <button
                      type="button"
                      onClick={() => onLink("#contact")}
                      className="rounded-3xl border border-white/15 bg-white/10 px-5 py-4 text-left transition hover:bg-white/14"
                    >
                      <div className="text-lg font-extrabold text-white">Contact</div>
                      <div className="mt-1 text-sm text-white/60">Email / téléphone</div>
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

      <div className="h-[84px]" />
    </>
  );
}