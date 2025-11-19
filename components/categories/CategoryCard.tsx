import Link from 'next/link'
import type { Category } from '@/lib/types/categories'
import { categoryText } from '@/lib/data/categoryText'

interface CategoryCardProps {
  category: Category
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <div>
      <h3>{category.name}</h3>
      {category.description && <p>{category.description}</p>}
      {category.topic_count !== undefined && (
        <p>
            {category.topic_count} {category.topic_count === 1 ? categoryText.topicSingular : categoryText.topicPlural}
        </p>
      )}
      <Link href={`/category/${category.slug}`}>
        {categoryText.linkText}
      </Link>
    </div>
  )
}

export default CategoryCard