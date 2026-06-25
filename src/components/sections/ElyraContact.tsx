"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { saveLead } from "@/lib/supabase"
import { openWhatsApp } from "@/lib/whatsapp"

export default function ElyraContact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", company: "", service: "" })
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone) return
    await saveLead({ name: form.name, phone: form.phone, email: form.email, company: form.company, service_interested: form.service, source_website: "elyra-ai" })
    openWhatsApp({ name: form.name, phone: form.phone, email: form.email, service: form.service })
    setSent(true)
  }

  return (
    <section id="contact" className="py-24 bg-[#0A0F1E]">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="font-grotesk text-4xl md:text-5xl font-bold text-white mb-4">Ready to Deploy Your First AI Employee?</h2>
          <p className="text-[#8892B0] text-lg">Book a free strategy call. We&apos;ll show you exactly which AI solution fits your business.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-white/3 border border-[#00D4FF]/20 rounded-3xl p-8">
          {sent ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold text-white mb-2">Message Received!</h3>
              <p className="text-[#8892B0]">Our AI strategy consultant will contact you within 2 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input required placeholder="Your Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#8892B0] text-sm outline-none focus:border-[#00D4FF] transition-colors" />
              <input required placeholder="Phone Number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#8892B0] text-sm outline-none focus:border-[#00D4FF] transition-colors" />
              <input type="email" placeholder="Email Address" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#8892B0] text-sm outline-none focus:border-[#00D4FF] transition-colors" />
              <input placeholder="Company Name" value={form.company} onChange={e => setForm({...form, company: e.target.value})}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#8892B0] text-sm outline-none focus:border-[#00D4FF] transition-colors" />
              <select value={form.service} onChange={e => setForm({...form, service: e.target.value})}
                className="md:col-span-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#00D4FF] transition-colors">
                <option value="">Which AI solution interests you?</option>
                {["AI Website Development","AI Lead Nurturing","SEO Automation","Custom AI Agents","AI Sales Agent","AI Recruitment Agent","Customer Support AI"].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <button type="submit" className="md:col-span-2 py-4 bg-gradient-to-r from-[#00D4FF] to-[#6E44FF] text-white rounded-xl font-bold text-lg transition-all duration-300 hover:opacity-90">
                Book Free Strategy Call →
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
