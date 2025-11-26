'use server'
import createServerSupabaseClient from '@/lib/supabase/server'
import type { TopicWithDetails } from '@/lib/types/topics'

const getTopicBySlug = async (categorySlug: string, topicSlug: string): Promise<TopicWithDetails | null> => {
    const supabase = await createServerSupabaseClient()

    const { data: category } = await (supabase as any)
    .from('categories')
    .select('id')
    .eq('slug', categorySlug)
    .single()

    if (!category) {
        return null
    }

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
        categories (name, slug)`)
        .eq('slug', topicSlug)
        .eq('category_id', category.id)
        .single()


    if (error) {
        console.error('Error fetching topic:', error)
        return null
    } 
    return data as TopicWithDetails
}

export default getTopicBySlug
