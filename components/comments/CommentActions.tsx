'use client'
import { useRouter } from 'next/navigation'
import deleteComment from '@/lib/actions/comments/deleteComment'
import { commentActionsText } from '@/lib/data/commentText'
import Button from '@/components/common/Button'
import { Trash2 } from 'lucide-react'

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
    <Button variant="danger" onClick={handleDelete} className="text-sm px-2 py-1 h-auto min-h-0 border-transparent hover:border-red-900 opacity-60 hover:opacity-100 transition-all" title={commentActionsText.deleteButton}>
      <Trash2 size={14} />
    </Button>
  )
}

export default CommentActions