"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { testimonials } from "@/lib/data"
gsap.registerPlugin(ScrollTrigger)
export default function TestimonialsSection() {
  const sec = useRef<HTMLElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sec.current?.querySelectorAll(".t-card")
      if (!cards) return
      gsap.set(cards, { opacity: 0, y: 40 })
      ScrollTrigger.create({ trigger: sec.current, start: "top 70%", onEnter: () => gsap.to(cards, { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power3.out" }) })
    }, sec)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={sec} id="testimonials" className="py-32 bg-[#050B12] px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="label text-[#00D4C8] mb-4" style={{ letterSpacing: "3px" }}>/ Client Results</p>
          <h2 className="font-space font-bold text-white" style={{ fontSize: "clamp(32px,5vw,60px)", lineHeight: 1.1 }}>AI results. Real businesses.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <div key={t.initials} className="t-card p-8 rounded-2xl border border-[#00D4C8]/10 hover:border-[#00D4C8]/25 transition-colors" style={{ background: "linear-gradient(135deg, rgba(0,212,200,0.03) 0%, rgba(123,79,255,0.03) 100%)" }}>
              <p className="font-inter text-white/70 text-sm leading-relaxed mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#00D4C8] flex items-center justify-center font-space font-bold text-[#050B12] text-sm">{t.initials}</div>
                <div>
                  <p className="font-space font-semibold text-white text-sm">{t.name}</p>
                  <p className="font-inter text-[#00D4C8] text-xs">{t.co}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
