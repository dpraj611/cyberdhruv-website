import { motion } from 'framer-motion'

const awards = [
  { award: 'Google Cybersecurity Professional Certificate', org: 'Google', year: '2025' },
  { award: 'TryHackMe — Top 1% Globally', org: 'TryHackMe', year: '2026' },
  { award: 'Ranked #3 in India, #24 Globally', org: 'TryHackMe — Sept 2026', year: '2026' },
  { award: 'Microsoft Azure Fundamentals (AZ-900)', org: 'Microsoft', year: '2025' },
  { award: 'Certified LLM Security Expert', org: 'Red Team Leaders', year: '2026' },
  { award: 'Offensive Security Certified Professional (OSCP)', org: 'Preparation Goal', year: '2027' },
]

export default function Awards() {
  return (
    <section className="px-6 py-28 md:px-10 md:py-40">
      <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:gap-20">
        <div>
          <p className="mb-6 font-mono2 text-[11px] uppercase tracking-[0.35em] text-[#ff4d00]">
            ( Credentials )
          </p>
          <h2 className="font-display text-[clamp(1.15rem,5.5vw,1.875rem)] font-extrabold uppercase leading-[0.9] tracking-tighter sm:text-4xl md:text-4xl xl:text-5xl">
            Certifications
            <br />& Practice
          </h2>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-[#ece9e4]/60">
            Practical security training through hands-on labs, CTF challenges, and
            professional certifications that build rigor through repetition.
          </p>
        </div>

        <div className="border-t border-[#ece9e4]/15">
          {awards.map((a, i) => (
            <motion.div
              key={a.award}
              className="grid min-w-0 grid-cols-[minmax(0,1fr)_3rem] items-start gap-x-5 gap-y-3 border-b border-[#ece9e4]/15 py-6 lg:grid-cols-[minmax(0,1fr)_9rem_3rem] lg:gap-x-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="col-start-1 row-start-1 min-w-0 break-words font-display text-base font-bold leading-snug tracking-tight sm:text-lg xl:text-xl">
                {a.award}
              </span>
              <span className="col-start-1 row-start-2 min-w-0 font-mono2 text-[10px] uppercase leading-relaxed tracking-[0.15em] text-[#ece9e4]/50 lg:col-start-2 lg:row-start-1 lg:pt-1">
                {a.org}
              </span>
              <span className="col-start-2 row-start-1 pt-1 text-right font-mono2 text-[11px] tracking-[0.2em] text-[#ff4d00] lg:col-start-3">
                {a.year}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
