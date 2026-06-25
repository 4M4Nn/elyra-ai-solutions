"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

function NeuralBg() {
  const nodes = Array.from({ length: 12 }, (_, i) => ({ x: (i * 37 + 10) % 90, y: (i * 53 + 5) % 80, d: i * 0.3 + 1.5 }))
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {nodes.map((n, i) => (
        <div key={i} className="absolute w-1 h-1 rounded-full" style={{ left: `${n.x}%`, top: `${n.y}%`, background: "#00D4C8", opacity: 0.2, animation: `neural-pulse ${n.d}s ease-in-out ${n.d * 0.3}s infinite` }} />
      ))}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full" style={{ background: "radial-gradient(ellipse at center, rgba(123,79,255,0.08) 0%, transparent 70%)", animation: "glow 5s ease-in-out infinite" }} />
      <div className="absolute top-2/3 right-1/4 w-48 h-48 rounded-full" style={{ background: "radial-gradient(ellipse at center, rgba(0,212,200,0.06) 0%, transparent 70%)", animation: "glow 4s ease-in-out 2s infinite" }} />
    </div>
  )
}

export default function HeroSection() {
  const sec = useRef<HTMLElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = sec.current?.querySelectorAll(".word")
      const extras = sec.current?.querySelectorAll(".h-extra")
      gsap.set([words ?? [], extras ?? []], { y: "100%", opacity: 0 })
      const tl = gsap.timeline({ delay: 1.5 })
      tl.to(words ?? [], { y: 0, opacity: 1, stagger: 0.07, duration: 0.9, ease: "power4.out" })
        .to(extras ?? [], { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: "power3.out" }, "-=0.3")
    }, sec)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={sec} id="hero" className="relative min-h-screen flex items-center overflow-hidden px-6 md:px-12 pt-24 pb-32" style={{ background: "#050B12" }}>
      <NeuralBg />
      <div className="relative z-10 max-w-5xl">
        <div className="h-extra overflow-hidden mb-6">
          <div className="word inline-flex items-center gap-2 px-3 py-1.5 bg-[#00D4C8]/10 border border-[#00D4C8]/30 text-[#00D4C8] text-xs font-space rounded-full">
            ⬡ AI Solutions · Kochi, Kerala · Deploy in 7 Days
          </div>
        </div>
        <h1 className="font-space leading-none mb-6" style={{ fontSize: "clamp(44px,7.5vw,100px)" }}>
          {[{ w: "Automate.", c: "font-bold text-white" }, { w: "Optimize.", c: "font-bold text-[#00D4C8]" }, { w: "Dominate.", c: "font-light text-[#7B4FFF]" }].map((item, i) => (
            <div key={i} className="overflow-hidden"><span className={`word ${item.c}`}>{item.w}</span></div>
          ))}
        </h1>
        <div className="h-extra overflow-hidden mb-8">
          <p className="word font-inter text-[#4A6070]" style={{ fontSize: 18, lineHeight: 1.7, maxWidth: 520 }}>
            AI-powered automation, chatbots, and analytics built for Kerala businesses and deployed in days — not months.
          </p>
        </div>
        <div className="h-extra overflow-hidden mb-8">
          <div className="word flex flex-wrap gap-3">
            {["200+ AI Projects","80% Time Saved","7-Day Deploy","LLM Powered"].map(b => (
              <span key={b} className="px-3 py-1.5 text-xs font-space border border-[#00D4C8]/15 text-[#00D4C8]/60 rounded-full">{b}</span>
            ))}
          </div>
        </div>
        <div className="h-extra overflow-hidden">
          <div className="word flex flex-col sm:flex-row gap-4">
            <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 bg-[#00D4C8] text-[#050B12] hover:bg-[#00F0E3] font-space font-bold text-sm transition-all rounded-sm">Deploy AI Now</a>
            <a href="#services" className="inline-flex items-center justify-center px-8 py-4 border border-[#7B4FFF]/40 text-[#7B4FFF] hover:bg-[#7B4FFF]/10 font-inter text-sm transition-all rounded-sm">View Services →</a>
          </div>
        </div>
      </div>
    </section>
  )
}
