import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Contact() {
  const [status, setStatus] = useState('idle')

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    // Fake delay to simulate submission
    await new Promise((r) => setTimeout(r, 900))
    const ok = Math.random() > 0.1
    setStatus(ok ? 'success' : 'error')
  }

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-black to-zinc-950 text-white">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-semibold mb-8">Contact</motion.h2>
        <div className="rounded-2xl border border-white/10 bg-zinc-900/60 backdrop-blur p-6">
          <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-zinc-300 mb-1">Name</label>
                <input required className="w-full rounded-md bg-black/40 border border-white/10 p-3 outline-none focus:border-white/30" />
              </div>
              <div>
                <label className="block text-sm text-zinc-300 mb-1">Email</label>
                <input type="email" required className="w-full rounded-md bg-black/40 border border-white/10 p-3 outline-none focus:border-white/30" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-zinc-300 mb-1">Message</label>
              <textarea rows={5} required className="w-full rounded-md bg-black/40 border border-white/10 p-3 outline-none focus:border-white/30" />
            </div>
            <div className="flex items-center gap-3">
              <button disabled={status==='loading'} className="relative inline-flex items-center gap-2 px-5 py-3 rounded-md font-semibold text-black disabled:opacity-60" style={{ background: 'var(--accent)' }}>
                {status === 'loading' ? 'Sending…' : 'Send Message'}
                <span className="absolute inset-0 -z-10 rounded-md blur-xl opacity-60" style={{ background: 'var(--accent)' }} />
              </button>
              {status === 'success' && <span className="text-emerald-400">Sent! I’ll get back to you soon.</span>}
              {status === 'error' && <span className="text-red-400">Something went wrong. Try again.</span>}
            </div>
          </form>
          <div className="mt-6 text-sm text-zinc-400">
            <p>Email: <a href="mailto:younes@example.com" className="underline" style={{ color: 'var(--accent)' }}>younes@example.com</a></p>
            <p>Phone: <a href="tel:+1234567890" className="underline" style={{ color: 'var(--accent)' }}>+1 (234) 567-890</a></p>
          </div>
        </div>
      </div>
    </section>
  )
}
