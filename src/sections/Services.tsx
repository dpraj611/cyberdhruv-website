import { motion } from 'framer-motion'

const services = [
  {
    "n": "01",
    "name": "Systems & Runtime Security",
    "desc": "Linux isolation, capability-based access, and runtime observability, informed by my engineering work on Astra.",
    "tags": [
      "Linux",
      "Isolation",
      "Capabilities",
      "eBPF"
    ]
  },
  {
    "n": "02",
    "name": "Vulnerability Research",
    "desc": "Attack-surface analysis and JavaScript security tooling, with an emphasis on validating findings and reducing false positives.",
    "tags": [
      "GhostJS",
      "Static Analysis",
      "Validation"
    ]
  },
  {
    "n": "03",
    "name": "AI Security",
    "desc": "Prompt injection detection and evaluation across datasets, exploring the precision, recall, and latency tradeoffs in PromptGuard.",
    "tags": [
      "Prompt Injection",
      "DeBERTa",
      "Evaluation"
    ]
  },
  {
    "n": "04",
    "name": "Container Security",
    "desc": "Filesystem inspection, package inventories, and CVE matching through DockSec, with a focus on understanding the limits of automated assessment.",
    "tags": [
      "Docker",
      "Package Analysis",
      "CVE Matching"
    ]
  },
  {
    "n": "05",
    "name": "Offensive Security",
    "desc": "Controlled penetration testing and LLM-assisted tool orchestration in isolated labs, supported by hands-on security practice.",
    "tags": [
      "Metasploit",
      "MCP",
      "Lab Testing"
    ]
  },
  {
    "n": "06",
    "name": "Application Engineering",
    "desc": "Responsive client applications built around clear information architecture, maintainable components, and reliable delivery.",
    "tags": [
      "React",
      "TypeScript",
      "Client Work"
    ]
  }
]

export default function Services() {
  return (
    <section id="services" className="px-6 pb-28 pt-16 md:px-10 md:pb-40 md:pt-24">
      <div className="mb-10 flex flex-col items-start gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
        <h2 className="font-display text-[clamp(1.5rem,7.5vw,2.5rem)] font-extrabold uppercase tracking-tighter sm:text-5xl md:text-7xl">
          Focus Areas
        </h2>
        <span className="font-mono2 text-[10px] uppercase tracking-[0.3em] text-[#ece9e4]/50 sm:text-[11px]">
          ( What I do )
        </span>
      </div>

      <div className="border-t border-[#ece9e4]/15">
        {services.map((s, i) => (
          <motion.div
            key={s.n}
            data-hover
            className="group relative overflow-hidden border-b border-[#ece9e4]/15"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* hover fill */}
            <div className="absolute inset-0 origin-bottom scale-y-0 bg-[#ece9e4] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100" />
            <div className="relative grid gap-4 py-8 transition-colors duration-500 group-hover:text-[#0a0a0a] md:grid-cols-[4rem_1fr_1.2fr] md:items-center md:gap-8 md:py-12">
              <span className="font-mono2 text-[11px] tracking-[0.2em] text-[#ece9e4]/40 transition-colors duration-500 group-hover:text-[#ff4d00]">
                ({s.n})
              </span>
              <h3 className="font-display text-xl font-bold uppercase tracking-tight sm:text-2xl md:text-5xl">
                {s.name}
              </h3>
              <div>
                <p className="max-w-md text-sm leading-relaxed text-[#ece9e4]/60 transition-colors duration-500 group-hover:text-[#0a0a0a]/70">
                  {s.desc}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="border border-[#ece9e4]/20 px-3 py-1 font-mono2 text-[10px] uppercase tracking-[0.2em] text-[#ece9e4]/60 transition-colors duration-500 group-hover:border-[#0a0a0a]/30 group-hover:text-[#0a0a0a]/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
