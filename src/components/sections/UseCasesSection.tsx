"use client"
import { useCases } from "@/lib/data"
export default function UseCasesSection() {
  return (
    <section id="usecases" className="py-32 bg-[#080F18] overflow-hidden px-6 md:px-12">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <p className="label text-[#00D4C8] mb-4" style={{ letterSpacing: "3px" }}>/ What We Automate</p>
        <h2 className="font-space font-bold text-white" style={{ fontSize: "clamp(32px,5vw,60px)", lineHeight: 1.1 }}>Endless use cases. One team.</h2>
        <p className="font-inter text-[#4A6070] mt-4 max-w-lg mx-auto" style={{ fontSize: 16 }}>From simple task automation to complex AI-driven decision systems — we build it all.</p>
      </div>
      <div className="overflow-hidden">
        <div className="flex gap-3 whitespace-nowrap" style={{ animation: "ticker 20s linear infinite" }}>
          {[...useCases, ...useCases, ...useCases].map((uc, i) => (
            <span key={i} className="inline-block px-5 py-2.5 border border-[#00D4C8]/15 text-[#00D4C8]/60 text-sm font-space rounded-full flex-shrink-0 hover:border-[#00D4C8] hover:text-[#00D4C8] transition-colors">{uc}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
