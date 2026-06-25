import LoadingScreen from "@/components/loading/LoadingScreen"
import HeroSection from "@/components/sections/HeroSection"
import NumbersSection from "@/components/sections/NumbersSection"
import ServicesSection from "@/components/sections/ServicesSection"
import StatementSection from "@/components/sections/StatementSection"
import UseCasesSection from "@/components/sections/UseCasesSection"
import TestimonialsSection from "@/components/sections/TestimonialsSection"
import ContactSection from "@/components/sections/ContactSection"
import MobileStickyBar from "@/components/ui/MobileStickyBar"

export default function HomePage() {
  return (
    <>
      <LoadingScreen />
      <main>
        <HeroSection />
        <NumbersSection />
        <ServicesSection />
        <StatementSection />
        <UseCasesSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <MobileStickyBar />
    </>
  )
}
