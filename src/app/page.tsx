import type { Metadata } from "next"
import CinematicOpening from "@/components/sections/CinematicOpening"
import Hero from "@/components/sections/Hero"
import ElyraServices from "@/components/sections/ElyraServices"
import ElyraCaseStudies from "@/components/sections/ElyraCaseStudies"
import ElyraFAQ from "@/components/sections/ElyraFAQ"
import ElyraContact from "@/components/sections/ElyraContact"

export const metadata: Metadata = {
  title: "Elyra AI Solutions — AI Employees for Modern Business",
  description: "AI agents that work 24/7 — lead nurturing, sales, recruitment, and customer support. Kerala's #1 AI automation company.",
}

export default function HomePage() {
  return (
    <main>
      <CinematicOpening />
      <Hero />
      <ElyraServices />
      <ElyraCaseStudies />
      <ElyraFAQ />
      <ElyraContact />
    </main>
  )
}
