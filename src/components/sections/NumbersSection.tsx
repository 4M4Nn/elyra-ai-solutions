"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { numberPhases } from "@/lib/data"
gsap.registerPlugin(ScrollTrigger)
export default function NumbersSection() {
  const sec = useRef<HTMLElement>(null)
  useEffect(() => {
    const mm = gsap.matchMedia()
    const ctx = gsap.context(() => {
      const phases = sec.current?.querySelectorAll(".n-phase")
      if (!phases || phases.length === 0) return
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: sec.current, start: "top top", end: "+=250%", pin: true, pinSpacing: true, scrub: 1.5 } })
        gsap.set(phases, { opacity: 0, y: 40 })
        gsap.set(phases[0], { opacity: 1, y: 0 })
        tl.to(phases[0], { opacity: 0, y: -40, duration: 0.7 }, 0.7)
          .to(phases[1], { opacity: 1, y: 0, duration: 0.7 }, 0.7)
          .to(phases[1], { opacity: 0, y: -40, duration: 0.7 }, 1.6)
          .to(phases[2], { opacity: 1, y: 0, duration: 0.7 }, 1.6)
        return () => {}
      })
    }, sec)
    return () => { ctx.revert(); mm.revert() }
  }, [])
  return (
    <section ref={sec} className="relative min-h-screen flex items-center justify-center bg-[#080F18] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 40% 40% at 50% 50%, rgba(123,79,255,0.08) 0%, transparent 70%)" }} />
      <div className="relative z-10 text-center px-6">
        {numberPhases.map((p, i) => (
          <div key={i} className="n-phase" style={{ position: i === 0 ? "relative" : "absolute", inset: i === 0 ? "auto" : 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div className="font-space font-bold" style={{ fontSize: "clamp(72px,12vw,180px)", color: p.color, lineHeight: 1 }}>{p.num}</div>
            <p className="label text-[#4A6070] mt-4" style={{ letterSpacing: "3px" }}>{p.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
