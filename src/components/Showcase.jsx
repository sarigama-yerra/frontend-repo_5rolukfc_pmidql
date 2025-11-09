import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Terminal from './Terminal'
import Keyboard from './Keyboard'
import { ExternalLink, Code } from 'lucide-react'

const FEATURED = {
  title: 'Neon Nodes',
  video: 'https://www.w3schools.com/html/mov_bbb.mp4',
  description: 'A real‑time visual system that turns data streams into playful 3D compositions.',
  problem: 'Make complex telemetry intuitive and delightful.',
  stack: ['Next.js', 'Three.js', 'WebSockets']
}

const MORE_PROJECTS = [
  {
    title: 'StoryCart',
    thumb: 'https://images.unsplash.com/photo-1515165562835-c3b8cce5f2b3?q=80&w=1200&auto=format&fit=crop',
    desc: 'An e‑commerce journey narrated like a choose‑your‑own‑adventure.',
    tags: ['Remix', 'Tailwind', 'Stripe'],
    code: 'https://github.com/',
    demo: 'https://example.com'
  },
  {
    title: 'PulseDesk',
    thumb: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop',
    desc: 'Ops dashboard with streaming metrics and anomaly stories.',
    tags: ['Next.js', 'tRPC', 'Framer Motion'],
    code: 'https://github.com/',
    demo: 'https://example.com'
  },
  {
    title: 'SceneForge',
    thumb: 'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?q=80&w=1200&auto=format&fit=crop',
    desc: '3D scene editor for the browser with timeline editing.',
    tags: ['React', 'Three.js', 'Zustand'],
    code: 'https://github.com/',
    demo: 'https://example.com'
  },
  {
    title: 'EchoNotes',
    thumb: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200&auto=format&fit=crop',
    desc: 'AI‑assisted notes that turn ideas into concise briefs.',
    tags: ['Next.js', 'OpenAI', 'Supabase'],
    code: 'https://github.com/',
    demo: 'https://example.com'
  }
]

const SKILLS = [
  { label: 'React', stat: '5+ yrs' },
  { label: 'Next.js', stat: '4+ yrs' },
  { label: 'Node.js', stat: '6+ yrs' },
  { label: 'Python', stat: '6+ yrs' },
  { label: 'Three.js', stat: '3+ yrs' },
  { label: 'Tailwind', stat: '4+ yrs' }
]

const TIMELINE = [
  { year: '2018', title: 'First shipped app', note: 'CLI to web journey begins.' },
  { year: '2020', title: 'Joined startup', note: 'Scaled full‑stack systems.' },
  { year: '2022', title: '3D on the web', note: 'Motion + spatial UI exploration.' },
  { year: '2024', title: 'Narrative UIs', note: 'Cinematic UX for data tools.' }
]

