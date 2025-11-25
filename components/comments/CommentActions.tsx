'use client'
import { useRouter } from 'next/navigation'
import deleteComment from '@/lib/actions/comments/deleteComment'
import { commentActionsText } from '@/lib/data/commentText'
import Button from '@/components/common/Button'

interface CommentActionsProps {
  commentId: string
  categorySlug: string
  topicSlug: string
}

const CommentActions = ({commentId, categorySlug, topicSlug}: CommentActionsProps) => {
    const router = useRouter()
    const handleDelete = async () => {
        if (!confirm(commentActionsText.deleteConfirm)) return
        const result = await deleteComment(commentId, categorySlug, topicSlug)

        if (result?.error) {
            alert(result.error)
        } else {
            router.refresh()
        }
    }

  return (
    <Button variant="danger" onClick={handleDelete} className="text-sm px-2 py-1">
        {commentActionsText.deleteButton}
    </Button>
  )
}

export default CommentActions