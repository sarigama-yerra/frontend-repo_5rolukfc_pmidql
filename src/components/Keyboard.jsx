import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

// Simple visual keyboard that highlights pressed keys with a glow/press effect
// Keys are grouped by rows for layout. We support letters, numbers, and a few symbols.
const ROWS = [
  ['esc','1','2','3','4','5','6','7','8','9','0','-','=', 'backspace'],
  ['tab','q','w','e','r','t','y','u','i','o','p','[',']','\\'],
  ['caps','a','s','d','f','g','h','j','k','l',';','\'','enter'],
  ['shift','z','x','c','v','b','n','m',',','.','/','shift'],
  ['ctrl','win','alt','space','alt','fn','menu','ctrl']
]

const keyLabel = (k) => {
  const labels = { backspace: '⌫', tab: '↹', caps: '⇪', enter: '↵', shift: '⇧', ctrl: '⌃', alt: '⌥', win: '◆', menu: '≣', space: '' }
  return labels[k] ?? k.toUpperCase()
}

function Key({ active, children, wide }) {
  return (
    <motion.div
      initial={false}
      animate={{
        y: active ? 2 : 0,
        boxShadow: active
          ? '0 0 0 1px rgba(255,255,255,0.12), 0 6px 24px rgba(0,0,0,0.6), 0 0 32px var(--accent)'
          : '0 0 0 1px rgba(255,255,255,0.12), 0 6px 24px rgba(0,0,0,0.6)'
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={`relative select-none rounded-md bg-zinc-900/70 backdrop-blur text-zinc-200 border border-white/10 h-10 flex items-center justify-center text-xs md:text-sm ${wide ? 'col-span-2' : ''}`}
      style={{
        backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.2))'
      }}
    >
      <span className="pointer-events-none" style={{ color: active ? 'var(--accent)' : undefined }}>{children}</span>
      {active && (
        <span className="absolute inset-0 rounded-md blur-xl opacity-60" style={{ background: 'var(--accent)' }} />
      )}
    </motion.div>
  )
}

export default function Keyboard({ pressed }) {
  // Maintain a transient set of active keys that fades after a short delay
  const [active, setActive] = useState(new Set())

  useEffect(() => {
    if (!pressed) return
    const k = normalizeKey(pressed)
    if (!k) return
    setActive((prev) => new Set(prev).add(k))
    const to = setTimeout(() => {
      setActive((prev) => {
        const n = new Set(prev)
        n.delete(k)
        return n
      })
    }, 220)
    return () => clearTimeout(to)
  }, [pressed])

  const rows = useMemo(() => ROWS, [])

  return (
    <div className="w-full">
      <div className="relative rounded-2xl border border-white/10 p-4 md:p-6 bg-gradient-to-br from-zinc-900/60 to-black/60 shadow-2xl">
        <div className="absolute -inset-1 rounded-3xl opacity-30 blur-2xl pointer-events-none" style={{ background: 'radial-gradient(600px 120px at 50% 0%, var(--accent), transparent 60%)' }} />
        <div className="grid gap-2">
          {rows.map((row, idx) => (
            <div key={idx} className="grid gap-2" style={{ gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))` }}>
              {row.map((k, i) => (
                <Key key={i} active={active.has(k)} wide={k==='space'}>
                  {k==='space' ? ' ' : keyLabel(k)}
                </Key>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function normalizeKey(key) {
  if (!key) return ''
  const map = {
    ' ': 'space',
    'shift': 'shift',
    'control': 'ctrl',
    'alt': 'alt',
    'meta': 'win',
    'enter': 'enter',
    'backspace': 'backspace',
    'tab': 'tab',
    '[': '[',
    ']': ']',
    ';': ';',
    "'": "'",
    ',': ',',
    '.': '.',
    '/': '/',
    '-': '-',
    '=': '=',
    '\\': '\\'
  }
  const lower = String(key).toLowerCase()
  if (map[lower]) return map[lower]
  if (/^[a-z0-9]$/.test(lower)) return lower
  return ''
}
