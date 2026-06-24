"use client"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"

const OrbitalScene = dynamic(() => import("@/components/three/OrbitalScene"), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full"><div className="w-16 h-16 border-2 border-[#00D4FF] rounded-full animate-spin border-t-transparent" /></div>,
})

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#050816]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/5 via-transparent to-[#6E44FF]/5" />
      <div className="relative z-10 w-full md:w-1/2 px-6 md:px-16 py-32">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00D4FF]/30 bg-[#00D4FF]/10 mb-8">
          <div className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" />
          <span className="text-[#00D4FF] text-xs tracking-widest font-medium uppercase">Kerala&apos;s #1 AI Automation Company</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="font-grotesk text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
          AI Employees<br />
          That Work <span className="cyan-gradient">24/7</span><br />
          For Your Business.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          className="text-[#8892B0] text-lg leading-relaxed mb-10 max-w-lg">
          From AI websites and lead nurturing to sales, recruitment and support &mdash; Elyra AI builds intelligent systems that scale your business without scaling your headcount.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="flex flex-col sm:flex-row gap-4">
          <a href="#services" className="px-8 py-4 bg-gradient-to-r from-[#00D4FF] to-[#6E44FF] text-white rounded-full font-bold transition-all duration-300 text-center">See Our Solutions</a>
          <a href="#contact" className="px-8 py-4 border border-white/20 hover:border-[#00D4FF] text-white rounded-full font-medium transition-all duration-300 text-center">Book Free Call</a>
        </motion.div>
      </div>
      <div className="hidden md:block absolute right-0 top-0 w-1/2 h-full">
        <OrbitalScene />
      </div>
    </section>
  )
}
