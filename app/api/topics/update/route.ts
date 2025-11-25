import { NextRequest, NextResponse } from 'next/server'
import createServerSupabaseClient from '@/lib/supabase/server'

export const PUT = async (request: NextRequest) => {
    try {
        const supabase = await createServerSupabaseClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
        }

        const body = await request.json()
        const { id, title, content } = body

        if (!title || !content) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const { data: topic, error: fetchError } = await (supabase as any)
        .from('topics')
        .select('user_id')
        .eq('id', id)
        .single()

        if (fetchError || !topic) {
            return NextResponse.json({ error: 'Topic not found' }, { status: 404 })
        }

        if (topic.user_id !== user.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
        }

        const updateData = {
            title,
            content,
        }

        const { error } = await (supabase as any)
        .from('topics')
        .update(updateData)
        .eq('id', id)

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}