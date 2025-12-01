import CategoryCard from './CategoryCard'
import type { Category } from '@/lib/types/categories'
import { categoryText } from '@/lib/data/categoryText'

const CategoryList = ({ categories }: { categories: Category[] }) => {
  if (categories.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-slate-400 text-lg">{categoryText.noCategoriesFound}</h3>
      </div>
    )
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  )
}

export default CategoryList