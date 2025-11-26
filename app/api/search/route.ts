import { NextRequest, NextResponse } from 'next/server'
import searchTopics from '@/lib/actions/search/searchTopics'

export const GET = async (request: NextRequest) => {
    try {
        const { searchParams } = new URL(request.url)
        const query = searchParams.get('q') || ''
        const categoryId = searchParams.get('categoryId') || '' 

        if (!categoryId) {
            return NextResponse.json({ error: 'Category ID required' }, { status: 400 })
        }
        
        const results = await searchTopics(query, categoryId) 
        return NextResponse.json(results, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Search failed' }, { status: 500 })
    }
}