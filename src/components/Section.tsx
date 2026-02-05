import { PropsWithChildren } from "react";

export default function Section({
  id,
  title,
  subtitle,
  children,
}: PropsWithChildren<{ id: string; title: string; subtitle?: string }>) {
  return (
    <section id={id} className="anchor py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* ✅ séparation + ambiance par section */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[1100px] h-[420px] rounded-full blur-3xl opacity-30
                        bg-gradient-to-r from-sky-100 via-emerald-50 to-cyan-100" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>

      <div className="container">
        <div className="mb-12 lg:mb-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950 text-white text-xs font-black uppercase tracking-wider mb-6">
            <div className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
            Section
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950 mb-4">
            {title}
          </h2>

          {subtitle && (
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed">
              {subtitle}
            </p>
          )}

          <div className="mt-6 h-1 w-20 bg-gradient-to-r from-sky-600 via-emerald-500 to-cyan-500 rounded-full" />
        </div>

        {children}
      </div>
    </section>
  );
}
