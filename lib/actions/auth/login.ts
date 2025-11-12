'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import createServerSupabaseClient from '@/lib/supabase/server'
import type { LoginCredentials } from '@/lib/types/auth'

const login = async (credentials: LoginCredentials) => {
  const supabase = await createServerSupabaseClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export default login