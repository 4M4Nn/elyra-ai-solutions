"use client"
import { useEffect, useRef } from "react"
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const dot = dotRef.current; const ring = ringRef.current
    if (!dot || !ring) return
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0
    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX; mouseY = e.clientY
      dot.style.left = mouseX + "px"; dot.style.top = mouseY + "px"
    }
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12; ringY += (mouseY - ringY) * 0.12
      ring.style.left = ringX + "px"; ring.style.top = ringY + "px"
      requestAnimationFrame(animateRing)
    }
    window.addEventListener("mousemove", moveCursor)
    animateRing()
    return () => window.removeEventListener("mousemove", moveCursor)
  }, [])
  return (
    <div className="hidden md:block">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </div>
  )
}
