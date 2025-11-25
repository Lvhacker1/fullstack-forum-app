export interface TopicWithDetails {
  id: string
  title: string
  slug: string
  content: string
  category_id: string | null
  user_id: string
  image_url: string | null
  created_at: string
  updated_at: string
  profiles: {
    username: string
    avatar_url: string | null
  }
  categories: {
    name: string
    slug: string
  } | null
  comment_count?: number
  like_count?: number
  user_has_liked?: boolean
}

export interface UpdateTopicInput {
  title?: string
  content?: string
  image_url?: string | null
}