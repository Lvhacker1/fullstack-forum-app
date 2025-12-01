import { notFound } from 'next/navigation'
import Link from 'next/link'
import getCategoryBySlug from '@/lib/actions/categories/getCategoryBySlug'
import getTopicsByCategory from '@/lib/actions/topics/getTopicsByCategory'
import getCurrentUser from '@/lib/actions/auth/getCurrentUser'
import Header from '@/components/layout/Header'
import BackButton from '@/components/common/BackButton'
import { ROUTES } from '@/lib/constants/routes'
import CategoryTopics from '@/components/categories/CategoryTopics'
import { categoryTopicsText } from '@/lib/data/categoryTopicsText'

interface CategoryPageProps {
    params: {slug: string}
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
    const { slug } = await params
  
    const [category, user] = await Promise.all([
        getCategoryBySlug(slug),
        getCurrentUser()
    ])

    if (!category) {
        notFound()
    }

    const topics = await getTopicsByCategory(category.id)
    const primaryButtonStyle =  'inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] bg-transparent text-blue-400 border border-blue-900 hover:border-blue-500 focus:ring-blue-900 shadow-[0_0_10px_rgba(59,130,246,0.1)]'

  return (
    <div className="min-h-screen">
        <Header user={user} />
        <main className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-6">
                <BackButton fallbackUrl={ROUTES.HOME} />
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-8 border-b border-slate-800">
                <div>
                    <h1 className="text-3xl font-bold text-white">{category.name}</h1>
                    {category.description && (
                        <p className="text-slate-400 mt-2 text-lg">{category.description}</p>
                    )}
                </div>
                {user && (
                    <Link className={primaryButtonStyle}
                    href={`/category/${slug}/new`}>
                        {categoryTopicsText.newTopicButton}
                    </Link>
                )}
            </div>
            <CategoryTopics
                categorySlug={slug}
                categoryId={category.id}
                initialTopics={topics}
            />
        </main>
    </div>
  )
}

export default CategoryPage