export default function Showcase({ onNavigate }) {
  const [lastKey, setLastKey] = useState('')
  const projectsAnchorRef = useRef(null)

  const handleNavigate = (key) => {
    if (key === 'projects') {
      projectsAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else if (key === 'contact') {
      onNavigate?.('contact')
    } else if (key === 'about') {
      // Keep in section for now; could map to skills
      projectsAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="relative py-24 bg-black text-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl font-semibold mb-8">Workstation</motion.h2>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Left: reactive keyboard */}
          <div>
            <Keyboard pressed={lastKey} />
          </div>

          {/* Right: terminal */}
          <div className="min-h-full">
            <Terminal onNavigate={handleNavigate} onKeySignal={(k) => setLastKey(k)} />
          </div>
        </div>

        {/* Featured project with narrative */}
        <div ref={projectsAnchorRef} className="mt-16 rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/60 backdrop-blur">
          <div className="aspect-video bg-black">
            <motion.video
              src={FEATURED.video}
              controls
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            />
          </div>
          <div className="p-6 grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold">{FEATURED.title}</h3>
              <p className="mt-2 text-zinc-300">{FEATURED.description}</p>
              <p className="mt-2 text-zinc-400"><span className="text-zinc-300">Challenge:</span> {FEATURED.problem}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {FEATURED.stack.map((s) => (
                  <span key={s} className="px-2 py-1 rounded-full text-xs" style={{ background: 'color-mix(in oklab, var(--accent) 30%, black)' }}>{s}</span>
                ))}
              </div>
            </div>
            <div className="flex md:flex-col gap-3 items-stretch md:items-end justify-end">
              <a href="#" className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-white/20 hover:border-white/40 transition" style={{ color: 'var(--accent)' }}>
                <Code size={16} /> View Code
              </a>
              <a href="#" className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-black font-semibold" style={{ background: 'var(--accent)' }}>
                <ExternalLink size={16} /> Live Demo
              </a>
            </div>
          </div>
        </div>

        {/* More projects grid */}
        <div className="mt-12 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {MORE_PROJECTS.map((p) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group rounded-xl overflow-hidden border border-white/10 bg-zinc-900/50 backdrop-blur hover:border-white/30 transition">
              <div className="relative aspect-video overflow-hidden">
                <img src={p.thumb} alt="" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-500" />
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'radial-gradient(400px 200px at 50% 100%, var(--accent), transparent 60%)', mixBlendMode: 'screen' }} />
              </div>
              <div className="p-4">
                <h4 className="font-semibold">{p.title}</h4>
                <p className="mt-1 text-sm text-zinc-400">{p.desc}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-full text-xs border border-white/10" style={{ background: 'color-mix(in oklab, var(--accent) 18%, black)' }}>{t}</span>
                  ))}
                </div>
                <div className="mt-4 flex gap-3">
                  <a href={p.code} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/20 hover:border-white/40 transition text-sm" style={{ color: 'var(--accent)' }}>
                    <Code size={14} /> Code
                  </a>
                  <a href={p.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm text-black font-medium" style={{ background: 'var(--accent)' }}>
                    <ExternalLink size={14} /> Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills & Tools */}
        <div className="mt-20">
          <motion.h3 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl font-semibold">My Skills & Tools</motion.h3>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILLS.map((s) => (
              <motion.div key={s.label} whileHover={{ y: -3 }} className="relative rounded-xl p-5 border border-white/10 bg-zinc-900/50 backdrop-blur">
                <div className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition pointer-events-none" style={{ background: 'radial-gradient(360px 120px at 50% 0%, var(--accent), transparent 60%)', filter: 'blur(10px)' }} />
                <div className="relative z-10">
                  <div className="text-lg font-medium">{s.label}</div>
                  <div className="mt-1 text-sm text-zinc-400">Experience: <span style={{ color: 'var(--accent)' }}>{s.stat}</span></div>
                  <div className="mt-3 text-xs text-zinc-500">Hover for glow • Focused, production‑ready expertise.</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Journey / Timeline */}
        <div className="mt-20">
          <motion.h3 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl font-semibold">Journey</motion.h3>
          <div className="mt-6 relative">
            <div className="absolute left-2 md:left-1/2 top-0 bottom-0 w-px bg-white/10" />
            <div className="grid md:grid-cols-2 gap-8">
              {TIMELINE.map((item, idx) => (
                <motion.div key={item.year} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`relative ${idx % 2 === 0 ? 'md:text-right md:pr-10' : 'md:text-left md:pl-10'}`}>
                  <div className={`hidden md:block absolute top-2 ${idx % 2 === 0 ? 'right-[-7px]' : 'left-[-7px]'} w-3 h-3 rounded-full`} style={{ background: 'var(--accent)' }} />
                  <div className="rounded-xl border border-white/10 bg-zinc-900/50 backdrop-blur p-4">
                    <div className="text-sm text-zinc-400">{item.year}</div>
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-zinc-400 text-sm mt-1">{item.note}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
