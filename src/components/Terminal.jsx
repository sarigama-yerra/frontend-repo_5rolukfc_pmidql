import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const helpText = `Available commands:\n- about: Learn who I am\n- projects: Explore featured work\n- contact: Jump to contact form\n- help: Show this help`;

function Line({ children }) {
  return <div className="font-mono text-sm md:text-base leading-relaxed text-zinc-100">{children}</div>
}

export default function Terminal({ onNavigate, onKeySignal }) {
  const [history, setHistory] = useState([
    'Welcome to the interactive terminal. Type "help" to get started.'
  ])
  const [input, setInput] = useState('')
  const containerRef = useRef(null)

  useEffect(() => {
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' })
  }, [history])

  const runCommand = (cmd) => {
    const clean = cmd.trim().toLowerCase()
    if (!clean) return

    let output = ''
    if (clean === 'help') output = helpText
    else if (clean === 'about') output = "I'm Younes — a full‑stack developer who loves crafting playful, human experiences with solid engineering." 
    else if (clean === 'projects') output = 'Opening projects…'
    else if (clean === 'contact') output = 'Jumping to contact…'
    else output = `Unknown command: ${clean}. Type "help".`

    setHistory((h) => [...h, `$ ${cmd}`, output])

    if (clean === 'projects') onNavigate('projects')
    if (clean === 'contact') onNavigate('contact')
    if (clean === 'about') onNavigate('about')
  }

  const handleKey = (e) => {
    const key = e.key
    onKeySignal?.(key)
    if (e.key === 'Enter') {
      runCommand(input)
      setInput('')
    }
  }

  return (
    <section className="relative py-10 md:py-20 bg-gradient-to-b from-black via-zinc-900 to-black">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-white text-2xl md:text-3xl font-semibold mb-6">Interactive Terminal</motion.h2>
        <div className="rounded-xl border border-white/10 bg-zinc-900/80 backdrop-blur p-4 md:p-6 shadow-2xl">
          <div className="flex items-center gap-1 mb-4">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-400/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
            <span className="ml-3 text-xs text-zinc-400">younes@portfolio — bash</span>
          </div>
          <div ref={containerRef} className="h-64 md:h-72 overflow-y-auto pr-2 space-y-2">
            <AnimatePresence>
              {history.map((line, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Line>{line}</Line>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="mt-4 flex items-center font-mono text-zinc-100">
            <span className="mr-2" style={{ color: 'var(--accent)' }}>$</span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Type a command: about | projects | contact | help"
              className="flex-1 bg-transparent outline-none placeholder:text-zinc-500"
              aria-label="Terminal input"
            />
            <span className="ml-1 animate-pulse">▌</span>
          </div>
        </div>
      </div>
    </section>
  )
}
