import Comment from './Comment'
import type { CommentWithDetails } from '@/lib/types/comments'
import { commentListText } from '@/lib/data/commentText'

interface CommentListProps {
    comments: CommentWithDetails[]
    currentUserId?: string
    categorySlug: string
    topicSlug: string
    topicOwnerId: string 
}

const CommentList = ({ comments, currentUserId, categorySlug, topicSlug, topicOwnerId }: CommentListProps) => {
    if (comments.length === 0) {
        return (
            <div className="text-center py-8 text-gray-800">
                {commentListText.noCommentsYet}
            </div>
        )
  }

  return (
    <div className="space-y-4 text-center">
        {comments.map((comment) => (
            <Comment
            key={comment.id} 
            comment={comment}
            currentUserId={currentUserId}
            categorySlug={categorySlug}
            topicSlug={topicSlug}
            topicOwnerId={topicOwnerId} />
        ))}
    </div>
  )
}

export default CommentList