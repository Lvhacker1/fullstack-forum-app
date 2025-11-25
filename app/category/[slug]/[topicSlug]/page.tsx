import { notFound } from 'next/navigation'
import getTopicBySlug from '@/lib/actions/topics/getTopicBySlug'
import getCurrentUser from '@/lib/actions/auth/getCurrentUser'
import Header from '@/components/layout/Header'
import { topicPageText } from '@/lib/data/topicPage'
import getCommentsByTopic from '@/lib/actions/comments/getCommentsByTopic'
import CommentList from '@/components/comments/CommentList'
import { commentSectionText } from '@/lib/data/commentText'
import { Link } from 'lucide-react'
import { ROUTES } from '@/lib/constants/routes'
import CommentForm from '@/components/comments/CommentForm'
import TopicActions from '@/components/topics/TopicAction'
import BackButton from '@/components/common/BackButton'

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
    const isOwner = user && user.id === topic.user_id

  return (
    <div className="min-h-screen bg-gray-50">
        <Header user={user} />
        <main className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-6">
                <BackButton fallbackUrl={ROUTES.HOME} />
            </div>
            <article className="bg-white p-8 rounded-lg shadow">
                <h1 className="text-3xl font-bold mb-4">{topic.title}</h1>
                {isOwner && (
                    <TopicActions topicId={topic.id} categorySlug={slug} topicSlug={topicSlug}/>
                )}
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
                <h2 className="text-2xl font-bold mb-6">{commentSectionText.commentsHeading}</h2>
                {user ? (
                    <div className="mb-6">
                        <CommentForm topicId={topic.id}/>
                    </div>
                ) : (
                    <div className="mb-8 p-4 bg-gray-50 rounded-lg text-center">
                        <Link href={ROUTES.LOGIN} className="text-blue-600 hover:underline">
                            {commentSectionText.loginToComment}
                        </Link>
                    </div>
                )}
                <CommentList comments={comments} currentUserId={user?.id} categorySlug={slug} topicSlug={topicSlug} topicOwnerId={topic.user_id} />
            </section>
        </main>
    </div>
  )
}

export default TopicPage