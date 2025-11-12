'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import createServerSupabaseClient from '@/lib/supabase/server'
import type { RegisterCredentials } from '@/lib/types/auth'

const register = async (credentials: RegisterCredentials) => {
  const supabase = await createServerSupabaseClient()

  const { data: existingProfile } = await supabase
    .from('profiles')
    .select('username')
    .eq('username', credentials.username)
    .single()
  if (existingProfile) {
    return { error: 'Username already taken' }
  }

  const { error } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: {
      data: {
        username: credentials.username,
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export default register