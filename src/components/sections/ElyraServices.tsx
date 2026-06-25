"use client"
import { motion } from "framer-motion"
import { Globe, Users, TrendingUp, Brain, DollarSign, Briefcase, MessageSquare, type LucideIcon } from "lucide-react"
import { services } from "@/lib/data"

const iconMap: Record<string, LucideIcon> = { Globe, Users, TrendingUp, Brain, DollarSign, Briefcase, MessageSquare }

export default function ElyraServices() {
  return (
    <section id="services" className="py-24 bg-[#050816]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-[#00D4FF] text-xs tracking-widest uppercase font-medium">What We Build</span>
          <h2 className="font-grotesk text-4xl md:text-5xl font-bold text-white mt-3 mb-4">AI Solutions For Every Function</h2>
          <p className="text-[#8892B0] max-w-2xl mx-auto">From lead generation to customer support — intelligent systems that replace repetitive human work.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => {
            const Icon = iconMap[svc.icon] || Brain
            return (
              <motion.div key={svc.number} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white/3 border border-white/10 rounded-2xl p-6 hover:border-[#00D4FF]/40 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: svc.color + "20" }}>
                    <Icon size={22} style={{ color: svc.color }} />
                  </div>
                  <span className="text-xs font-mono text-[#8892B0]">{svc.number}</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{svc.title}</h3>
                <p className="text-[#8892B0] text-sm leading-relaxed mb-4">{svc.description}</p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold" style={{ backgroundColor: svc.color + "15", color: svc.color }}>
                  ✓ {svc.result}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
