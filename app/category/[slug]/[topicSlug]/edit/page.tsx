import Button from "@/components/common/Button";
import ErrorMessage from "@/components/common/ErrorMessage";
import Input from "@/components/common/Input";
import Textarea from "@/components/common/Textarea";
import { editTopicPageText } from "@/lib/data/editTopicPage";
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
            setError('Something went wrong')
            setSubmitting(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p>{editTopicPageText.loading}</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen py-8 bg-gray-50">
            <div className="max-w-3xl mx-auto px-4">
                <h1 className="text-3xl font-bold mb-6">{editTopicPageText.heading}</h1>
                {error && <ErrorMessage message={error} />}
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            {editTopicPageText.titleLabel}
                        </label>
                        <Input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            {editTopicPageText.contentLabel}
                        </label>
                        <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={10}
                        required/>
                    </div>
                    <div className="flex gap-2">
                        <Button type="submit" disabled={submitting}>
                            {submitting ? editTopicPageText.loading : editTopicPageText.submitButton}
                        </Button>
                        <Button type="button" variant="secondary" onClick={() => router.push(`/category/${slug}/${topicSlug}`)}>
                            {editTopicPageText.cancelButton}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditTopicPage