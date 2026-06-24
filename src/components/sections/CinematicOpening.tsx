"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const lines = [
  "I am NOVA.",
  "Your AI Employee.",
  "I generate websites.",
  "I nurture leads.",
  "I automate sales.",
  "I never sleep.",
  "Let me show you what I can do.",
]

export default function CinematicOpening() {
  const [lineIndex, setLineIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const [skipped, setSkipped] = useState(false)

  useEffect(() => {
    if (skipped) { setVisible(false); return }
    if (lineIndex < lines.length - 1) {
      const t = setTimeout(() => setLineIndex(lineIndex + 1), 1200)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => setVisible(false), 1500)
      return () => clearTimeout(t)
    }
  }, [lineIndex, skipped])

  if (!visible) return null

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-[100] bg-[#050816] flex items-center justify-center overflow-hidden" exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, backgroundColor: i % 2 === 0 ? "#00D4FF" : "#6E44FF" }}
              animate={{ opacity: [0, 0.6, 0], scale: [0, 1, 0] }}
              transition={{ duration: 3, delay: Math.random() * 5, repeat: Infinity }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-radial from-[#00D4FF]/5 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 text-center max-w-lg px-6">
          <motion.div
            className="w-24 h-24 rounded-full mx-auto mb-12 nova-glow relative"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 1 }}>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#6E44FF] opacity-30" />
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#6E44FF] opacity-60" />
            <div className="absolute inset-4 rounded-full bg-[#050816] flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-[#00D4FF]" />
            </div>
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.p key={lineIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="font-grotesk text-2xl md:text-4xl text-white font-bold">
              {lines[lineIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
        <button onClick={() => setSkipped(true)} className="absolute bottom-8 right-8 text-[#8892B0] hover:text-white text-sm tracking-widest">SKIP &rarr;</button>
      </motion.div>
    </AnimatePresence>
  )
}
