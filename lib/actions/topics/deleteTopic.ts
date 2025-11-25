'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import createServerSupabaseClient from '@/lib/supabase/server'

const deleteTopic = async (topicId: string, categorySlug: string) => {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Not authenticated' }
    }

    const { data: topic, error: fetchError } = await (supabase as any)
    .from('topics')
    .select('user_id')
    .eq('id', topicId)
    .single()

    if (fetchError || !topic) {
        return { error: 'Topic not found' }
    }

    if (topic.user_id !== user.id) {
        return { error: 'Unauthorized' }
    }

    const { error } = await supabase
    .from('topics')
    .delete()
    .eq('id', topicId)

    if (error) {
        return { error: error.message }
    }

    revalidatePath(`/category/${categorySlug}`)
    redirect(`/category/${categorySlug}`)
}

export default deleteTopic