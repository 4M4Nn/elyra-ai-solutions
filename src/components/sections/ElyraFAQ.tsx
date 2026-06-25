"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { faqs } from "@/lib/data"
import { ChevronDown } from "lucide-react"

export default function ElyraFAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="py-24 bg-[#050816]">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="font-grotesk text-4xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-[#8892B0]">Everything you need to know about AI automation for your business.</p>
        </motion.div>
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className={`border rounded-2xl overflow-hidden transition-colors ${open === i ? "border-[#00D4FF]/40 bg-[#00D4FF]/5" : "border-white/10 bg-white/3"}`}>
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between px-6 py-4 text-left">
                <span className="text-white font-medium text-sm pr-4">{faq.q}</span>
                <ChevronDown size={16} className={`text-[#00D4FF] flex-shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && <div className="px-6 pb-5 text-[#8892B0] text-sm leading-relaxed">{faq.a}</div>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
