import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import CustomCursor from "@/components/CustomCursor"
import FloatingWhatsApp from "@/components/FloatingWhatsApp"
import MobileStickyCTA from "@/components/MobileStickyCTA"

const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" })

export const metadata: Metadata = {
  title: "Elyra AI Solutions — AI Employees for Modern Business",
  description: "AI agents that work 24/7 — lead nurturing, sales, recruitment, and customer support. Kerala's #1 AI automation company.",
  keywords: ["AI automation Kerala", "AI employees", "Elyra AI", "business automation", "AI agents India"],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={grotesk.variable}>
      <body className="bg-[#050816] text-white antialiased">
        <CustomCursor />
        <Navbar />
        {children}
        <Footer />
        <FloatingWhatsApp />
        <MobileStickyCTA />
      </body>
    </html>
  )
}
