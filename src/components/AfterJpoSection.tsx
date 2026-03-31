"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

const galleryImages = [
  {
    src: "/image1.png",
    title: "Accueil des visiteurs",
    description: "Un aperçu de l’arrivée des visiteurs et de l’ambiance générale de la JPO.",
  },
  {
    src: "/image2.png",
    title: "Découverte des projets",
    description: "Présentation des réalisations étudiantes et des projets exposés pendant la journée.",
  },
  {
    src: "/image3.png",
    title: "Échanges avec les étudiants",
    description: "Moments de discussion avec les étudiants autour de la formation et de la vie en MMI.",
  },
  {
    src: "/image4.png",
    title: "Présentation de la formation",
    description: "Découverte du BUT MMI, des parcours, des compétences et des débouchés.",
  },
  {
    src: "/image5.png",
    title: "Ambiance dans les locaux",
    description: "Vue d’ensemble des espaces, des salles et de l’environnement de travail.",
  },
  {
    src: "/image6.png",
    title: "Temps forts de la journée",
    description: "Retour sur les moments marquants, les démonstrations et les échanges du jour J.",
  },
];

type GalleryItem = (typeof galleryImages)[number];

export default function AfterJpoSection() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const stats = useMemo(
    () => ({
      images: galleryImages.length,
      videos: 1,
    }),
    []
  );

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
              <div className="relative aspect-video w-full">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://youtu.be/0_ZFDUK0vHU"
                  title="Replay / best of JPO"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Retrouve ici le best-of de la Journée Portes Ouvertes : ambiance, échanges, projets présentés
              et immersion dans l’univers MMI.
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

            <p className="mt-5 leading-relaxed text-slate-600">
              Une sélection d’images pour revivre l’ambiance de la JPO : accueil, démonstrations,
              projets étudiants, visites et moments d’échange.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-slate-200/70 bg-slate-50 px-4 py-4">
                <div className="text-2xl font-black text-slate-950">{stats.images}</div>
                <div className="mt-1 text-sm font-medium text-slate-600">Photos mises en avant</div>
              </div>
              <div className="rounded-2xl border border-slate-200/70 bg-slate-50 px-4 py-4">
                <div className="text-2xl font-black text-slate-950">{stats.videos}</div>
                <div className="mt-1 text-sm font-medium text-slate-600">Vidéo best-of</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* GALLERY */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {galleryImages.map((item, index) => (
          <motion.button
            key={item.src}
            type="button"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
            onClick={() => setSelectedImage(item)}
            className="group overflow-hidden rounded-3xl border border-slate-200/70 bg-white text-left shadow-[0_10px_30px_rgba(15,23,42,.06)] transition hover:shadow-[0_18px_45px_rgba(15,23,42,.10)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            <div className="p-4">
              <h4 className="text-base font-black text-slate-950">{item.title}</h4>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">
                {item.description}
              </p>
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

                <div className="relative aspect-[16/10] w-full bg-black">
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="border-t border-white/10 bg-slate-950/95 px-6 py-5">
                  <h4 className="text-xl font-black text-white">{selectedImage.title}</h4>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/70">
                    {selectedImage.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}