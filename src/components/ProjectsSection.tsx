"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const PROJECTS = [
  {
    id: "txl-forma",
    title: "TXL FORMA",
    url: "https://txl-forma.vercel.app/",
    shortUrl: "txl-forma.vercel.app",
    badge: "TXL",
    description:
      "Projet web orienté interface et expérience utilisateur, avec une structure claire et une navigation moderne.",
    tags: ["UI", "Front-end", "Web"],
    accent: "from-sky-500 to-cyan-400",
  },
  {
    id: "txlforma-front",
    title: "TXLFORMA FRONT",
    url: "https://txlforma.vercel.app/",
    shortUrl: "txlforma.vercel.app",
    badge: "TF",
    description:
      "Projet mettant l’accent sur la partie front-end, la lisibilité visuelle et l’organisation des contenus.",
    tags: ["Front", "UX/UI", "Responsive"],
    accent: "from-emerald-500 to-cyan-400",
  },
  {
    id: "infochoko",
    title: "INFOCHOKO",
    url: "https://infochoko.vercel.app/",
    shortUrl: "infochoko.vercel.app",
    badge: "IC",
    description:
      "Projet web immersif avec une direction artistique forte, combinant contenu, mise en page et identité visuelle.",
    tags: ["Design", "Communication", "Web"],
    accent: "from-indigo-500 to-fuchsia-400",
  },
];

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState(PROJECTS[0]);

  return (
    <div className="projectsShell">
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-4">
          {PROJECTS.map((project, index) => {
            const isActive = activeProject.id === project.id;

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className={`projectCard ${isActive ? "projectCardActive" : ""}`}
              >
                <div className="projectCardInner">
                  <div className="flex items-start gap-4">
                    <div className={`projectBadge bg-gradient-to-br ${project.accent}`}>
                      <span>{project.badge}</span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="projectKicker">Projet</div>
                      <h3 className="projectTitle">{project.title}</h3>

                      <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                        {project.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="projectTag">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                        <button
                          type="button"
                          onClick={() => setActiveProject(project)}
                          className="projectPrimaryBtn"
                        >
                          Prévisualiser sur le site
                          <span className="projectBtnArrow">→</span>
                        </button>

                        <a
                          href={project.url}
                          target="_blank"
                          rel="noreferrer"
                          className="projectSecondaryBtn"
                        >
                          Ouvrir dans un nouvel onglet
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          key={activeProject.id}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="projectPreviewWrap"
        >
          <div className="projectBrowserBar">
            <div className="flex items-center gap-2">
              <span className="projectDot bg-rose-400" />
              <span className="projectDot bg-amber-400" />
              <span className="projectDot bg-emerald-400" />
            </div>

            <div className="projectBrowserUrl">{activeProject.shortUrl}</div>

            <a
              href={activeProject.url}
              target="_blank"
              rel="noreferrer"
              className="projectBrowserLink"
            >
              Ouvrir
            </a>
          </div>

          <div className="projectPreviewFrame">
            <iframe
              key={activeProject.url}
              src={activeProject.url}
              title={`Prévisualisation ${activeProject.title}`}
              className="h-full w-full bg-white"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="border-t border-slate-200/70 bg-white px-5 py-5 sm:px-6">
            <div className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
              Aperçu intégré
            </div>
            <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
              {activeProject.title}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-[15px]">
              Tu peux visualiser ce projet directement ici. Si jamais un aperçu ne s’affiche pas
              correctement selon le navigateur, utilise le bouton “Ouvrir dans un nouvel onglet”.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="mt-6 rounded-3xl border border-slate-200/70 bg-white px-5 py-4 text-sm leading-relaxed text-slate-600 shadow-[0_10px_30px_rgba(15,23,42,.05)]">
        <span className="font-black text-slate-950">Conseil soutenance :</span> cette section montre
        directement des réalisations visibles en ligne, ce qui valorise le volet développement du projet
        tutoré et permet au jury de visualiser concrètement des productions web.
      </div>
    </div>
  );
}