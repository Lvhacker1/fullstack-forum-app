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
        const arrayBuffer = await file.arrayBuffer()
        const buffer = new Uint8Array(arrayBuffer)
        const { error } = await supabase.storage
        .from('topic-images')
        .upload(fileName, buffer, {
            contentType: file.type,
        })

        if (error) {
            console.error('Storage upload error:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        const { data: urlData } = supabase.storage
        .from('topic-images')
        .getPublicUrl(fileName)

        console.log('Upload success:', urlData.publicUrl)

        return NextResponse.json({ url: urlData.publicUrl }, { status: 200 })
    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
    }
}