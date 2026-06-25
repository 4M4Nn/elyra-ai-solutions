"use client"
import { useState } from "react"
import { saveLead } from "@/lib/supabase"
import { openWhatsApp } from "@/lib/whatsapp"
import { serviceInterests, siteConfig } from "@/lib/data"
export default function ContactSection() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", company: "", message: "" })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone) return
    setLoading(true)
    await saveLead({ name: form.name, phone: form.phone, email: form.email, service_interested: form.service, source_website: "elyra-ai", message: `Company: ${form.company}. ${form.message}` })
    openWhatsApp({ name: form.name, phone: form.phone, email: form.email, service: form.service })
    setSent(true); setLoading(false)
  }
  const inp = "w-full bg-transparent border-b border-white/20 focus:border-[#00D4C8] outline-none text-white placeholder-white/30 py-3 font-inter text-base transition-colors"
  return (
    <section id="contact" className="py-32 bg-[#080F18] px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="label text-[#00D4C8] mb-4" style={{ letterSpacing: "3px" }}>/ Deploy AI</p>
          <h2 className="font-space font-bold text-white" style={{ fontSize: "clamp(36px,5vw,72px)", lineHeight: 1 }}>Ready to build<br />with AI?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="flex flex-col gap-6">
            {[{ label: "Phone", val: siteConfig.phone }, { label: "Email", val: siteConfig.email }, { label: "Location", val: siteConfig.location }].map(item => (
              <div key={item.label}>
                <p className="label text-[#4A6070] mb-1">{item.label}</p>
                <p className="font-inter text-white text-sm">{item.val}</p>
              </div>
            ))}
            <div className="mt-4 p-5 rounded-xl border border-[#00D4C8]/15" style={{ background: "rgba(0,212,200,0.03)" }}>
              <p className="font-space font-semibold text-white text-sm mb-1">Free AI Consultation</p>
              <p className="font-inter text-[#4A6070] text-xs leading-relaxed">Tell us about your business challenge. We&apos;ll design a custom AI solution and show you exactly how it works — in your first call.</p>
            </div>
          </div>
          {sent ? (
            <div className="flex flex-col justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#00D4C8]/20 flex items-center justify-center text-[#00D4C8] text-xl">⬡</div>
              <h3 className="font-space text-2xl text-white">AI consultation booked!</h3>
              <p className="font-inter text-[#4A6070]">Our AI team will contact you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-6">
              <input required placeholder="Full Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={inp} />
              <input required placeholder="Phone Number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className={inp} />
              <input type="email" placeholder="Email Address" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className={inp} />
              <input placeholder="Company Name" value={form.company} onChange={e => setForm({...form, company: e.target.value})} className={inp} />
              <select value={form.service} onChange={e => setForm({...form, service: e.target.value})} className={inp + " bg-transparent"}>
                <option value="" className="bg-[#080F18]">AI Service Needed</option>
                {serviceInterests.map(s => <option key={s} value={s} className="bg-[#080F18]">{s}</option>)}
              </select>
              <textarea placeholder="Describe your automation challenge" value={form.message} onChange={e => setForm({...form, message: e.target.value})} rows={3} className={inp + " resize-none"} />
              <button type="submit" disabled={loading} className="w-full h-14 bg-[#00D4C8] hover:bg-[#00F0E3] text-[#050B12] font-space font-bold text-base transition-colors disabled:opacity-70 rounded-sm">
                {loading ? "Sending..." : "Deploy AI in 7 Days →"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
