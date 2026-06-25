"use client"
import { motion } from "framer-motion"
import { caseStudies } from "@/lib/data"

export default function ElyraCaseStudies() {
  return (
    <section className="py-24 bg-[#0A0F1E]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-[#00FFB2] text-xs tracking-widest uppercase font-medium">Proven Results</span>
          <h2 className="font-grotesk text-4xl md:text-5xl font-bold text-white mt-3 mb-4">Real Businesses. Real Growth.</h2>
          <p className="text-[#8892B0] max-w-2xl mx-auto">Case studies from Kerala businesses that deployed Elyra AI and saw measurable results.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((cs, i) => (
            <motion.div key={cs.client} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-white/3 border border-white/10 rounded-2xl p-6 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D4FF]/20 to-[#6E44FF]/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-[#00D4FF]">{cs.client[0]}</span>
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{cs.client}</p>
                  <p className="text-[#8892B0] text-xs">{cs.industry}</p>
                </div>
              </div>
              <p className="text-[#8892B0] text-sm leading-relaxed mb-4 flex-1">{cs.description}</p>
              <div className="bg-[#00FFB2]/5 border border-[#00FFB2]/20 rounded-xl p-3 mb-4">
                <p className="text-[#00FFB2] font-bold text-sm">🚀 {cs.result}</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {cs.metrics.map((m) => (
                  <div key={m.label} className="text-center bg-white/5 rounded-lg p-2">
                    <p className="text-[#00D4FF] font-bold text-sm">{m.value}</p>
                    <p className="text-[#8892B0] text-xs">{m.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
