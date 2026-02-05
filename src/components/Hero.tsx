"use client";

import Image from "next/image";
import { motion, cubicBezier } from "framer-motion";
import CountdownInline from "./CountdownInline";

const easeOut = cubicBezier(0.22, 1, 0.36, 1);

export default function Hero() {
  return (
    <header className="relative min-h-[760px] h-[calc(100vh-72px)] overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.35, ease: easeOut }}
        >
          <Image
            src="/hero.jpeg"
            alt="Journée Portes Ouvertes - IUT de Meaux"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>

        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/70" />
        <div className="absolute inset-0 heroVignette" />
        <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none heroGrain" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 h-full flex items-center justify-center px-4">
        <div className="w-full max-w-5xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="heroTitle"
          >
            Journée Portes Ouvertes
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: easeOut }}
            className="heroSubtitle"
          >
            BUT Métiers du Multimédia et de l’Internet — Web • Design • Audiovisuel • Communication • Dev
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: easeOut }}
            className="mt-10 flex justify-center"
          >
            <CountdownInline targetISO="2026-02-14T09:30:00+01:00" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: easeOut }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            <div className="heroMetaChip">Samedi 14 février 2026</div>
            <div className="heroMetaChip">9h30 — 17h</div>
            <div className="heroMetaChip">IUT de Meaux • 17 Rue Jablinot, 77100 Meaux</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32, ease: easeOut }}
            className="mt-10 flex justify-center"
          >
            <a className="heroMainBtn" href="#programme">
              Découvrir le programme <span className="heroArrow">→</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* scroll */}
      <motion.a
        href="#pourquoi"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.9, ease: easeOut }}
        className="absolute left-1/2 -translate-x-1/2 bottom-8 z-10"
        aria-label="Scroller vers la section suivante"
      >
        <div className="scrollHint">
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="scrollDot"
          />
        </div>
      </motion.a>
    </header>
  );
}
