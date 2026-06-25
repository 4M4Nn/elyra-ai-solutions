import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
export async function saveLead(data: {
  name: string; phone: string; email?: string
  service_interested?: string; source_website: string; message?: string
}) {
  const { error } = await supabase.from('versa_leads').insert([data])
  if (error) console.error(error)
}
