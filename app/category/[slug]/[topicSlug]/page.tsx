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
    <div className="min-h-screen">
        <Header user={user} />
        <main className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-6">
                <BackButton href={`/category/${slug}`} />
            </div>
            <article className="bg-slate-900 rounded-2xl shadow-lg border border-slate-800 mb-10">
                <div className="p-6 md:p-8">
                <h1 className="text-3xl font-bold mb-4 text-white">{topic.title}</h1>
                    <div className="flex items-center justify-between border-b border-slate-800 pb-6 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-bold text-sm shrink-0">
                                {topic.profiles.username.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <span className="font-semibold text-slate-200 block text-sm">
                                    {topicPageText.byText} : {topic.profiles.username}
                                </span>
                                <span className="text-xs text-slate-500 block mt-0.5">
                                    {new Date(topic.created_at).toLocaleDateString()} 
                                </span>
                            </div>
                        </div>
                        {isOwner && (
                            <TopicActions topicId={topic.id} categorySlug={slug} topicSlug={topicSlug}/>
                        )}
                    </div>
                    <div className="whitespace-pre-wrap prose prose-invert max-w-none text-slate-300 leading-relaxed text-base">
                        {topic.content}
                    </div>
                {topic.image_url && (
                    <div className="mt-8 rounded-xl overflow-hidden border border-slate-800 bg-black/30">
                        <img 
                        src={topic.image_url} 
                        alt={topic.title}
                        className="w-full h-auto max-h-[600px] object-contain mx-auto"/>
                    </div>
                )}
                </div>
            </article>
            <section className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
                    <h2 className="text-xl font-bold text-white">{commentSectionText.commentsHeading}</h2>
                    <span className="bg-slate-800 text-slate-400 px-2 py-1 rounded text-xs font-medium border border-slate-700">
                        {comments.length}
                    </span>
                </div>
                {user ? (
                    <div className="mb-10">
                        <div className="flex gap-4">
                            <div className="hidden md:flex h-9 w-9 rounded-full bg-slate-800 items-center justify-center text-slate-400 font-bold text-xs shrink-0 mt-1 border border-slate-700">
                                {user.username?.charAt(0).toUpperCase() || "U"}
                            </div>
                            <div className="flex-1">
                                <CommentForm topicId={topic.id}/>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="mb-10 p-6 bg-slate-900 rounded-xl border border-slate-800">
                        <Link href={ROUTES.LOGIN} className="text-blue-400 hover:text-blue-300 font-semibold hover:underline transition-colors">
                            {commentSectionText.loginToComment}
                        </Link>
                    </div>
                )}
                <CommentList comments={comments} currentUserId={user?.id} categorySlug={slug} topicSlug={topicSlug} topicOwnerId={topic.user_id} topicId={topic.id} />
            </section>
        </main>
    </div>
  )
}

export default TopicPage