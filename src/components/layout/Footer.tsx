import { siteConfig } from "@/lib/data"
export default function Footer() {
  return (
    <footer className="bg-[#030510] border-t border-[#00D4FF]/10 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#6E44FF] opacity-80" />
                <div className="absolute inset-1 rounded-full bg-[#030510] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#00D4FF]" />
                </div>
              </div>
              <div>
                <p className="font-grotesk text-white font-bold">ELYRA AI</p>
                <p className="text-[#00D4FF] text-xs">AI Employees for Modern Businesses</p>
              </div>
            </div>
            <p className="text-[#8892B0] text-sm">{siteConfig.address}</p>
          </div>
          <div>
            <h4 className="text-[#00D4FF] font-semibold mb-4 text-sm uppercase tracking-wider">Services</h4>
            <div className="flex flex-col gap-2 text-[#8892B0] text-sm">
              {["AI Website Development", "AI Lead Nurturing", "SEO Automation", "Custom AI Agents", "AI Sales Agent"].map((s) => (
                <a key={s} href="#services" className="hover:text-white transition-colors">{s}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-[#00D4FF] font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <div className="flex flex-col gap-2 text-[#8892B0] text-sm">
              <span>{siteConfig.phone}</span>
              <span>{siteConfig.email}</span>
            </div>
          </div>
        </div>
        <div className="border-t border-[#00D4FF]/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#8892B0] text-sm">© {new Date().getFullYear()} Elyra AI Solutions · A Versa Growth Ventures Company</p>
          <p className="text-[#8892B0] text-sm">Built by <span className="text-[#00D4FF]">Loopgen Technologies</span></p>
        </div>
      </div>
    </footer>
  )
}
