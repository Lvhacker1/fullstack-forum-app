'use server'
import createServerSupabaseClient from '@/lib/supabase/server'
import type { Category } from '@/lib/types/categories'

const getCategories = async (): Promise<Category[]> => {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return data || []
}

export default getCategories