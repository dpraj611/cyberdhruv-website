import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

const TEXT =
  'Security begins with understanding how systems fail. I study their internals, challenge their assumptions, uncover weaknesses, and investigate what happens when they are pushed beyond their intended boundaries.'

function Word({
  word,
  progress,
  range,
}: {
  word: string
  progress: MotionValue<number>
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.12, 1])
  return (
    <motion.span style={{ opacity }} className="mr-[0.35em] inline-block">
      {word}
    </motion.span>
  )
}

export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.45'],
  })
  const words = TEXT.split(' ')

  return (
    <section id="studio" ref={ref} className="px-6 py-32 md:px-10 md:py-48">
      <p className="mb-10 font-mono2 text-[11px] uppercase tracking-[0.35em] text-[#ff4d00]">
        ( Philosophy )
      </p>
      <p className="max-w-5xl font-display text-2xl font-semibold leading-[1.15] tracking-tight sm:text-3xl md:text-6xl">
        {words.map((word, i) => (
          <Word
            key={i}
            word={word}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
          />
        ))}
      </p>
      <div className="mt-16 grid grid-cols-2 gap-6 border-t border-[#ece9e4]/10 pt-10 sm:gap-8 md:grid-cols-4">
        {[
          ['06', 'Runtime modules Engineered'],
          ['03', 'Internship Experiences'],
          ['Top 20', 'Bugcrowd India'],
          ['Top 1%', 'TryHackMe global'],
        ].map(([num, label]) => (
          <div key={label}>
            <p className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-6xl">
              {num}
            </p>
            <p className="mt-2 font-mono2 text-[9px] uppercase tracking-[0.2em] text-[#ece9e4]/50 sm:text-[10px] sm:tracking-[0.25em]">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
