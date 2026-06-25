import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
export const supabase = createClient(supabaseUrl, supabaseKey)
export async function saveLead(data: {
  name: string; phone: string; email?: string; company?: string;
  service_interested?: string; source_website: string; message?: string;
}) {
  const { error } = await supabase.from('versa_leads').insert([data])
  if (error) console.error('Lead save error:', error)
}
