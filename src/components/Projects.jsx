import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ExternalLink, Code } from 'lucide-react'

const PROJECTS = [
  {
    title: 'Neon Nodes',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    description: 'A real‑time visual system that turns data streams into playful 3D compositions.',
    problem: 'Finding a way to make complex telemetry feel intuitive and delightful.',
    stack: ['Next.js', 'Three.js', 'WebSockets'],
    code: 'https://github.com/',
    demo: 'https://example.com',
  },
  {
    title: 'StoryCart',
    video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    description: 'An e‑commerce experience narrated like a choose‑your‑own‑adventure.',
    problem: 'Reducing buyer friction by guiding users through micro‑decisions.',
    stack: ['Remix', 'Tailwind', 'Stripe'],
    code: 'https://github.com/',
    demo: 'https://example.com',
  },
]

export default function Projects() {
  const [index, setIndex] = useState(0)

  const next = () => setIndex((i) => (i + 1) % PROJECTS.length)
  const prev = () => setIndex((i) => (i - 1 + PROJECTS.length) % PROJECTS.length)

  const p = PROJECTS[index]

  return (
    <section id="projects" className="py-24 bg-black text-white">
      <div className="max-w-5xl mx-auto px-6">
        <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-semibold mb-8">Projects</motion.h2>

        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/60 backdrop-blur">
          <div className="aspect-video bg-black">
            <AnimatePresence mode="wait">
              <motion.video
                key={p.title}
                src={p.video}
                controls
                className="w-full h-full object-cover"
                initial={{ opacity: 0, rotateY: -10 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: 10 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
          </div>

          <div className="p-6 grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold">{p.title}</h3>
              <p className="mt-2 text-zinc-300">{p.description}</p>
              <p className="mt-2 text-zinc-400"><span className="text-zinc-300">Challenge:</span> {p.problem}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span key={s} className="px-2 py-1 rounded-full text-xs" style={{ background: 'color-mix(in oklab, var(--accent) 30%, black)' }}>{s}</span>
                ))}
              </div>
            </div>
            <div className="flex md:flex-col gap-3 items-stretch md:items-end justify-end">
              <a href={p.code} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-white/20 hover:border-white/40 transition" style={{ color: 'var(--accent)' }}>
                <Code size={16} /> View Code
              </a>
              <a href={p.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-black font-semibold" style={{ background: 'var(--accent)' }}>
                <ExternalLink size={16} /> Live Demo
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button onClick={prev} className="px-4 py-2 rounded-md border border-white/20 hover:border-white/40">Previous</button>
          <div className="text-sm text-zinc-400">Chapter {index + 1} / {PROJECTS.length}</div>
          <button onClick={next} className="px-4 py-2 rounded-md border border-white/20 hover:border-white/40">Next</button>
        </div>
      </div>
    </section>
  )
}
