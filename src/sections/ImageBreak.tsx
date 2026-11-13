import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const breakImg = 'https://images.pexels.com/photos/17489160/pexels-photo-17489160.jpeg?auto=compress&cs=tinysrgb&w=1920'

export default function ImageBreak() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-18%', '18%'])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1.15])

  return (
    <section ref={ref} className="relative h-[80vh] overflow-hidden md:h-screen">
      <motion.img
        src={breakImg}
        alt="Server infrastructure in a blue-lit data center"
        style={{ y, scale }}
        className="absolute inset-0 h-[136%] w-full -translate-y-[18%] object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <motion.p
          className="mb-6 font-mono2 text-[11px] uppercase tracking-[0.4em] text-[#ece9e4]/80"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          ( Engineering ethos )
        </motion.p>
        <motion.blockquote
          className="max-w-4xl font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-6xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          "Building systems that
          <br />
          remain secure under adversarial conditions."
        </motion.blockquote>
        <motion.p
          className="mt-8 font-mono2 text-[11px] uppercase tracking-[0.3em] text-[#ece9e4]/70"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          — Dhruv Prajapati, Security Engineer
        </motion.p>
      </div>
    </section>
  )
}
