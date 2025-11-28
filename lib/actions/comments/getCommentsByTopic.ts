'use server'
import createServerSupabaseClient from '@/lib/supabase/server'
import type { CommentWithDetails } from '@/lib/types/comments'

const getCommentsByTopic = async (topicId: string): Promise<CommentWithDetails[]> => {
    const supabase = await createServerSupabaseClient()

    const { data, error } = await supabase
    .from('comments')
    .select(`
      id,
      content,
      topic_id,
      user_id,
      parent_id,
      created_at,
      updated_at,
      profiles!inner (
        username,
        avatar_url
      )
    `)
    .eq('topic_id', topicId)
    .order('created_at', { ascending: true })

    if (error) {
        console.error('Error fetching comments:', error)
        return []
    }
    const comments = data as CommentWithDetails[]
    const topLevelComments: CommentWithDetails[] = []
    const commentMap = new Map<string, CommentWithDetails>()

    comments.forEach((comment) => {
        comment.replies = []
        commentMap.set(comment.id, comment)
    })

    comments.forEach((comment) => {
        if (comment.parent_id) {
            const parent = commentMap.get(comment.parent_id)
            if (parent) {
                parent.replies!.push(comment)
            }
        } else {
            topLevelComments.push(comment)
        }
    })
    return topLevelComments
}

export default getCommentsByTopic