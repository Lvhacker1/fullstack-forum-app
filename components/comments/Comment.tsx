import { CommentWithDetails } from "@/lib/types/comments"

const Comment = ({comment}: { comment: CommentWithDetails} ) => {
    return (
        <div className="border-l-2 border-gray-400 pl-4 py-3">
            <div className="flex items-center gap-2 text-sm text-black mb-2">
                <span className="font-semibold">{comment.profiles.username}</span>
                <span>•</span>
                <span>{new Date(comment.created_at).toLocaleDateString()}</span>
            </div>
            <p className="text-gray-800 whitespace-pre-wrap">{comment.content}</p>
        </div>

    )
}

export default Comment