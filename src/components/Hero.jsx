import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'

export default function Hero({ onStart }) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
        >
          Hey there 👋 I’m Younes — I build smart, creative digital experiences.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 text-lg md:text-2xl text-white/90"
        >
          Full-Stack Developer • Designer • Storyteller
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex justify-center"
        >
          <button
            onClick={onStart}
            className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold"
            style={{ background: 'var(--accent)' }}
          >
            <span className="relative z-10">Start Exploring</span>
            <span className="absolute inset-0 rounded-full blur-lg opacity-70" style={{ background: 'var(--accent)' }} />
          </button>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
    </section>
  )
}
