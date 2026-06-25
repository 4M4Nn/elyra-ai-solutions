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

// Node positions: 3 layers of 4 nodes each in a circle
// Layer 0 (inner): 4 nodes at radius 60
// Layer 1 (mid):   4 nodes at radius 110
// Layer 2 (outer): 4 nodes at radius 155
const LAYERS = [
  { r: 60,  count: 4, offset: Math.PI / 4 },
  { r: 110, count: 4, offset: 0 },
  { r: 155, count: 4, offset: Math.PI / 4 },
]

type NodePos = { x: number; y: number; layer: number; idx: number }

function buildNodes(): NodePos[] {
  const all: NodePos[] = []
  LAYERS.forEach(({ r, count, offset }, layer) => {
    for (let i = 0; i < count; i++) {
      const angle = offset + (i / count) * 2 * Math.PI
      all.push({ x: Math.cos(angle) * r, y: Math.sin(angle) * r, layer, idx: i })
    }
  })
  return all
}

// Build connections: inner→mid, mid→outer (nearest 2 per node)
function buildEdges(nodes: NodePos[]): [number, number][] {
  const edges: [number, number][] = []
  const innerNodes = nodes.filter(n => n.layer === 0)
  const midNodes   = nodes.filter(n => n.layer === 1)
  const outerNodes = nodes.filter(n => n.layer === 2)

  const getIdx = (n: NodePos) => nodes.indexOf(n)

  // inner → mid: each inner connects to 2 nearest mid
  innerNodes.forEach(a => {
    const sorted = [...midNodes].sort((b, c) => {
      const db = (b.x - a.x) ** 2 + (b.y - a.y) ** 2
      const dc = (c.x - a.x) ** 2 + (c.y - a.y) ** 2
      return db - dc
    })
    edges.push([getIdx(a), getIdx(sorted[0])], [getIdx(a), getIdx(sorted[1])])
  })

  // mid → outer
  midNodes.forEach(a => {
    const sorted = [...outerNodes].sort((b, c) => {
      const db = (b.x - a.x) ** 2 + (b.y - a.y) ** 2
      const dc = (c.x - a.x) ** 2 + (c.y - a.y) ** 2
      return db - dc
    })
    edges.push([getIdx(a), getIdx(sorted[0])], [getIdx(a), getIdx(sorted[1])])
  })

  // deduplicate
  const seen = new Set<string>()
  return edges.filter(([a, b]) => {
    const key = `${Math.min(a, b)}-${Math.max(a, b)}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function NOVASphere() {
  const nodes = buildNodes()
  const edges = buildEdges(nodes)
  const cx = 180
  const cy = 180
  const size = 360

  // Orbiting particles at outer ring
  const orbitParticles = Array.from({ length: 6 }, (_, i) => ({
    angle: (i / 6) * 360,
    duration: 8 + i * 1.5,
    r: 172,
  }))

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      {/* Dark circular frame */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "50%",
        background: "radial-gradient(ellipse at 40% 40%, #12003A 0%, #0A0014 60%, #000 100%)",
        border: "1px solid rgba(123,79,255,0.25)",
        boxShadow: "0 0 60px rgba(123,79,255,0.15), inset 0 0 40px rgba(123,79,255,0.08)",
        overflow: "hidden",
      }}>
        {/* SVG neural network */}
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: "absolute", inset: 0 }}>
          <defs>
            <radialGradient id="nodeGradInner" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#7B4FFF" stopOpacity="0.7" />
            </radialGradient>
            <radialGradient id="nodeGradMid" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#7B4FFF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#3D1F9A" stopOpacity="0.6" />
            </radialGradient>
            <radialGradient id="nodeGradOuter" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00D4C8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#005E5A" stopOpacity="0.5" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Animated edges */}
          {edges.map(([a, b], i) => {
            const na = nodes[a]
            const nb = nodes[b]
            const len = Math.hypot(nb.x - na.x, nb.y - na.y)
            return (
              <line
                key={i}
                x1={cx + na.x} y1={cy + na.y}
                x2={cx + nb.x} y2={cy + nb.y}
                stroke="rgba(123,79,255,0.35)"
                strokeWidth="0.8"
                strokeDasharray={`${len} ${len}`}
                style={{
                  animation: `neuralLine ${2.5 + (i % 4) * 0.7}s ease-in-out ${(i * 0.18) % 3}s infinite`,
                }}
              />
            )
          })}

          {/* Outer ring faint circle */}
          <circle cx={cx} cy={cy} r={165} fill="none" stroke="rgba(0,212,200,0.08)" strokeWidth="1" />
          <circle cx={cx} cy={cy} r={120} fill="none" stroke="rgba(123,79,255,0.06)" strokeWidth="1" strokeDasharray="4 8" />

          {/* Nodes */}
          {nodes.map((n, i) => {
            const gradId = n.layer === 0 ? "nodeGradInner" : n.layer === 1 ? "nodeGradMid" : "nodeGradOuter"
            const r = n.layer === 0 ? 5 : n.layer === 1 ? 4 : 3.5
            const dur = 2 + (i % 5) * 0.4
            const delay = (i * 0.22) % 2.5
            return (
              <circle
                key={i}
                cx={cx + n.x} cy={cy + n.y}
                r={r}
                fill={`url(#${gradId})`}
                filter="url(#glow)"
                style={{ animation: `neuralPulse ${dur}s ease-in-out ${delay}s infinite` }}
              />
            )
          })}

          {/* Center NOVA hub */}
          <circle cx={cx} cy={cy} r={22} fill="rgba(123,79,255,0.15)" stroke="rgba(123,79,255,0.5)" strokeWidth="1" style={{ animation: "pulseGlow 3s ease-in-out infinite" }} />
          <circle cx={cx} cy={cy} r={14} fill="rgba(123,79,255,0.4)" />
          <circle cx={cx} cy={cy} r={6} fill="#7B4FFF" filter="url(#glow)" />
        </svg>

        {/* NOVA label */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, calc(-50% + 32px))", textAlign: "center", pointerEvents: "none" }}>
          <span style={{ fontSize: 9, letterSpacing: "0.25em", color: "rgba(123,79,255,0.7)", fontFamily: "var(--font-space, monospace)", fontWeight: 700 }}>NOVA</span>
        </div>

        {/* Orbiting particles */}
        {orbitParticles.map((p, i) => (
          <div key={i} style={{
            position: "absolute",
            top: "50%", left: "50%",
            width: 6, height: 6,
            borderRadius: "50%",
            background: i % 2 === 0 ? "#7B4FFF" : "#00D4C8",
            boxShadow: `0 0 8px ${i % 2 === 0 ? "#7B4FFF" : "#00D4C8"}`,
            marginTop: -3, marginLeft: -3,
            transformOrigin: "3px 3px",
            animation: `orbit ${p.duration}s linear ${i * 0.8}s infinite`,
            ["--r" as string]: `${p.r}px`,
          }} />
        ))}

        {/* Scan line */}
        <div style={{
          position: "absolute", left: 0, right: 0, height: 1,
          background: "linear-gradient(90deg, transparent, rgba(0,212,200,0.4), transparent)",
          animation: "scanLine 4s linear infinite",
        }} />
      </div>

      {/* Outer glow ring */}
      <div style={{
        position: "absolute", inset: -8, borderRadius: "50%",
        background: "transparent",
        boxShadow: "0 0 40px rgba(123,79,255,0.2)",
        pointerEvents: "none",
        animation: "pulseGlow 4s ease-in-out infinite",
      }} />
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
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: text */}
        <div>
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

        {/* Right: NOVASphere neural network */}
        <div className="hidden lg:flex items-center justify-center">
          <div style={{ animation: "floatSlow 7s ease-in-out infinite" }}>
            <NOVASphere />
          </div>
        </div>
      </div>
    </section>
  )
}
