import Comment from './Comment'
import type { CommentWithDetails } from '@/lib/types/comments'
import { commentListText } from '@/lib/data/commentText'

interface CommentListProps {
    comments: CommentWithDetails[]
    currentUserId?: string
    categorySlug: string
    topicSlug: string
    topicOwnerId: string 
    topicId: string
}

const CommentList = ({ comments, currentUserId, categorySlug, topicSlug, topicOwnerId, topicId }: CommentListProps) => {
    if (comments.length === 0) {
        return (
            <div className="text-center py-12 border border-dashed border-slate-800 rounded-xl bg-slate-900/20">
                <p className="text-slate-500 font-medium">
                    {commentListText.noCommentsYet}
                </p>
            </div>
        )
  }

  return (
    <div className="space-y-6">
        {comments.map((comment) => (
            <Comment
            key={comment.id} 
            comment={comment}
            currentUserId={currentUserId}
            categorySlug={categorySlug}
            topicSlug={topicSlug}
            topicOwnerId={topicOwnerId}
            topicId={topicId} />
        ))}
    </div>
  )
}

export default CommentList