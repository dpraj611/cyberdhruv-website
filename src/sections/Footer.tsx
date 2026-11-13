import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-[#ece9e4]/10 px-6 pb-8 pt-24 md:px-10 md:pt-36">
      <p className="mb-8 font-mono2 text-[11px] uppercase tracking-[0.35em] text-[#ff4d00]">
        ( Get in touch )
      </p>

      <motion.a
        href="mailto:praj.dhruv6@gmail.com"
        data-hover
        className="group block select-none"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="font-display text-[9.5vw] font-extrabold uppercase leading-[0.85] tracking-tighter transition-colors duration-500 group-hover:text-[#ff4d00] md:text-[11vw]">
          Let's
        </span>
        <span className="block font-display text-[9.5vw] font-extrabold uppercase leading-[0.85] tracking-tighter text-[#ff4d00] transition-colors duration-500 group-hover:text-[#ece9e4] md:text-[11vw]">
          Connect ↗
        </span>
      </motion.a>

      <div className="mt-20 grid gap-8 border-t border-[#ece9e4]/10 pt-10 sm:grid-cols-2 xl:grid-cols-4 md:gap-10">
        <div>
          <p className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#ece9e4]/40">Education</p>
          <p className="mt-2 text-sm text-[#ece9e4]/70">SRM Institute of Science<br />& Technology, Chennai</p>
        </div>
        <div>
          <p className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#ece9e4]/40">Location</p>
          <p className="mt-2 text-sm text-[#ece9e4]/70">Chennai, India<br />Expected Grad: May 2027</p>
        </div>
        <div>
          <p className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#ece9e4]/40">Contact</p>
          <a href="mailto:praj.dhruv6@gmail.com" data-hover className="link-sweep mt-2 inline-block break-all text-sm text-[#ece9e4]/70 ">
            praj.dhruv6@gmail.com
          </a>
        </div>
        <div>
          <p className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#ece9e4]/40">Socials</p>
          <div className="mt-2 flex flex-wrap gap-4 text-sm text-[#ece9e4]/70">
            {[
              { label: 'GitHub', href: 'https://github.com/dpraj611' },
              { label: 'LinkedIn', href: 'https://linkedin.com/in/dpraj' },
              { label: 'TryHackMe', href: 'https://tryhackme.com/p/dpraj' },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" data-hover className="link-sweep">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#ece9e4]/40">
        <span className="break-words">© 2026 Dhruv Prajapati. All rights reserved.</span>
        <a
          href="#top"
          data-hover
          className="link-sweep"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}

