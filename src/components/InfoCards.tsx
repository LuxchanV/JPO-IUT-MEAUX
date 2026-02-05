"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ADDRESS_LABEL = "17 Rue Jablinot, 77100 Meaux";
const ADDRESS_QUERY = encodeURIComponent(ADDRESS_LABEL);

// Maps
const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${ADDRESS_QUERY}`;
const APPLE_MAPS_URL = `https://maps.apple.com/?q=${ADDRESS_QUERY}`;

// Event
const EVENT = {
  title: "Journée Portes Ouvertes — IUT de Meaux (UGE)",
  description:
    "Journée Portes Ouvertes — BUT MMI (Métiers du Multimédia et de l’Internet). Venez découvrir la formation, rencontrer l’équipe et visiter les locaux.",
  location: ADDRESS_LABEL,
  // Samedi 14 février 2026 — 09:30 → 17:00 (Paris)
  startUtc: "20260214T083000Z",
  endUtc: "20260214T160000Z",
  dateLabel: "Samedi 14 février 2026",
  timeLabel: "9h30 — 17h00",
};

function escapeICS(text: string) {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function buildICS() {
  const uid = `jpo-iut-meaux-${EVENT.startUtc}@jpo-uge`;
  const dtstamp =
    new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//JPO UGE//IUT Meaux//FR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART:${EVENT.startUtc}`,
    `DTEND:${EVENT.endUtc}`,
    `SUMMARY:${escapeICS(EVENT.title)}`,
    `DESCRIPTION:${escapeICS(EVENT.description)}`,
    `LOCATION:${escapeICS(EVENT.location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return lines.join("\r\n");
}

function downloadFile(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function buildGoogleCalendarUrl() {
  const base = "https://calendar.google.com/calendar/render?action=TEMPLATE";
  const text = encodeURIComponent(EVENT.title);
  const dates = `${EVENT.startUtc}/${EVENT.endUtc}`;
  const details = encodeURIComponent(EVENT.description);
  const location = encodeURIComponent(EVENT.location);
  return `${base}&text=${text}&dates=${dates}&details=${details}&location=${location}`;
}

/* ---------- Icons (SVG) ---------- */
function IconCalendar({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M7 2v3M17 2v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M3.5 9.5h17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M6.5 5h11c2 0 3 1 3 3v11c0 2-1 3-3 3h-11c-2 0-3-1-3-3V8c0-2 1-3 3-3Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M7.5 13h3M7.5 16h3M13.5 13h3M13.5 16h3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconPin({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 22s7-5 7-12a7 7 0 1 0-14 0c0 7 7 12 7 12Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function IconArrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconExternal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M14 4h6m0 0v6m0-6L10 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------- UI ---------- */

function ActionButton({
  icon,
  label,
  sub,
  onClick,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  sub?: string;
  onClick?: () => void;
  href?: string;
}) {
  const className =
    "group w-full rounded-2xl px-4 py-4 text-left ring-1 ring-white/10 bg-white/5 hover:bg-white/8 transition flex items-center gap-3";

  const content = (
    <>
      <span className="h-11 w-11 rounded-xl grid place-items-center bg-white/10 text-white">
        {icon}
      </span>
      <span className="flex-1">
        <span className="block font-extrabold text-white">{label}</span>
        <span className="block text-sm text-white/60 mt-0.5">{sub ?? "Ouverture avec infos remplies"}</span>
      </span>
      <IconArrow className="w-5 h-5 text-white/50 group-hover:text-white transition" />
    </>
  );

  if (href) {
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return (
    <button className={className} type="button" onClick={onClick}>
      {content}
    </button>
  );
}

/**
 * ✅ MODAL iOS SAFE :
 * - wrapper fixe centré (CSS transform)
 * - animation sur un enfant (Framer Motion n’écrase plus le centrage)
 * - header + bouton retour/fermer
 */
function Modal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-md cursor-default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-label="Fermer"
          />

          {/* Wrapper centré (ne pas animer celui-ci) */}
          <div className="fixed left-1/2 top-1/2 z-[90] w-[min(92vw,520px)] -translate-x-1/2 -translate-y-1/2 px-3">
            {/* Contenu animé */}
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              role="dialog"
              aria-modal="true"
              className="rounded-3xl overflow-hidden border border-white/10 bg-[#070B12] shadow-[0_30px_120px_rgba(0,0,0,.65)]"
            >
              <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                <div className="font-black text-white">{title}</div>
                <button
                  type="button"
                  onClick={onClose}
                  className="h-10 w-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 grid place-items-center text-white"
                  aria-label="Fermer"
                >
                  ✕
                </button>
              </div>

              <div className="px-5 py-5">{children}</div>

              {/* Footer actions */}
              <div className="px-5 pb-5">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full rounded-2xl px-4 py-3 font-extrabold text-white bg-white/10 hover:bg-white/15 border border-white/10 transition"
                >
                  Retour
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function InfoCards() {
  const [agendaOpen, setAgendaOpen] = useState(false);
  const [mapsOpen, setMapsOpen] = useState(false);

  const googleCalUrl = useMemo(() => buildGoogleCalendarUrl(), []);

  return (
    <>
      <div className="grid gap-6 lg:gap-8 md:grid-cols-2">
        {/* Card 1 - Date */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-white ring-1 ring-slate-200 shadow-[0_10px_40px_rgba(2,6,23,.06)]"
        >
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gradient-to-br from-emerald-300/30 via-cyan-300/20 to-blue-300/20 blur-2xl" />
          <div className="absolute -left-28 -bottom-28 h-72 w-72 rounded-full bg-gradient-to-tr from-blue-300/20 via-teal-300/20 to-emerald-300/10 blur-2xl" />

          <div className="relative p-7 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-2xl bg-slate-950 text-white grid place-items-center">
                <IconCalendar className="w-6 h-6" />
              </div>

              <div className="flex-1">
                <div className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                  Infos pratiques
                </div>
                <h3 className="mt-2 text-2xl font-black text-slate-950">
                  Date & heure
                </h3>

                <div className="mt-5 space-y-2 text-slate-700 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                    {EVENT.dateLabel}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                    {EVENT.timeLabel}
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => setAgendaOpen(true)}
                    className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-extrabold text-white bg-slate-950 hover:bg-slate-900 transition shadow-lg shadow-slate-900/10"
                  >
                    <IconCalendar className="w-5 h-5" />
                    Ajouter à mon agenda
                    <IconArrow className="w-5 h-5 opacity-80" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 2 - Location */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.06 }}
          className="relative overflow-hidden rounded-3xl bg-white ring-1 ring-slate-200 shadow-[0_10px_40px_rgba(2,6,23,.06)]"
        >
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gradient-to-br from-sky-300/25 via-emerald-300/20 to-teal-300/20 blur-2xl" />
          <div className="absolute -left-28 -bottom-28 h-72 w-72 rounded-full bg-gradient-to-tr from-emerald-300/20 via-cyan-300/20 to-blue-300/10 blur-2xl" />

          <div className="relative p-7 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-2xl bg-slate-950 text-white grid place-items-center">
                <IconPin className="w-6 h-6" />
              </div>

              <div className="flex-1">
                <div className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                  Accès
                </div>
                <h3 className="mt-2 text-2xl font-black text-slate-950">
                  Lieu
                </h3>

                <div className="mt-5 space-y-2 text-slate-700 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                    IUT de Meaux
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                    {ADDRESS_LABEL}
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => setMapsOpen(true)}
                    className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-extrabold text-white bg-slate-950 hover:bg-slate-900 transition shadow-lg shadow-slate-900/10"
                  >
                    <IconExternal className="w-5 h-5" />
                    Ouvrir dans Maps
                    <IconArrow className="w-5 h-5 opacity-80" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal Agenda */}
      <Modal open={agendaOpen} title="Ajouter à mon agenda" onClose={() => setAgendaOpen(false)}>
        <div className="space-y-4">
          <ActionButton
            icon={<IconExternal className="w-5 h-5" />}
            label="Google Calendar (web)"
            sub="Ouvrir avec les infos remplies"
            href={googleCalUrl}
          />
          <ActionButton
            icon={<IconCalendar className="w-5 h-5" />}
            label="Télécharger le fichier .ics"
            sub="Apple Calendrier / Outlook"
            onClick={() => downloadFile("JPO-IUT-Meaux.ics", buildICS())}
          />
          <div className="text-xs text-white/60 leading-relaxed">
            Sur iPhone : ouvre le fichier <span className="font-semibold text-white">.ics</span> et ajoute-le au calendrier.
          </div>
        </div>
      </Modal>

      {/* Modal Maps */}
      <Modal open={mapsOpen} title="Ouvrir dans Maps" onClose={() => setMapsOpen(false)}>
        <div className="space-y-4">
          <ActionButton
            icon={<IconPin className="w-5 h-5" />}
            label="Apple Plans (iOS)"
            sub="Ouvrir l’adresse directement"
            href={APPLE_MAPS_URL}
          />
          <ActionButton
            icon={<IconExternal className="w-5 h-5" />}
            label="Google Maps"
            sub="Ouvrir l’adresse directement"
            href={GOOGLE_MAPS_URL}
          />
          <div className="text-xs text-white/60">
            Adresse : <span className="font-semibold text-white">{ADDRESS_LABEL}</span>
          </div>
        </div>
      </Modal>
    </>
  );
}
