"use client"
export default function MobileStickyBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex">
      <a href="https://wa.me/918891129111" target="_blank" rel="noopener noreferrer" className="flex-1 py-4 text-center text-sm font-inter text-white bg-[#25D366] font-medium">WhatsApp Now</a>
      <a href="#contact" className="flex-1 py-4 text-center text-sm font-inter text-[#050B12] bg-[#00D4C8] font-space font-bold">Deploy AI</a>
    </div>
  )
}
