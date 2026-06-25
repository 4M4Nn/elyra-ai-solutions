"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { services } from "@/lib/data"
gsap.registerPlugin(ScrollTrigger)

function ServiceCard({ s, i }: { s: typeof services[0]; i: number }) {
  const sec = useRef<HTMLElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const left = sec.current?.querySelector(".sl")
      const right = sec.current?.querySelector(".sr")
      if (!left || !right) return
      gsap.set(left, { x: -60, opacity: 0 })
      gsap.set(right, { x: 60, opacity: 0 })
      ScrollTrigger.create({ trigger: sec.current, start: "top 75%",
        onEnter: () => {
          gsap.to(left, { x: 0, opacity: 1, duration: 1, ease: "power4.out" })
          gsap.to(right, { x: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.1 })
        }
      })
    }, sec)
    return () => ctx.revert()
  }, [])
  const isEven = i % 2 === 0
  const accent = isEven ? "#00D4C8" : "#7B4FFF"
  return (
    <section ref={sec} className="min-h-screen flex items-center border-b border-white/5 px-6 md:px-12 py-24" style={{ background: isEven ? "#050B12" : "#080F18" }}>
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className={`sl ${isEven ? "" : "md:order-2"}`}>
          <p className="label mb-4" style={{ color: accent, letterSpacing: "3px" }}>{s.num} / AI Service</p>
          <h2 className="font-space font-bold text-white mb-4" style={{ fontSize: "clamp(28px,4vw,54px)", lineHeight: 1.1 }}>{s.name}</h2>
          <p className="font-inter text-[#4A6070] mb-8" style={{ fontSize: 17, lineHeight: 1.7 }}>{s.desc}</p>
          <a href="#contact" className="inline-flex items-center gap-2 font-space font-medium text-sm hover:gap-3 transition-all" style={{ color: accent }}>
            Deploy This Solution →
          </a>
        </div>
        <div className={`sr ${isEven ? "" : "md:order-1"} flex items-center justify-center min-h-[220px] rounded-2xl`}
          style={{ background: `linear-gradient(135deg, ${accent}08 0%, rgba(5,11,18,0.5) 100%)`, border: `1px solid ${accent}15` }}>
          <div className="text-center p-10">
            <div className="font-space font-bold mb-2" style={{ fontSize: "clamp(40px,6vw,72px)", color: accent }}>{s.stat}</div>
            <p className="label text-[#4A6070]" style={{ letterSpacing: "2px" }}>{s.statLabel}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function ServicesSection() {
  return <div id="services">{services.map((s, i) => <ServiceCard key={s.id} s={s} i={i} />)}</div>
}
