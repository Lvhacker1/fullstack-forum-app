'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Textarea from '@/components/common/Textarea'
import Button from '@/components/common/Button'
import ErrorMessage from '@/components/common/ErrorMessage'
import { commentFormText } from '@/lib/data/commentText'

interface CommentFormProps {
    topicId: string
    parentId?: string
    onCancel?: () => void
}

const CommentForm = ({ topicId, parentId, onCancel }: CommentFormProps) => {
    const router = useRouter()
    const [content, setContent] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const response = await fetch('/api/comments/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content,
                    topic_id: topicId,
                    parent_id: parentId
            }),
        })

        const data = await response.json()

        if (!response.ok) {
            setError(data.error || 'Failed to post comment')
            setLoading(false)
            return
        }

        setContent('')
        setLoading(false)
        if (onCancel) {
            onCancel()
        }
        router.refresh()
        } catch (err) {
        setError('Something went wrong')
        setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
        {error && <ErrorMessage message={error} />}
        <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={parentId ? commentFormText.replyPlaceholder : commentFormText.commentPlaceholder}
        rows={parentId ? 2 :4}
        required/>
        <div>
        <Button type="submit" disabled={loading}>
            {commentFormText.submitButton}
        </Button>
        {onCancel && (
            <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>
                {commentFormText.cancelButton}
            </Button>
        )}
        </div>
    </form>
  )
}

export default CommentForm