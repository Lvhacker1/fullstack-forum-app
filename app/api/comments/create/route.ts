import { NextRequest, NextResponse } from 'next/server'
import createServerSupabaseClient from '@/lib/supabase/server'

export const POST = async (request: NextRequest) => {
    try {
        const supabase = await createServerSupabaseClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
        }

        const body = await request.json()
        const { content, topic_id, parent_id } = body

        if (!content || !topic_id) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const commentData = {
            content,
            topic_id,
            user_id: user.id,
            parent_id: parent_id || null
        }

        const { data, error } = await (supabase as any)
        .from('comments')
        .insert(commentData)
        .select()
        .single()

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }
        return NextResponse.json({ data }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error. Please try again later.' }, { status: 500 })
    }
}