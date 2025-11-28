import { NextRequest, NextResponse } from 'next/server'
import createServerSupabaseClient from '@/lib/supabase/server'

export const POST = async (request: NextRequest) => {
    try {
        const supabase = await createServerSupabaseClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
        }

        const formData = await request.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 })
        }

        const fileExt = file.name.split('.').pop()
        const fileName = `${user.id}-${Date.now()}.${fileExt}`
        const { error } = await supabase.storage
        .from('topic_images')
        .upload(fileName, file)

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        const { data: urlData } = supabase.storage
        .from('topic_images')
        .getPublicUrl(fileName)

        return NextResponse.json({ url: urlData.publicUrl }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
    }
}