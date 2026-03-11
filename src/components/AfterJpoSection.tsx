"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const galleryImages = [
  "/apres-jpo/image1.png",
  "/apres-jpo/image2.png",
  "/apres-jpo/image3.png",
  "/apres-jpo/image4.png",
  "/apres-jpo/image5.png",
  "/apres-jpo/image6.png",
];

export default function AfterJpoSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        {/* VIDEO */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
          className="afterCard overflow-hidden"
        >
          <div className="afterCardInner">
            <div className="afterHeader">
              <div className="afterIconWrap afterIconVideo">
                <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none">
                  <path d="M8 6.5v11l8-5.5-8-5.5Z" fill="currentColor" />
                </svg>
              </div>
              <div>
                <div className="afterKicker">Vidéo</div>
                <h3 className="afterTitle">Replay / best of</h3>
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200/70 bg-slate-950">
              <video
                controls
                className="h-full w-full object-cover"
                poster="/apres-jpo/video-poster.jpg"
              >
                <source src="/apres-jpo/apres-jpo-video.mp4" type="video/mp4" />
                Ton navigateur ne supporte pas la vidéo.
              </video>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Ajoute ici la vidéo du jour J, un aftermovie, une présentation ou un montage des meilleurs moments.
            </p>
          </div>
        </motion.div>

        {/* INFOS */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, delay: 0.06 }}
          className="afterCard"
        >
          <div className="afterCardInner">
            <div className="afterHeader">
              <div className="afterIconWrap afterIconGallery">
                <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="m8 15 2.2-2.2a1 1 0 0 1 1.4 0l1.4 1.4a1 1 0 0 0 1.4 0L17 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="9" cy="9" r="1.2" fill="currentColor" />
                </svg>
              </div>
              <div>
                <div className="afterKicker">Galerie</div>
                <h3 className="afterTitle">Photos de la journée</h3>
              </div>
            </div>

            <p className="mt-5 text-slate-600 leading-relaxed">
              Exposition des projets, ambiance dans les locaux, échanges avec les étudiants, démos et ateliers.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-slate-200/70 bg-slate-50 px-4 py-4">
                <div className="text-2xl font-black text-slate-950">6+</div>
                <div className="mt-1 text-sm font-medium text-slate-600">Photos mises en avant</div>
              </div>
              <div className="rounded-2xl border border-slate-200/70 bg-slate-50 px-4 py-4">
                <div className="text-2xl font-black text-slate-950">1</div>
                <div className="mt-1 text-sm font-medium text-slate-600">Vidéo best-of</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* GALLERY */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {galleryImages.map((src, index) => (
          <motion.button
            key={src}
            type="button"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
            onClick={() => setSelectedImage(src)}
            className="group overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-[0_10px_30px_rgba(15,23,42,.06)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={src}
                alt={`Photo JPO ${index + 1}`}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </motion.button>
        ))}
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedImage && (
          <>
            <motion.button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-label="Fermer"
            />
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
            >
              <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl">
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-black/60 text-white backdrop-blur-md"
                  aria-label="Fermer l’image"
                >
                  ✕
                </button>

                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={selectedImage}
                    alt="Aperçu photo JPO"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}