export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  created_at: string
  topic_count?: number
}