'use server'
import createServerSupabaseClient from '@/lib/supabase/server'
import type { TopicWithDetails } from '@/lib/types/topics'

const getTopicBySlug = async (categorySlug: string, topicSlug: string): Promise<TopicWithDetails | null> => {
    const supabase = await createServerSupabaseClient()

    const { data, error } = await supabase
    .from('topics')
    .select(`
    *,
    profiles (username, avatar_url),
    categories (name, slug)`)
    .eq('slug', topicSlug)
    .eq('categories.slug', categorySlug)
    .single()

    if (error) {
        console.error('Error fetching topic:', error)
        return null
    } 
    return data as TopicWithDetails
}

export default getTopicBySlug
