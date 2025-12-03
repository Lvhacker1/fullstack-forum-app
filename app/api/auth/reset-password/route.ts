import { NextRequest, NextResponse } from 'next/server'
import createServerSupabaseClient from '@/lib/supabase/server'

export const POST = async (request: NextRequest) => {
    try {
        const supabase = await createServerSupabaseClient()
        const { email } = await request.json()
        if (!email) {
            return NextResponse.json({ error: 'Email required' }, { status: 400 })
        }

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/update-password`,
        })

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 })
        }
        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}