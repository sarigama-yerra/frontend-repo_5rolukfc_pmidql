import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Palette } from 'lucide-react'

const PRESET_COLORS = [
  '#22d3ee', // cyan-400
  '#a78bfa', // violet-400
  '#34d399', // emerald-400
  '#f472b6', // pink-400
  '#f59e0b', // amber-500
  '#60a5fa', // blue-400
]

export default function HeaderBar({ accent, onChangeAccent }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', accent)
  }, [accent])

  return (
    <div className="fixed top-0 left-0 right-0 z-20">
      <div className="backdrop-blur-md bg-white/60 dark:bg-black/40 border-b border-white/20 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full" style={{ background: 'var(--accent)' }} />
            <span className="font-semibold tracking-tight">Younes • Portfolio</span>
          </div>
          <div className="relative">
            <button
              aria-label="Change accent color"
              className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/20 hover:border-white/40 transition-colors"
              onClick={() => setOpen((v) => !v)}
            >
              <Palette size={16} style={{ color: 'var(--accent)' }} />
              <span className="text-sm">Theme</span>
            </button>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="absolute right-0 mt-2 p-2 rounded-lg shadow-lg bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-white/20"
              >
                <div className="grid grid-cols-6 gap-2">
                  {PRESET_COLORS.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        onChangeAccent(c)
                        setOpen(false)
                      }}
                      className="w-6 h-6 rounded-md ring-1 ring-black/10"
                      style={{ backgroundColor: c }}
                      aria-label={`Set theme color ${c}`}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      <div className="pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 0.8 }}
          className="h-16"
          style={{
            background: `radial-gradient(1200px 120px at 50% 0%, var(--accent), transparent 60%)`,
            filter: 'blur(20px)'
          }}
        />
      </div>
    </div>
  )
}
