"use client";

import { motion } from "framer-motion";

/**
 * ✅ MODIFIE LE PROGRAMME ICI
 * time: "09:30"
 */
const PROGRAM = [
  {
    time: "09:30",
    title: "Accueil & orientation",
    desc: "Enregistrement, remise du kit visiteur, point de départ.",
    color: "from-sky-500 to-cyan-400",
  },
  {
    time: "10:00",
    title: "Présentation du BUT MMI",
    desc: "Programme, parcours, débouchés et projets étudiants.",
    color: "from-violet-500 to-fuchsia-400",
  },
  {
    time: "11:30",
    title: "Visite & projets étudiants",
    desc: "Locaux, démos, ateliers, stands et échanges.",
    color: "from-amber-500 to-orange-400",
  },
  {
    time: "14:00",
    title: "Ateliers & démonstrations",
    desc: "Sessions interactives : web, design, audiovisuel, dev.",
    color: "from-rose-500 to-pink-400",
  },
  {
    time: "17:00",
    title: "Clôture & questions",
    desc: "Derniers échanges + conseils d’orientation.",
    color: "from-emerald-500 to-teal-400",
  },
];

function normalizeTime(t: string) {
  const s = t.trim();
  if (/^\d{2}:\d{2}$/.test(s)) return s;
  if (/^\d{4}$/.test(s)) return `${s.slice(0, 2)}:${s.slice(2)}`;
  return s;
}

export default function ProgramTimeline() {
  return (
    <div className="rounded-3xl bg-white ring-1 ring-slate-200 shadow-[0_10px_40px_rgba(2,6,23,.06)] p-6 sm:p-8">
      {/* Ligne du haut */}
      <div className="relative">
        <div className="absolute left-0 right-0 top-8 h-[3px] bg-slate-200/80 rounded-full" />

        {/* ✅ Desktop */}
        <div className="hidden lg:grid grid-cols-5 gap-5 relative">
          {PROGRAM.map((step, i) => (
            <motion.div
              key={step.time + step.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative"
            >
              <div className="flex items-center justify-start">
                <div
                  className={[
                    "h-16 w-16 rounded-full grid place-items-center",
                    "bg-gradient-to-br",
                    step.color,
                    "shadow-lg ring-4 ring-white",
                  ].join(" ")}
                >
                  <span className="text-white font-black tracking-wide">
                    {normalizeTime(step.time)}
                  </span>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm hover:shadow-md transition">
                <div className="text-xs font-bold text-slate-500 tracking-wider uppercase">
                  {normalizeTime(step.time)}
                </div>
                <div className="mt-1 text-lg font-black text-slate-900">
                  {step.title}
                </div>
                <p className="mt-2 text-slate-600 leading-relaxed">{step.desc}</p>

                <div
                  className={["mt-4 h-1.5 w-full rounded-full", "bg-gradient-to-r", step.color].join(" ")}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* ✅ Mobile / tablette (corrigé hydration + mieux aligné) */}
        <div className="lg:hidden">
          {/* IMPORTANT: pas de className multi-ligne => pas de mismatch */}
          <div className="-mx-6 sm:-mx-8 px-6 sm:px-8 overflow-hidden">
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-px-6 sm:scroll-px-8 [-webkit-overflow-scrolling:touch]">
              {PROGRAM.map((step, i) => (
                <motion.div
                  key={step.time + step.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="snap-center w-[86vw] max-w-[360px] flex-shrink-0"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={[
                        "h-12 w-12 rounded-2xl grid place-items-center",
                        "bg-gradient-to-br",
                        step.color,
                        "shadow-md",
                      ].join(" ")}
                    >
                      <span className="text-white font-black text-sm">
                        {normalizeTime(step.time)}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-black text-slate-900">{step.title}</div>
                      <div className="text-xs text-slate-500 font-semibold">{normalizeTime(step.time)}</div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm">
                    <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                    <div
                      className={["mt-4 h-1.5 w-full rounded-full", "bg-gradient-to-r", step.color].join(" ")}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-2 text-xs text-slate-500">Glisse horizontalement pour voir tout le programme →</div>
        </div>
      </div>

      {/* Note */}
      <div className="mt-8 flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-slate-50 p-4">
        <div className="mt-0.5 text-slate-500">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 17v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 7h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path d="M21 12a9 9 0 1 1-18 0a9 9 0 0 1 18 0Z" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        <p className="text-sm text-slate-600">
          <span className="font-semibold text-slate-900">Planning indicatif.</span>{" "}
          Les détails précis (salles, stands, intervenants) seront affichés sur place le jour J.
        </p>
      </div>
    </div>
  );
}
