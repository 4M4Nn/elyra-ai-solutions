"use client"
import { motion } from "framer-motion"
import { MessageCircle, Zap } from "lucide-react"
export default function MobileStickyCTA() {
  return (
    <motion.div initial={{ y: 100 }} animate={{ y: 0 }} transition={{ delay: 2 }}
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#050816]/95 backdrop-blur-xl border-t border-[#00D4FF]/20 p-4">
      <div className="flex gap-3">
        <a href="https://wa.me/918891129111" target="_blank" rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl font-medium text-sm">
          <MessageCircle size={18} />WhatsApp
        </a>
        <a href="#contact"
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#00D4FF] to-[#6E44FF] text-white py-3 rounded-xl font-bold text-sm">
          <Zap size={18} />Book Free Call
        </a>
      </div>
    </motion.div>
  )
}
