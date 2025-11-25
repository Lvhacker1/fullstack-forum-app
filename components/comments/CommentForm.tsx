'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Textarea from '@/components/common/Textarea'
import Button from '@/components/common/Button'
import ErrorMessage from '@/components/common/ErrorMessage'
import { commentFormText } from '@/lib/data/commentText'

interface CommentFormProps {
    topicId: string
}

const CommentForm = ({ topicId }: CommentFormProps) => {
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
        placeholder={commentFormText.commentPlaceholder}
        rows={4}
        required/>
        <Button type="submit" disabled={loading}>
            {commentFormText.submitButton}
        </Button>
    </form>
  )
}

export default CommentForm