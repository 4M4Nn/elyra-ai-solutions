"use client"
import { useEffect, useState } from "react"

export default function LoadingScreen({ onDone }: { onDone?: () => void }) {
  const [visible, setVisible] = useState(true)
  const [phase, setPhase] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("elyra-intro-done")) {
      onDone?.(); setDone(true); return
    }
    const t1 = setTimeout(() => setPhase(1), 200)
    const t2 = setTimeout(() => setPhase(2), 700)
    const t3 = setTimeout(() => setPhase(3), 1300)
    const t4 = setTimeout(() => setPhase(4), 2000)
    const t5 = setTimeout(() => setPhase(5), 2700)
    const t6 = setTimeout(() => {
      setVisible(false)
      setTimeout(() => { sessionStorage.setItem("elyra-intro-done", "1"); onDone?.(); setDone(true) }, 500)
    }, 3800)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); clearTimeout(t6) }
  }, [onDone])

  if (done) return null

  const ring16 = Array.from({ length: 16 }, (_, i) => {
    const angle = (i / 16) * 2 * Math.PI
    return { x: Math.cos(angle) * 80, y: Math.sin(angle) * 80 }
  })

  const letters = "ELYRA".split("")

  return (
    <div style={{ position: "fixed", inset: 0, background: "#000", zIndex: 9999, overflow: "hidden", transition: "opacity 0.5s", opacity: visible ? 1 : 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Background neural network dots */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} style={{ position: "absolute", width: 3, height: 3, borderRadius: "50%", background: "#7B4FFF", top: `${10 + (i * 4.5) % 80}%`, left: `${5 + (i * 4.7) % 90}%`, opacity: phase >= 2 ? 0.3 : 0, transition: `opacity 0.5s ${i * 0.05}s`, animation: "neuralPulse 3s ease-in-out infinite", animationDelay: `${i * 0.15}s` }} />
      ))}
      {/* Center particle system */}
      <div style={{ position: "relative", width: 200, height: 200 }}>
        {/* Phase 1: single particle */}
        <div style={{ position: "absolute", top: "50%", left: "50%", width: 12, height: 12, borderRadius: "50%", background: "#7B4FFF", boxShadow: "0 0 20px #7B4FFF", transform: "translate(-50%,-50%) scale(1)", opacity: phase >= 1 && phase < 4 ? 1 : 0, transition: "opacity 0.3s" }} />
        {/* Phase 2: 4 particles */}
        {[{x:-40,y:0},{x:40,y:0},{x:0,y:-40},{x:0,y:40}].map((p, i) => (
          <div key={i} style={{ position: "absolute", top: "50%", left: "50%", width: 8, height: 8, borderRadius: "50%", background: "#7B4FFF", boxShadow: "0 0 15px #7B4FFF", transform: `translate(calc(-50% + ${phase >= 2 ? p.x : 0}px), calc(-50% + ${phase >= 2 ? p.y : 0}px))`, opacity: phase >= 2 && phase < 4 ? 1 : 0, transition: `transform 0.5s ease, opacity 0.3s` }} />
        ))}
        {/* Phase 3: 16 particles in ring */}
        {ring16.map((p, i) => (
          <div key={i} style={{ position: "absolute", top: "50%", left: "50%", width: 5, height: 5, borderRadius: "50%", background: i % 3 === 0 ? "#fff" : "#7B4FFF", boxShadow: `0 0 10px ${i % 3 === 0 ? "#fff" : "#7B4FFF"}`, transform: `translate(calc(-50% + ${phase >= 3 ? p.x : 0}px), calc(-50% + ${phase >= 3 ? p.y : 0}px))`, opacity: phase >= 3 && phase < 5 ? 1 : 0, transition: `transform 0.6s ease ${i * 0.02}s, opacity 0.3s` }} />
        ))}
      </div>
      {/* Text */}
      <div style={{ position: "absolute", textAlign: "center" }}>
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 12 }}>
          {letters.map((l, i) => (
            <span key={i} style={{ fontSize: "clamp(36px,7vw,72px)", fontWeight: 900, background: "linear-gradient(135deg,#7B4FFF,#fff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "0.1em", opacity: phase >= 4 ? 1 : 0, transform: phase >= 4 ? "translateY(0) scale(1)" : "translateY(30px) scale(0.5)", transition: `opacity 0.5s ${i * 0.08}s, transform 0.5s ${i * 0.08}s` }}>
              {l}
            </span>
          ))}
        </div>
        <p style={{ fontSize: 11, letterSpacing: "0.35em", color: "rgba(123,79,255,0.8)", opacity: phase >= 5 ? 1 : 0, transition: "opacity 0.5s" }}>AI SOLUTIONS</p>
      </div>
    </div>
  )
}
