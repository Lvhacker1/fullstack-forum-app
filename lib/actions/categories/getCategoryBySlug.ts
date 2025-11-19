'use server'
import createServerSupabaseClient from '@/lib/supabase/server'
import type { Category } from '@/lib/types/categories'

const getCategoryBySlug = async (slug: string): Promise<Category | null> => {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching category:', error)
    return null
  }
  return data
}

export default getCategoryBySlug