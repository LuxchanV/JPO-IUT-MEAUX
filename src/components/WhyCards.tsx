"use client";

import { motion } from "framer-motion";
import { GraduationCap, Users, Rocket } from "lucide-react";

const items = [
  {
    title: "Découvrir la formation",
    desc: "Comprendre le BUT MMI : contenus, projets, compétences et débouchés professionnels.",
    Icon: GraduationCap,
    // Bleu → Cyan (UGE vibe)
    glow: "from-sky-500/20 via-cyan-400/10 to-emerald-400/15",
    badge: "from-sky-500 to-cyan-400",
  },
  {
    title: "Rencontrer l'équipe",
    desc: "Échanger avec étudiants & enseignants, poser toutes vos questions en direct.",
    Icon: Users,
    // Indigo → Teal
    glow: "from-indigo-500/18 via-sky-400/10 to-teal-400/15",
    badge: "from-indigo-500 to-sky-400",
  },
  {
    title: "Vivre l'expérience",
    desc: "Visite des locaux, démonstrations, ateliers : une vraie immersion dans l'ambiance IUT.",
    Icon: Rocket,
    // Teal → Green
    glow: "from-teal-500/18 via-emerald-400/10 to-lime-300/15",
    badge: "from-teal-500 to-emerald-400",
  },
];

export default function WhyCards() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((item, i) => (
        <motion.article
          key={item.title}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ delay: i * 0.08, duration: 0.55, ease: [0.21, 0.61, 0.35, 1] }}
          whileHover={{ y: -6 }}
          className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-8 shadow-[0_10px_35px_rgba(15,23,42,0.06)] transition"
        >
          {/* Fond dégradé doux (style bleu/vert UGE) */}
          <div
            className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br ${item.glow}`}
          />
          {/* léger “grain” + highlight top */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background:radial-gradient(circle_at_20%_10%,rgba(2,132,199,0.12),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.10),transparent_40%)]" />
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-slate-900/10 to-transparent" />

          <div className="relative">
            {/* Icon */}
            <div className="mb-6">
              <div className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 shadow-[0_10px_25px_rgba(0,0,0,0.18)]">
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.badge} opacity-90`} />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/25 to-transparent" />
                <item.Icon className="relative h-6 w-6 text-white" strokeWidth={2.2} />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-extrabold tracking-tight text-slate-900">
              {item.title}
            </h3>

            {/* Desc */}
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
              {item.desc}
            </p>

            {/* Trait décoratif (sans “En savoir plus”) */}
            <div className="mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-slate-200 via-slate-200 to-transparent transition-all duration-500 group-hover:w-24 group-hover:from-slate-300" />
          </div>

          {/* coins décoratifs super discrets */}
          <div className="pointer-events-none absolute right-5 top-5 h-10 w-10 rounded-2xl border border-white/25 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </motion.article>
      ))}
    </div>
  );
}
