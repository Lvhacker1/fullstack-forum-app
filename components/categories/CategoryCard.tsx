import Link from 'next/link'
import type { Category } from '@/lib/types/categories'
import { categoryText } from '@/lib/data/categoryText'

interface CategoryCardProps {
  category: Category
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <div>
      <Link href={`/category/${category.slug}`} className="block h-full group">
      <div className="h-full p-6 rounded-xl border border-slate-800 bg-slate-900/50 transition-all duration-200 group-hover:border-blue-500 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.1)] flex flex-col">
      <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-blue-400 transition-colors">
        {category.name}
      </h3>
      {category.description && (
        <p className="text-slate-400 text-sm mb-4 grow leading-relaxed">
          {category.description}
        </p>
      )} 
      {category.topic_count !== undefined && (
        <div className="pt-4 mt-auto border-t border-slate-800/50 group-hover:border-slate-800 transition-colors">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider group-hover:text-slate-400">
            {category.topic_count} {category.topic_count === 1 ? categoryText.topicSingular : categoryText.topicPlural}
          </span>
        </div>
      )}
      </div>
      </Link>
    </div>
  )
}

export default CategoryCard