"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { services } from "@/lib/data"
gsap.registerPlugin(ScrollTrigger)

// ─── Animated visual: AI Process Automation — spinning gear cogs ───────────
function AutomationVisual() {
  return (
    <div style={{ width: "100%", height: 160, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
      {/* Large outer gear */}
      <div style={{ position: "relative", width: 80, height: 80 }}>
        <div style={{
          width: 80, height: 80, borderRadius: "50%",
          border: "5px dashed rgba(0,212,200,0.6)",
          animation: "spinSlow 6s linear infinite",
          boxShadow: "0 0 18px rgba(0,212,200,0.2)",
        }} />
        <div style={{
          position: "absolute", inset: 14,
          borderRadius: "50%",
          background: "rgba(0,212,200,0.1)",
          border: "2px solid rgba(0,212,200,0.3)",
        }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#00D4C8", boxShadow: "0 0 12px #00D4C8" }} />
        </div>
      </div>
      {/* Small gear (reverse spin) */}
      <div style={{ position: "relative", width: 48, height: 48, marginTop: -28 }}>
        <div style={{
          width: 48, height: 48, borderRadius: "50%",
          border: "4px dashed rgba(123,79,255,0.6)",
          animation: "spinSlow 4s linear infinite reverse",
          boxShadow: "0 0 12px rgba(123,79,255,0.2)",
        }} />
        <div style={{
          position: "absolute", inset: 10,
          borderRadius: "50%",
          background: "rgba(123,79,255,0.1)",
          border: "2px solid rgba(123,79,255,0.3)",
        }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#7B4FFF", boxShadow: "0 0 8px #7B4FFF" }} />
        </div>
      </div>
      {/* Tiny gear */}
      <div style={{ position: "relative", width: 36, height: 36, marginTop: 20 }}>
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          border: "3px dashed rgba(0,212,200,0.4)",
          animation: "spinSlow 3s linear infinite",
          boxShadow: "0 0 8px rgba(0,212,200,0.15)",
        }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00D4C8" }} />
        </div>
      </div>
      {/* Ambient glow */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(0,212,200,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />
    </div>
  )
}

// ─── Animated visual: AI Chatbots — 3 chat bubbles with typing dots ──────────
function ChatbotVisual() {
  const bubbles = [
    { w: 140, align: "flex-start", delay: "0s",   bg: "rgba(123,79,255,0.18)", border: "rgba(123,79,255,0.35)" },
    { w: 100, align: "flex-end",   delay: "0.8s",  bg: "rgba(0,212,200,0.12)",  border: "rgba(0,212,200,0.3)" },
    { w: 120, align: "flex-start", delay: "1.6s",  bg: "rgba(123,79,255,0.14)", border: "rgba(123,79,255,0.3)" },
  ]
  return (
    <div style={{ width: "100%", height: 160, display: "flex", flexDirection: "column", justifyContent: "center", gap: 10, padding: "0 24px" }}>
      {bubbles.map((b, i) => (
        <div key={i} style={{ display: "flex", justifyContent: b.align }}>
          <div style={{
            width: b.w, height: 28, borderRadius: 14,
            background: b.bg, border: `1px solid ${b.border}`,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
            opacity: 0,
            animation: `fadeSlideUp 0.5s ease forwards`,
            animationDelay: b.delay,
          }}>
            {[0, 1, 2].map(d => (
              <div key={d} style={{
                width: 5, height: 5, borderRadius: "50%",
                background: i % 2 === 0 ? "#7B4FFF" : "#00D4C8",
                animation: `neuralPulse 1.2s ease-in-out ${d * 0.2}s infinite`,
              }} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Animated visual: AI Analytics — self-drawing line chart ─────────────────
function AnalyticsVisual() {
  // SVG polyline path that animates stroke-dashoffset
  const points = "10,90 35,72 60,60 85,44 110,52 135,28 160,18 185,30 210,10"
  const pathLength = 260
  return (
    <div style={{ width: "100%", height: 160, display: "flex", alignItems: "center", justifyContent: "center", padding: "12px 24px" }}>
      <svg width="100%" height="120" viewBox="0 0 220 100" style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="chartGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#7B4FFF" />
            <stop offset="100%" stopColor="#00D4C8" />
          </linearGradient>
          <linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(123,79,255,0.25)" />
            <stop offset="100%" stopColor="rgba(123,79,255,0)" />
          </linearGradient>
        </defs>
        {/* Grid lines */}
        {[25, 50, 75].map(y => (
          <line key={y} x1="0" y1={y} x2="220" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        ))}
        {/* Area fill */}
        <polygon
          points={`10,90 35,72 60,60 85,44 110,52 135,28 160,18 185,30 210,10 210,100 10,100`}
          fill="url(#areaGrad)"
          style={{
            strokeDasharray: `${pathLength * 2} ${pathLength * 2}`,
            strokeDashoffset: pathLength * 2,
            animation: `shimmer 3s linear infinite`,
          }}
        />
        {/* Animated line */}
        <polyline
          points={points}
          fill="none"
          stroke="url(#chartGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
            animation: `typing 2.5s ease forwards`,
          }}
        />
        {/* Data point dots */}
        {[[10,90],[35,72],[60,60],[85,44],[110,52],[135,28],[160,18],[185,30],[210,10]].map(([x,y], i) => (
          <circle key={i} cx={x} cy={y} r={3} fill="#7B4FFF"
            style={{ animation: `neuralPulse 2s ease-in-out ${i * 0.25}s infinite` }} />
        ))}
      </svg>
    </div>
  )
}

// ─── Animated visual: AI Integration — pulsing node diagram ──────────────────
function IntegrationVisual() {
  // Center hub + 5 satellite nodes
  const satellites = Array.from({ length: 5 }, (_, i) => {
    const angle = (i / 5) * 2 * Math.PI - Math.PI / 2
    return { x: Math.cos(angle) * 60, y: Math.sin(angle) * 60, delay: i * 0.3 }
  })
  const cx = 110
  const cy = 80
  return (
    <div style={{ width: "100%", height: 160, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="220" height="160" viewBox="0 0 220 160">
        <defs>
          <radialGradient id="hubGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7B4FFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#3D1F9A" stopOpacity="0.5" />
          </radialGradient>
        </defs>
        {/* Connection lines */}
        {satellites.map((s, i) => (
          <line key={i}
            x1={cx} y1={cy}
            x2={cx + s.x} y2={cy + s.y}
            stroke="rgba(0,212,200,0.3)"
            strokeWidth="1"
            style={{ animation: `neuralLine ${2 + i * 0.5}s ease-in-out ${s.delay}s infinite` }}
          />
        ))}
        {/* Satellite nodes */}
        {satellites.map((s, i) => (
          <g key={i}>
            <circle cx={cx + s.x} cy={cy + s.y} r={10}
              fill="rgba(0,212,200,0.1)" stroke="rgba(0,212,200,0.4)" strokeWidth="1"
              style={{ animation: `neuralPulse ${1.8 + i * 0.3}s ease-in-out ${s.delay}s infinite` }}
            />
            <circle cx={cx + s.x} cy={cy + s.y} r={4}
              fill="#00D4C8"
              style={{ animation: `neuralPulse ${1.8 + i * 0.3}s ease-in-out ${s.delay + 0.2}s infinite` }}
            />
          </g>
        ))}
        {/* Center hub */}
        <circle cx={cx} cy={cy} r={22} fill="url(#hubGrad)" opacity="0.8"
          style={{ animation: "pulseGlow 3s ease-in-out infinite" }} />
        <circle cx={cx} cy={cy} r={12} fill="rgba(123,79,255,0.6)" />
        <circle cx={cx} cy={cy} r={5}  fill="#7B4FFF" />
      </svg>
    </div>
  )
}

// ─── Animated visual: AI Strategy — DNA double helix ─────────────────────────
function StrategyVisual() {
  const points = Array.from({ length: 10 }, (_, i) => i)
  return (
    <div style={{ width: "100%", height: 160, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
      <svg width="200" height="140" viewBox="0 0 200 140">
        <defs>
          <linearGradient id="helixA" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#7B4FFF" />
            <stop offset="100%" stopColor="#3D1F9A" />
          </linearGradient>
          <linearGradient id="helixB" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#00D4C8" />
            <stop offset="100%" stopColor="#005E5A" />
          </linearGradient>
        </defs>
        {/* Strand A — sine wave going right */}
        <polyline
          fill="none"
          stroke="url(#helixA)"
          strokeWidth="2.5"
          strokeLinecap="round"
          points={points.map(i => {
            const t = i / (points.length - 1)
            const x = t * 190 + 5
            const y = 70 + Math.sin(t * Math.PI * 2.5) * 30
            return `${x},${y}`
          }).join(" ")}
          style={{ animation: `neuralPulse 2.5s ease-in-out infinite` }}
        />
        {/* Strand B — offset cosine wave */}
        <polyline
          fill="none"
          stroke="url(#helixB)"
          strokeWidth="2.5"
          strokeLinecap="round"
          points={points.map(i => {
            const t = i / (points.length - 1)
            const x = t * 190 + 5
            const y = 70 - Math.sin(t * Math.PI * 2.5) * 30
            return `${x},${y}`
          }).join(" ")}
          style={{ animation: `neuralPulse 2.5s ease-in-out 1.25s infinite` }}
        />
        {/* Cross rungs */}
        {points.map(i => {
          const t = i / (points.length - 1)
          const x = t * 190 + 5
          const yA = 70 + Math.sin(t * Math.PI * 2.5) * 30
          const yB = 70 - Math.sin(t * Math.PI * 2.5) * 30
          const crossOpacity = Math.abs(Math.sin(t * Math.PI * 2.5)) < 0.3 ? 0.7 : 0.15
          return (
            <line key={i} x1={x} y1={yA} x2={x} y2={yB}
              stroke="rgba(123,79,255,0.4)"
              strokeWidth="1"
              strokeDasharray="2 2"
              opacity={crossOpacity}
              style={{ animation: `glow-pulse 2s ease-in-out ${i * 0.2}s infinite` }}
            />
          )
        })}
        {/* Node dots on strand A */}
        {points.filter((_, i) => i % 2 === 0).map(i => {
          const t = i / (points.length - 1)
          const x = t * 190 + 5
          const y = 70 + Math.sin(t * Math.PI * 2.5) * 30
          return <circle key={i} cx={x} cy={y} r={3} fill="#7B4FFF" style={{ animation: `neuralPulse 2s ease-in-out ${i * 0.15}s infinite` }} />
        })}
        {/* Node dots on strand B */}
        {points.filter((_, i) => i % 2 === 1).map(i => {
          const t = i / (points.length - 1)
          const x = t * 190 + 5
          const y = 70 - Math.sin(t * Math.PI * 2.5) * 30
          return <circle key={i} cx={x} cy={y} r={3} fill="#00D4C8" style={{ animation: `neuralPulse 2s ease-in-out ${i * 0.15}s infinite` }} />
        })}
      </svg>
    </div>
  )
}

const SERVICE_VISUALS: Record<string, React.FC> = {
  automation: AutomationVisual,
  chatbot:    ChatbotVisual,
  analytics:  AnalyticsVisual,
  integration: IntegrationVisual,
  training:   StrategyVisual,
}

function ServiceCard({ s, i }: { s: typeof services[0]; i: number }) {
  const sec = useRef<HTMLElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const left  = sec.current?.querySelector(".sl")
      const right = sec.current?.querySelector(".sr")
      if (!left || !right) return
      gsap.set(left,  { x: -60, opacity: 0 })
      gsap.set(right, { x: 60,  opacity: 0 })
      ScrollTrigger.create({
        trigger: sec.current,
        start: "top 75%",
        onEnter: () => {
          gsap.to(left,  { x: 0, opacity: 1, duration: 1,   ease: "power4.out" })
          gsap.to(right, { x: 0, opacity: 1, duration: 1,   ease: "power4.out", delay: 0.1 })
        },
      })
    }, sec)
    return () => ctx.revert()
  }, [])

  const isEven = i % 2 === 0
  const accent = isEven ? "#00D4C8" : "#7B4FFF"
  const Visual = SERVICE_VISUALS[s.id] ?? null

  return (
    <section ref={sec} className="min-h-screen flex items-center border-b border-white/5 px-6 md:px-12 py-24" style={{ background: isEven ? "#050B12" : "#080F18" }}>
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Text side */}
        <div className={`sl ${isEven ? "" : "md:order-2"}`}>
          <p className="label mb-4" style={{ color: accent, letterSpacing: "3px" }}>{s.num} / AI Service</p>
          <h2 className="font-space font-bold text-white mb-4" style={{ fontSize: "clamp(28px,4vw,54px)", lineHeight: 1.1 }}>{s.name}</h2>
          <p className="font-inter text-[#4A6070] mb-8" style={{ fontSize: 17, lineHeight: 1.7 }}>{s.desc}</p>
          {/* Stats inline */}
          <div className="flex items-baseline gap-3 mb-8">
            <span className="font-space font-bold" style={{ fontSize: "clamp(28px,4vw,48px)", color: accent }}>{s.stat}</span>
            <span className="label text-[#4A6070]" style={{ letterSpacing: "2px" }}>{s.statLabel}</span>
          </div>
          <a href="#contact" className="inline-flex items-center gap-2 font-space font-medium text-sm hover:gap-3 transition-all" style={{ color: accent }}>
            Deploy This Solution →
          </a>
        </div>

        {/* Visual side */}
        <div
          className={`sr ${isEven ? "" : "md:order-1"} flex items-center justify-center rounded-2xl overflow-hidden`}
          style={{
            background: `linear-gradient(135deg, ${accent}0A 0%, rgba(5,11,18,0.6) 100%)`,
            border: `1px solid ${accent}18`,
            minHeight: 220,
          }}
        >
          {Visual && <Visual />}
        </div>
      </div>
    </section>
  )
}

export default function ServicesSection() {
  return <div id="services">{services.map((s, i) => <ServiceCard key={s.id} s={s} i={i} />)}</div>
}
