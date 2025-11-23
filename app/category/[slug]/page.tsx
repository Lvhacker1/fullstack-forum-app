import { notFound } from 'next/navigation'
import Link from 'next/link'
import getCategoryBySlug from '@/lib/actions/categories/getCategoryBySlug'
import getTopicsByCategory from '@/lib/actions/topics/getTopicsByCategory'
import getCurrentUser from '@/lib/actions/auth/getCurrentUser'
import Header from '@/components/layout/Header'
import { categoryPage } from '@/lib/data/categoryPage' 

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
    <div className="min-h-screen bg-gray-50">
        <Header user={user} />
        <main className="max-w-7xl mx-auto px-4 py-8">
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
                        {categoryPage.newTopicButton}
                    </Link>
                )}
            </div>

            {topics.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-700">{categoryPage.noTopicsMessage}</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {topics.map((topic) => (
                        <Link className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                            key={topic.id}
                            href={`/category/${slug}/${topic.slug}`}>
                            <h2 className="text-xl font-bold mb-2">{topic.title}</h2>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span>{categoryPage.byText} {topic.profiles.username}</span>
                                <span>•</span>
                                <span>{new Date(topic.created_at).toLocaleDateString()}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </main>
    </div>
  )
}

export default CategoryPage