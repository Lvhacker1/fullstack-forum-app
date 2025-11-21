import { NextRequest, NextResponse } from 'next/server'
import getCategoryBySlug from '@/lib/actions/categories/getCategoryBySlug'

export const GET = async (
    request: NextRequest,
    { params }: { params: { slug: string } }
) => {
    try {
        const { slug } = params
        const category = await getCategoryBySlug(slug)
        if (!category) {
            return NextResponse.json(
                { error: 'Category not found!' },
                { status: 404 }
            )
        }

        return NextResponse.json(
            category,
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}