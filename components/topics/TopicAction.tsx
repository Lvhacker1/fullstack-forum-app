'use client'
import Link from 'next/link'
import Button from '@/components/common/Button'
import { topicActionsText } from '@/lib/data/topicPage'

interface TopicActionsProps {
    topicId: string
    categorySlug: string
    topicSlug: string
}

const TopicActions = ({categorySlug, topicSlug}: TopicActionsProps) => {

  return (
    <div className="flex gap-2">
        <Link href={`/category/${categorySlug}/${topicSlug}/edit`}>
        <Button variant="secondary">
            {topicActionsText.editButton}
        </Button>
        </Link>
        <Button variant="danger">
            {topicActionsText.deleteButton}
        </Button>
    </div>
  )
}

export default TopicActions