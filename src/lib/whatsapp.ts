export function openWhatsApp(data: {
  name: string; phone: string; email?: string; service?: string
}) {
  const msg = encodeURIComponent(
    `Hello Versa Growth Ventures,\n\nName: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email || 'N/A'}\n\nI am interested in: ${data.service || 'General Inquiry'}\n\nPlease contact me.`
  )
  window.open(`https://wa.me/918891129111?text=${msg}`, '_blank')
}
