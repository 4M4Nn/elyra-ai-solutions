"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Case Studies", href: "#cases" },
  { label: "Industries", href: "#industries" },
  { label: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])
  return (
    <motion.nav initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-500 ${scrolled ? "backdrop-blur-xl bg-[#050816]/90 border-b border-[#00D4FF]/10" : ""}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#6E44FF] opacity-80" />
            <div className="absolute inset-1 rounded-full bg-[#050816] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#00D4FF]" />
            </div>
          </div>
          <span className="font-grotesk text-white text-lg font-bold">ELYRA <span className="text-[#00D4FF]">AI</span></span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="text-[#8892B0] hover:text-[#00D4FF] transition-colors text-sm">{link.label}</a>
          ))}
          <a href="#contact" className="px-5 py-2 bg-gradient-to-r from-[#00D4FF] to-[#6E44FF] text-white rounded-full text-sm font-bold">Book Free Call</a>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <button className="text-white p-2"><Menu size={24} /></button>
          </SheetTrigger>
          <SheetContent className="bg-[#050816] border-[#00D4FF]/20 w-[280px]">
            <div className="flex flex-col gap-6 mt-12">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} onClick={() => setOpen(false)} className="text-[#8892B0] hover:text-[#00D4FF] text-lg">{link.label}</a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)} className="px-5 py-3 bg-gradient-to-r from-[#00D4FF] to-[#6E44FF] text-white rounded-full text-center font-bold">Book Free Call</a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.nav>
  )
}
