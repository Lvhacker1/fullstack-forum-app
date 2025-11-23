'use client'
import Link from 'next/link'
import Button from '@/components/common/Button'
import { topicActionsText } from '@/lib/data/topicPage'
import deleteTopic from '@/lib/actions/topics/deleteTopic'

interface TopicActionsProps {
    topicId: string
    categorySlug: string
    topicSlug: string
}

const TopicActions = ({categorySlug, topicSlug, topicId}: TopicActionsProps) => {
    const handleDelete = async () => {
        if (!confirm(topicActionsText.deleteConfirm)) 
            return

        const result = await deleteTopic(topicId, categorySlug)
        if (result?.error) {
            alert(`Error deleting topic: ${result.error}`)
        }
    }

  return (
    <div className="flex gap-2">
        <Link href={`/category/${categorySlug}/${topicSlug}/edit`}>
        <Button variant="secondary">
            {topicActionsText.editButton}
        </Button>
        </Link>
        <Button variant="danger" onClick={handleDelete}>
            {topicActionsText.deleteButton}
        </Button>
    </div>
  )
}

export default TopicActions