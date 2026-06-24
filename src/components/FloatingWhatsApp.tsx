"use client"
import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
export default function FloatingWhatsApp() {
  return (
    <motion.a href="https://wa.me/918891129111" target="_blank" rel="noopener noreferrer"
      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2, type: "spring" }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg whatsapp-pulse group">
      <MessageCircle className="text-white w-7 h-7" fill="white" />
      <span className="absolute right-16 bg-[#25D366] text-white text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Chat with us</span>
    </motion.a>
  )
}
