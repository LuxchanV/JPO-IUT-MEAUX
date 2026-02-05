export default function Footer() {
  return (
    <footer id="contact" className="anchor bg-[#050A12] text-white">
      {/* top divider glow */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            {/* ✅ Remplace par ton logo image si tu veux :
                Mets ton logo dans /public/logo-uge.png
                et remplace le bloc ci-dessous par:
                <img src="/logo-uge.png" alt="UGE" className="h-10 w-auto" />
            */}
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-white/10 border border-white/15 grid place-items-center font-black">
                UGE
              </div>
              <div className="leading-tight">
                <div className="font-extrabold">Université Gustave Eiffel</div>
                <div className="text-white/55 text-sm">IUT de Meaux — Journée Portes Ouvertes</div>
              </div>
            </div>

            <p className="mt-5 text-white/65 leading-relaxed max-w-md">
              BUT Métiers du Multimédia et de l’Internet : Web, Design, Audiovisuel,
              Communication, Développement.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-white/8 border border-white/10">
                Samedi 14 février 2026
              </span>
              <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-white/8 border border-white/10">
                9h30 — 17h
              </span>
              <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-white/8 border border-white/10">
                17 Rue Jablinot, 77100 Meaux
              </span>
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="font-extrabold tracking-tight text-white">Contact</h3>
            <div className="mt-4 space-y-3 text-white/70">
              <a href="mailto:contact@exemple.fr" className="flex items-center gap-2 hover:text-white transition">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path d="M4 6h16v12H4V6Z" stroke="currentColor" strokeWidth="2" />
                  <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                </svg>
                contact@exemple.fr
              </a>
              <a href="tel:0100000000" className="flex items-center gap-2 hover:text-white transition">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 4h4l2 5-3 2c1 3 3 5 6 6l2-3 5 2v4c0 1-1 2-2 2C10 22 2 14 2 6c0-1 1-2 3-2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
                01 00 00 00 00
              </a>

              <div className="pt-2 text-xs text-white/45">
                Coordonnées à mettre à jour selon l’établissement.
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-4">
            <h3 className="font-extrabold tracking-tight text-white">Liens utiles</h3>
            <div className="mt-4 grid grid-cols-2 gap-3 text-white/70">
              {[
                { label: "Mentions légales", href: "#" },
                { label: "Politique de confidentialité", href: "#" },
                { label: "Plan du site", href: "#" },
                { label: "Accessibilité", href: "#" },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="rounded-xl px-3 py-2 bg-white/5 border border-white/10 hover:bg-white/8 hover:text-white transition text-sm"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* bottom */}
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-3 items-center justify-between text-sm text-white/55">
          <div>© {new Date().getFullYear()} Université Gustave Eiffel. Tous droits réservés.</div>
          <div className="text-white/45">IUT de Meaux — Journée Portes Ouvertes</div>
        </div>
      </div>
    </footer>
  );
}
