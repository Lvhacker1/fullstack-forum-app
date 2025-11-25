import { CommentWithDetails } from "@/lib/types/comments"
import CommentActions from "./CommentActions"

interface CommentProps {
    comment: CommentWithDetails
    currentUserId?: string
    categorySlug: string
    topicSlug: string
    topicOwnerId: string
}

const Comment = ({ comment, currentUserId, categorySlug, topicSlug, topicOwnerId }: CommentProps) => {
    const isCommentOwner = currentUserId && currentUserId === comment.user_id
    const isTopicOwner = currentUserId && currentUserId === topicOwnerId
    const canDelete = isCommentOwner || isTopicOwner

    return (
        <div className="border-l-2 border-gray-400 pl-4 py-3">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-sm text-black mb-2">
                    <span className="font-semibold">{comment.profiles.username}</span>
                    <span>•</span>
                    <span>{new Date(comment.created_at).toLocaleDateString()}</span>
                </div>
                <div>
                    {canDelete && (
                        <CommentActions commentId={comment.id} categorySlug={categorySlug} topicSlug={topicSlug}/>
                    )}
                </div>
            </div>
            <p className="text-gray-800 whitespace-pre-wrap">{comment.content}</p>
        </div>

    )
}

export default Comment