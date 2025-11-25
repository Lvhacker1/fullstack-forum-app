import { notFound } from "next/navigation";
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

    return (
        <div>

        </div>
    )
}

export default EditTopicPage