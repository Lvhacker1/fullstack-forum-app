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
        <div className={`${depth > 0 ? 'ml-4 md:ml-8 mt-4' : 'mb-6'} ${depth > 0 ? 'border-l-2 border-slate-800 pl-4' : ''}`}>
        <div className={`relative p-4 rounded-xl ${depth === 0 ? 'bg-slate-900 border border-slate-800' : 'bg-transparent'}`}>
            <div className="flex items-start justify-between mb-2 gap-3">
                <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 font-bold text-xs">
                    {comment.profiles.username.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold ${isTopicOwner && comment.user_id === topicOwnerId ? 'text-blue-400' : 'text-slate-200'}`}>
                            {comment.profiles.username}
                        </span>
                        {comment.user_id === topicOwnerId && (
                            <span className="text-[10px] bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/20">
                                {new Date(comment.created_at).toLocaleDateString()}
                            </span>
                        )}
                    </div>
                </div>
                {canDelete && (
                    <CommentActions commentId={comment.id} categorySlug={categorySlug} topicSlug={topicSlug} />
                )}
            </div>
            <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap pl-11">
                 {comment.content}
            </div>
            <div className="flex gap-2 mt-3 pl-11">
                {canReply && (
                    <Button variant="secondary" onClick={() => setShowReplyForm(!showReplyForm)} className="text-xs px-3 py-1 h-auto min-h-0 bg-transparent border border-slate-700 hover:border-slate-500 text-slate-400">
                        {commentActionsText.replyButton}
                    </Button>
                )}
            </div>
            {showReplyForm && (
                <div className="mt-4 ml-11">
                    <div>
                        <CommentForm topicId={topicId} onCancel={() => setShowReplyForm(false)} parentId={comment.id} />
                    </div>
                </div>
            )}
        </div>
        {comment.replies && comment.replies.length > 0 && (
            <div className="mt-2">
                {comment.replies.map((reply => (
                    <Comment key={reply.id} comment={reply} currentUserId={currentUserId} topicOwnerId={topicOwnerId} topicId={topicId}  categorySlug={categorySlug} topicSlug={topicSlug} depth={depth + 1}/>
                )))}
            </div>
        )}
        </div>
    )
}

export default Comment