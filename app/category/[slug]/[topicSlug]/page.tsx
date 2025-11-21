import { notFound } from 'next/navigation'
import getTopicBySlug from '@/lib/actions/topics/getTopicBySlug'
import getCurrentUser from '@/lib/actions/auth/getCurrentUser'
import Header from '@/components/layout/Header'
import { topicPageText } from '@/lib/data/topicPage'
import getCommentsByTopic from '@/lib/actions/comments/getCommentsByTopic'
import CommentList from '@/components/comments/CommentList'
import { commentText } from '@/lib/data/commentText'

interface TopicPageProps {
    params: {
        slug: string
        topicSlug: string
    }
}

const TopicPage = async ({ params }: TopicPageProps) => {
    const { slug, topicSlug } = await params
    const [topic, user] = await Promise.all([
        getTopicBySlug(slug, topicSlug),
        getCurrentUser()
    ])

    if (!topic) {
        notFound()
    }

    const comments = await getCommentsByTopic(topic.id)

  return (
    <div className="min-h-screen bg-gray-50">
        <Header user={user} />
        <main className="max-w-4xl mx-auto px-4 py-8">
            <article className="bg-white p-8 rounded-lg shadow">
                <h1 className="text-3xl font-bold mb-4">{topic.title}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                    <span>{topicPageText.byText} {topic.profiles.username}</span>
                    <span>•</span>
                    <span>{new Date(topic.created_at).toLocaleDateString()}</span>
                </div>
                <div className="prose max-w-none">
                    <p className="whitespace-pre-wrap">{topic.content}</p>
                </div>
                {topic.image_url && (
                    <img 
                    src={topic.image_url} 
                    alt={topic.title}
                    className="mt-6 rounded-md max-w-full"/>
                )}
            </article>
            <section className="bg-white p-8 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-6">{commentText.commentsHeading}</h2>
                <CommentList comments={comments} />
            </section>
        </main>
    </div>
  )
}

export default TopicPage