'use client'
import { useEffect, useState } from 'react'
import { use } from 'react'
import { useRouter } from 'next/navigation'
import Input from '@/components/common/Input'
import Textarea from '@/components/common/Textarea'
import Button from '@/components/common/Button'
import ErrorMessage from '@/components/common/ErrorMessage'
import { createTopicPageText } from '@/lib/data/createTopicPage'
import ImageUpload from '@/components/images/ImageUpload'

interface NewTopicPageProps {
    params: Promise<{slug: string}>
}

const NewTopicPage = ({ params }: NewTopicPageProps) => {
    const { slug } = use(params)
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [categoryName, setCategoryName] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    useEffect(() => {
        const fetchCategory = async () => {
            const response = await fetch(`/api/categories/${slug}`)
            if (response.ok) {
                const data = await response.json()
                setCategoryName(data.name)
            }
        }
        fetchCategory()
    }, [slug])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const response = await fetch('/api/topics/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    content,
                    categorySlug: slug,
                    image_url: imageUrl || null,
            }),
        })

        const data = await response.json()

        if (!response.ok) {
            setError(data.error || 'Failed to create topic')
            setLoading(false)
            return
        }

        router.push(`/category/${slug}`)
        } catch (err) {
            setError('Something went wrong')
            setLoading(false)
    }
}

  return (
    <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-3xl mx-auto px-4">
            <h1 className="text-3xl font-bold mb-6 text-center">{createTopicPageText.heading}</h1>
            {categoryName && (
                <p className="text-black mb-6">
                    {createTopicPageText.inCategory} <span className="font-semibold">{categoryName}</span>
                </p>
            )}
            {error && <ErrorMessage message={error} />}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        {createTopicPageText.titleLabel}
                    </label>
                    <Input className="p-2 border rounded-md w-full border-gray-400 bg-gray-50 focus:outline-none focus:border-black focus:bg-white transition placeholder-gray-400"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required/>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        {createTopicPageText.contentLabel}
                    </label>
                    <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={10}
                    required/>
                </div>
                <ImageUpload onUpload={setImageUrl} />
                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? createTopicPageText.loading : createTopicPageText.submitButton}
                </Button>
            </form>
        </div>
    </div>
  )
}

export default NewTopicPage