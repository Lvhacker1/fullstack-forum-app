'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import createServerSupabaseClient from '@/lib/supabase/server'

const logout = async () => {
  const supabase = await createServerSupabaseClient()
  
  await supabase.auth.signOut()
  
  revalidatePath('/', 'layout')
  redirect('/')
}

export default logout