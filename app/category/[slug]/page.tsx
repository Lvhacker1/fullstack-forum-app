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

  return (
    <div className="min-h-screen">
        <Header user={user} />
        <main className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-6">
                <BackButton fallbackUrl={ROUTES.HOME} />
            </div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">{category.name}</h1>
                    {category.description && (
                        <p className="text-gray-700 mt-2">{category.description}</p>
                    )}
                </div>
                {user && (
                    <Link className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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