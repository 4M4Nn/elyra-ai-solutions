import type { Metadata } from "next"
import { Space_Grotesk, Inter } from "next/font/google"
import "./globals.css"
import LenisProvider from "@/components/providers/LenisProvider"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300","400","500","600","700"], variable: "--font-space", display: "swap" })
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })

export const metadata: Metadata = {
  title: "Elyra AI Solutions — AI Automation & Chatbot Development Kochi | Kerala",
  description: "Build AI-powered business automation, chatbots, and analytics with Elyra AI Solutions. 200+ projects delivered. Deploy in 7 days. Part of Versa Growth Ventures.",
  keywords: ["AI solutions Kochi", "AI automation Kerala", "chatbot development India", "AI analytics Kerala", "Elyra AI", "business automation Kochi"],
  openGraph: { title: "Elyra AI Solutions — AI Automation Kochi", description: "200+ AI projects. Deploy in 7 days. Transform your business with AI.", type: "website" },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="bg-[#050B12] text-white overflow-x-hidden">
        <LenisProvider>
          <Navbar />
          {children}
          <Footer />
          <FloatingWhatsApp />
        </LenisProvider>
      </body>
    </html>
  )
}
