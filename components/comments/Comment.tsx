'use client'
import { CommentWithDetails } from "@/lib/types/comments"
import CommentActions from "./CommentActions"
import { useState } from "react"
import Button from "../common/Button"
import { commentActionsText } from "@/lib/data/commentText"
import CommentForm from "./CommentForm"

interface CommentProps {
    comment: CommentWithDetails
    currentUserId?: string
    categorySlug: string
    topicSlug: string
    topicOwnerId: string
    depth?: number
    topicId: string
}

const Comment = ({ comment, currentUserId, categorySlug, topicSlug, topicOwnerId, topicId, depth = 0 }: CommentProps) => {
    const [showReplyForm, setShowReplyForm] = useState(false)
    const isCommentOwner = currentUserId && currentUserId === comment.user_id
    const isTopicOwner = currentUserId && currentUserId === topicOwnerId
    const canDelete = isCommentOwner || isTopicOwner
    const canReply = currentUserId && depth < 3

    return (
        <div className={depth > 0 ? 'ml-6 border-l-2 border-gray-200 pl-4' : ''}>
        <div className="border-l-2 border-gray-400 pl-4 py-3">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-sm text-black mb-2">
                    <span className="font-semibold">{comment.profiles.username}</span>
                    <span>•</span>
                    <span>{new Date(comment.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex gap-2">
                    {canReply && (
                        <Button variant="secondary" onClick={() => setShowReplyForm(!showReplyForm)} className="text-sm px-2 py-1">
                            {commentActionsText.replyButton}
                        </Button>
                    )}
                    {canDelete && (
                        <CommentActions commentId={comment.id} categorySlug={categorySlug} topicSlug={topicSlug} />
                    )}
                </div>
            </div>
            <p className="text-gray-800 whitespace-pre-wrap">{comment.content}</p>
            {showReplyForm && (
                <div>
                    <CommentForm topicId={topicId} onCancel={() => setShowReplyForm} parentId={comment.id} />
                </div>
            )}
        </div>
        {comment.replies && comment.replies.length > 0 && (
            <div>
                {comment.replies.map((reply => (
                    <Comment key={reply.id} comment={reply} currentUserId={currentUserId} topicOwnerId={topicOwnerId} topicId={topicId}  categorySlug={categorySlug} topicSlug={topicSlug} depth={depth + 1}/>
                )))}
            </div>
        )}
        </div>
    )
}

export default Comment