import { NextRequest, NextResponse } from 'next/server'
import getTopicBySlug from '@/lib/actions/topics/getTopicBySlug'
import getCurrentUser from '@/lib/actions/auth/getCurrentUser'

export const GET = async (
    _request: NextRequest,
    { params }: { params: Promise<{ categorySlug: string; topicSlug: string }> }
) => {
    try {
        const { categorySlug, topicSlug } = await params
        const [topic, user] = await Promise.all([
            getTopicBySlug(categorySlug, topicSlug),
            getCurrentUser()])

        if (!topic) {
            return NextResponse.json({ error: 'Topic not found' }, { status: 404 })
        }

        if (!user || topic.user_id !== user.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
        }

        return NextResponse.json(topic, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}