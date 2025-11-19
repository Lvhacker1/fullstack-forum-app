import CategoryCard from './CategoryCard'
import type { Category } from '@/lib/types/categories'
import { categoryText } from '@/lib/data/categoryText'

const CategoryList = ({ categories }: { categories: Category[] }) => {
  if (categories.length === 0) {
    return (
      <div>
        <h3>{categoryText.noCategoriesFound}</h3>
      </div>
    )
  }
  return (
    <div>
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  )
}

export default CategoryList