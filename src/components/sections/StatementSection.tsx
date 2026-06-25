"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { statement } from "@/lib/data"
gsap.registerPlugin(ScrollTrigger)
export default function StatementSection() {
  const sec = useRef<HTMLElement>(null)
  const wordsRef = useRef<HTMLSpanElement[]>([])
  const tagRef = useRef<HTMLDivElement>(null)
  const words = statement.split(" ")
  useEffect(() => {
    const mm = gsap.matchMedia()
    const ctx = gsap.context(() => {
      const wEls = wordsRef.current.filter(Boolean)
      gsap.set(wEls, { color: "rgba(255,255,255,0.06)" })
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: sec.current, start: "top top", end: `+=${words.length * 65}`, pin: true, pinSpacing: true, scrub: 1.5 } })
        tl.to(wEls, { color: "#ffffff", stagger: { each: 0.04 }, ease: "none" })
          .from(tagRef.current, { opacity: 0, y: 20, duration: 1 }, "-=0.5")
        return () => {}
      })
      mm.add("(max-width: 767px)", () => {
        gsap.to(wEls, { color: "#ffffff", stagger: { each: 0.06 }, scrollTrigger: { trigger: sec.current, start: "top 70%", end: "bottom 30%", scrub: 1 } })
        return () => {}
      })
    }, sec)
    return () => { ctx.revert(); mm.revert() }
  }, [words.length])
  return (
    <section ref={sec} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6" style={{ background: "#050B12" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0,212,200,0.04) 0%, transparent 70%)" }} />
      <div className="relative z-10 max-w-4xl text-center">
        <p className="font-space font-medium leading-relaxed" style={{ fontSize: "clamp(20px,3.2vw,42px)" }}>
          {words.map((w, i) => <span key={i} ref={el => { if (el) wordsRef.current[i] = el }} className="inline-block mr-[0.28em]">{w}</span>)}
        </p>
        <div ref={tagRef} className="mt-10 flex flex-col items-center gap-3 opacity-0">
          <div className="w-20 h-px bg-[#00D4C8]" />
          <p className="label text-[#00D4C8]" style={{ letterSpacing: "3px" }}>Elyra AI Philosophy</p>
        </div>
      </div>
    </section>
  )
}
