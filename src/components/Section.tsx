import { PropsWithChildren } from "react";

export default function Section({
  id,
  title,
  subtitle,
  children,
}: PropsWithChildren<{ id: string; title: string; subtitle?: string }>) {
  return (
    <section id={id} className="anchor relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[420px] w-[1100px] -translate-x-1/2 rounded-full bg-gradient-to-r from-sky-100 via-emerald-50 to-cyan-100 opacity-30 blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>

      <div className="container">
        <div className="mb-12 max-w-3xl lg:mb-16">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-white">
            <div className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
            Section
          </div>

          <h2 className="mb-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            {title}
          </h2>

          {subtitle && (
            <p className="text-lg leading-relaxed text-slate-600 sm:text-xl">
              {subtitle}
            </p>
          )}

          <div className="mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-sky-600 via-emerald-500 to-cyan-500" />
        </div>

        {children}
      </div>
    </section>
  );
}