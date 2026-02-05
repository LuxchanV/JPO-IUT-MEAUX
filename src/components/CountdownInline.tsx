"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const pad2 = (n: number) => String(n).padStart(2, "0");

export default function CountdownInline({
  targetISO = "2026-02-14T09:30:00+01:00",
}: {
  targetISO?: string;
}) {
  const target = useMemo(() => new Date(targetISO).getTime(), [targetISO]);
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(0);

  useEffect(() => {
    setMounted(true);
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  if (!mounted) {
    return (
      <div className="countdownShell">
        <div className="countdownRow">
          {["00", "00", "00", "00"].map((v, i) => (
            <div key={i} className="countdownCell">
              <div className="countdownValue opacity-60">{v}</div>
              <div className="countdownLabel opacity-50">—</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const diff = Math.max(0, target - now);
  const total = Math.floor(diff / 1000);

  const days = Math.floor(total / (3600 * 24));
  const hours = Math.floor((total % (3600 * 24)) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;

  const items = [
    { v: pad2(days), label: "Jours" },
    { v: pad2(hours), label: "Heures" },
    { v: pad2(minutes), label: "Minutes" },
    { v: pad2(seconds), label: "Secondes" },
  ];

  return (
    <div className="countdownShell">
      <div className="countdownRow">
        {items.map((it, idx) => (
          <div key={it.label} className="countdownCell">
            <AnimatePresence mode="wait">
              <motion.div
                key={it.v}
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="countdownValue tabular-nums"
              >
                {it.v}
              </motion.div>
            </AnimatePresence>

            <div className="countdownLabel">{it.label}</div>

            {idx !== items.length - 1 && (
              <div className="countdownSep" aria-hidden>
                :
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
