"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
const links = [{ label: "Services", href: "#services" }, { label: "Use Cases", href: "#usecases" }, { label: "Results", href: "#testimonials" }, { label: "Contact", href: "#contact" }]
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", fn); fn()
    return () => window.removeEventListener("scroll", fn)
  }, [])
  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-300 ${scrolled ? "bg-[#050B12]/95 backdrop-blur border-b border-[#00D4C8]/10" : "bg-transparent"}`} style={{ height: 64 }}>
        <a href="#" className="font-space font-bold text-xl tracking-tight">
          <span className="text-[#00D4C8]">elyra</span><span className="text-white/80 font-light">.ai</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => <a key={l.href} href={l.href} className="text-sm text-[#4A6070] hover:text-[#00D4C8] transition-colors font-inter">{l.label}</a>)}
        </div>
        <a href="#contact" className="hidden md:inline-flex items-center px-5 py-2.5 bg-[#00D4C8] text-[#050B12] hover:bg-[#00F0E3] font-space font-bold text-sm transition-all rounded-sm">Deploy AI</a>
        <button className="md:hidden p-2 flex flex-col gap-1.5" onClick={() => setOpen(!open)}>
          <motion.span animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="block w-6 h-px bg-[#00D4C8]" />
          <motion.span animate={open ? { opacity: 0 } : { opacity: 1 }} className="block w-6 h-px bg-[#00D4C8]" />
          <motion.span animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="block w-6 h-px bg-[#00D4C8]" />
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="fixed inset-x-0 top-16 z-40 bg-[#050B12] border-b border-[#00D4C8]/20 px-6 py-6 flex flex-col gap-4">
            {[...links, { label: "Deploy AI", href: "#contact" }].map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-lg font-space text-white hover:text-[#00D4C8] transition-colors">{l.label}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
