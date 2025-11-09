import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import HeaderBar from './components/HeaderBar'
import Hero from './components/Hero'
import Terminal from './components/Terminal'
import Projects from './components/Projects'
import Contact from './components/Contact'

function useScrollToIds() {
  const aboutRef = useRef(null)
  const projectsRef = useRef(null)
  const contactRef = useRef(null)

  const scrollTo = (key) => {
    const map = { about: aboutRef, projects: projectsRef, contact: contactRef }
    const r = map[key]
    if (r?.current) r.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return { aboutRef, projectsRef, contactRef, scrollTo }
}

export default function App() {
  const [accent, setAccent] = useState('#22d3ee')
  const { aboutRef, projectsRef, contactRef, scrollTo } = useScrollToIds()

  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-300/20 selection:text-white">
      <HeaderBar accent={accent} onChangeAccent={setAccent} />

      <Hero onStart={() => scrollTo('about')} />

      <div ref={aboutRef}>
        <section className="py-20 bg-gradient-to-b from-zinc-950 via-black to-black">
          <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl font-semibold">About Me</h2>
              <p className="mt-4 text-zinc-300 leading-relaxed">
                I’m Younes, a full‑stack developer who blends engineering with narrative design. I love building
                immersive, playful interfaces backed by robust systems. My toolkit spans React, Node, Python, and 3D on the web.
              </p>
              <p className="mt-3 text-zinc-400">
                I believe software should feel alive — thoughtful motion, tactile micro‑interactions, and a clear story.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
              <div className="relative rounded-2xl border border-white/10 p-6 bg-gradient-to-br from-zinc-900/60 to-black/60">
                <div className="text-sm text-zinc-300">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block w-2 h-2 rounded-full" style={{ background: 'var(--accent)' }} />
                    <span className="font-semibold">Stack</span>
                  </div>
                  <ul className="grid grid-cols-2 gap-2">
                    {['React', 'Next.js', 'Node', 'Python', 'Tailwind', 'Framer Motion'].map((s) => (
                      <li key={s} className="px-2 py-1 rounded bg-white/5 border border-white/10">{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <Terminal onNavigate={scrollTo} />

      <div ref={projectsRef}>
        <Projects />
      </div>

      <div ref={contactRef}>
        <Contact />
      </div>

      <footer className="py-10 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} Younes — Crafted with care.
      </footer>
    </div>
  )
}
