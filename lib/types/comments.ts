export interface CommentWithDetails {
    id: string
    content: string
    topic_id: string
    user_id: string
    parent_id: string | null
    created_at: string
    updated_at: string
    profiles: {
        username: string
        avatar_url: string | null
    }
    replies?: CommentWithDetails[]
    like_count?: number
    user_has_liked?: boolean
}