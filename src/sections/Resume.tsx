export default function Resume() {
  return (
    <section id="resume" aria-label="Résumé" className="scroll-mt-24 px-6 pb-24 md:px-10 md:pb-36">
      <a href="https://drive.google.com/file/d/1tIO6kAhgg5nYpPnbyGpCv_32FQITy-4h/view?usp=sharing" target="_blank" rel="noreferrer" data-hover className="group block border border-[#ff4d00] bg-[#ff4d00] p-6 text-[#050505] transition-colors duration-300 hover:border-[#ece9e4] hover:bg-[#ece9e4] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-8 focus-visible:outline-[#ece9e4] sm:p-10 md:p-14">
        <div className="flex items-start justify-between gap-4">
          <h2 className="min-w-0 font-display text-[clamp(1.7rem,6vw,5.5rem)] font-extrabold uppercase leading-none tracking-tighter">Résumé</h2>
          <span aria-hidden="true" className="shrink-0 text-4xl leading-none transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 md:text-7xl">↗</span>
        </div>
        <div className="mt-10 flex flex-col gap-6 border-t border-black/25 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-sm text-sm leading-relaxed text-black/75 md:text-base">Explore my experience, education, and security engineering work.</p>
          <span className="flex min-h-12 items-center justify-center gap-4 self-start bg-[#050505] px-6 py-4 font-mono2 text-xs uppercase tracking-[0.15em] text-[#ece9e4]">Open résumé <span aria-hidden="true">↗</span></span>
        </div>
        <span className="sr-only">Opens in a new tab</span>
      </a>
    </section>
  )
}
