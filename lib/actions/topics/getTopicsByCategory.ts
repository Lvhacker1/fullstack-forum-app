'use server'
import createServerSupabaseClient from '@/lib/supabase/server'
import type { TopicWithDetails } from '@/lib/types/topics'

const getTopicsByCategory = async (categoryId: string): Promise<TopicWithDetails[]> => {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await (supabase as any)
    .from('topics')
    .select(`
        id,
        title,
        slug,
        content,
        category_id,
        user_id,
        image_url,
        created_at,
        updated_at,
        profiles!inner (username, avatar_url),
        categories (name, slug)
        `)
        .eq('category_id', categoryId)
        .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching topics:', error)
    return []
  }
  return data as TopicWithDetails[]
}

export default getTopicsByCategory