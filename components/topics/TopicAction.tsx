'use client'
import Link from 'next/link'
import Button from '@/components/common/Button'
import { topicActionsText } from '@/lib/data/topicPage'
import deleteTopic from '@/lib/actions/topics/deleteTopic'
import { Edit, Trash2 } from 'lucide-react'

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
        <Button variant="secondary" className="px-3 py-1 text-xs h-8">
            <Edit size={14} className="mr-1.5" />
            {topicActionsText.editButton}
        </Button>
        </Link>
        <Button variant="danger" onClick={handleDelete} className="px-3 py-1 text-xs h-8">
            <Trash2 size={14} className="mr-1.5" />
            {topicActionsText.deleteButton}
        </Button>
    </div>
  )
}

export default TopicActions