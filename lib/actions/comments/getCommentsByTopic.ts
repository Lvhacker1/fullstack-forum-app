'use server'
import createServerSupabaseClient from '@/lib/supabase/server'
import type { CommentWithDetails } from '@/lib/types/comments'

const getCommentsByTopic = async (topicId: string): Promise<CommentWithDetails[]> => {
    const supabase = await createServerSupabaseClient()

    const { data, error } = await supabase
    .from('comments')
    .select(`
    *,
    profiles (username, avatar_url)`)
    .eq('topic_id', topicId)
    .is('parent_id', null)
    .order('created_at', { ascending: true })

    if (error) {
        console.error('Error fetching comments:', error)
        return []
    }
    return data as CommentWithDetails[]
}

export default getCommentsByTopic