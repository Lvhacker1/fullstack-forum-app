import { NextRequest, NextResponse } from 'next/server'
import createServerSupabaseClient from '@/lib/supabase/server'
import getCategoryBySlug from '@/lib/actions/categories/getCategoryBySlug'

const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export const POST = async (request: NextRequest) => {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: 'Sign in to continue creating a topic.' }, { status: 401 })
    }

    const body = await request.json()
    const { title, content, categorySlug, image_url } = body

    if (!title || !content || !categorySlug) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const category = await getCategoryBySlug(categorySlug)

    if (!category) {
        return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }

    const slug = createSlug(title)
    const { data: existingTopic } = await supabase
    .from('topics')
    .select('id')
    .eq('category_id', category.id)
    .eq('slug', slug)
    .single()

    if (existingTopic) {
        return NextResponse.json(
            { error: 'Cannot create topic: title already exists.' },
            { status: 400 }
      )
    }

    const topicData = {
        title,
        slug,
        content,
        category_id: category.id,
        user_id: user.id,
        image_url: image_url || null,
    }

    const { data, error } = await (supabase as any)
    .from('topics')
    .insert(topicData)
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