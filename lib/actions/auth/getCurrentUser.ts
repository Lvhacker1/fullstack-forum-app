'use server'
import createServerSupabaseClient from '@/lib/supabase/server'
import type { AuthUser } from '@/lib/types/auth'

const getCurrentUser = async (): Promise<AuthUser | null> => {
  const supabase = await createServerSupabaseClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', user.id)
    .single<{ username: string }>()

  return {
    id: user.id,
    email: user.email!,
    username: profile?.username,
  }
}

export default getCurrentUser