import getCategories from '@/lib/actions/categories/getCategories'
import CategoryList from '@/components/categories/CategoryList'
import Header from '@/components/layout/Header'
import getCurrentUser from '@/lib/actions/auth/getCurrentUser'
import { homePageText } from '@/lib/data/homePage'

const HomePage = async () => {
  const [categories, user] = await Promise.all([
    getCategories(),
    getCurrentUser()
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />
      <main className="max-w-7xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">{homePageText.categoriesHeading}</h1>
        <CategoryList categories={categories} />
      </main>
    </div>
  )
}

export default HomePage