'use server'
import createServerSupabaseClient from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

const deleteComment = async (commentId: string, categorySlug: string, topicSlug: string) => {
    const supabase = await createServerSupabaseClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Not authenticated' }
    }

    const { data: comment, error: fetchError } = await (supabase as any)
    .from('comments')
    .select('user_id')
    .eq('id', commentId)
    .single()

    if (fetchError || !comment) {
        return { error: 'Comment not found' }
    }

    if (comment.user_id !== user.id) {
        return { error: 'Unauthorized' }
    }

    const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId)

    if (error) {
        return { error: error.message }
    }

    revalidatePath(`/category/${categorySlug}/${topicSlug}`)
    return { success: true }
}

export default deleteComment