import { notFound, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

interface EditTopicPageProps {
    params: Promise<{
        slug: string;
        topicSlug: string;
    }>
}

const EditTopicPage = ({params}: EditTopicPageProps) => {
    const {slug, topicSlug} = use(params)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [topicId, setTopicId] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const router = useRouter()

    useEffect (() => {
        const fetchTopic = async () => {
            try {
                const response = await fetch(`/api/category/${slug}/${topicSlug}`)
                if (!response.ok) return notFound()

                    const data = await response.json()
                    setTopicId(data.id)
                    setTitle(data.title)
                    setContent(data.content)
                    setLoading(false)
            } catch {
                setError('Failed to load topic')
                setLoading(false)
            }
        }
        fetchTopic()
    }, [slug, topicSlug])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setSubmitting(true)

        try {
            const response = await fetch(`/api/topics/${topicId}/update`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, content, categorySlug: slug, topicSlug })
            })
            
            const data = await response.json()
            if (!response.ok) {
                setError(data.error || 'Failed to update topic')
                setSubmitting(false)
                return
            }
            router.push(`/category/${slug}/${topicSlug}`)
        } catch (err) {
            setError('someyhing went wrong')
            setSubmitting(false)
        }
    }

    return (
        <div>

        </div>
    )
}

export default EditTopicPage