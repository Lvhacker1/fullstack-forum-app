'use client'
import SearchBar from '@/components/common/SearchBar'
import { categoryTopicsText } from '@/lib/data/categoryTopicsText'
import Link from 'next/link'
import type { TopicWithDetails } from '@/lib/types/topics'
import { useState } from 'react'

interface CategoryTopicsProps {
    categorySlug: string
    categoryId: string
    initialTopics: TopicWithDetails[]
}

const CategoryTopics = ({ categorySlug, categoryId, initialTopics }: CategoryTopicsProps) => {
    const [topics, setTopics] = useState(initialTopics)
    const [isLoading, setIsLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = async (query: string) => {
        setSearchQuery(query)
        
        if (!query.trim()) {
            setTopics(initialTopics)
            return
        }
        setIsLoading(true)
        
        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&categoryId=${categoryId}`)
            const data = await response.json()
            setTopics(data)
        } catch (error) {
            console.error('Search failed:', error)
        } finally {
            setIsLoading(false)
        }
  }

  return (
    <div>
        <div className="mb-10">
            <SearchBar onSearch={handleSearch} />
        </div>
        {searchQuery && (
            <p className="text-slate-400 mb-4">
                {categoryTopicsText.searchResultsFor} &quot;{searchQuery}&quot;
            </p>
        )}
        {isLoading ? (
            <div className="text-center py-12">
                <p className="text-slate-500">{categoryTopicsText.loadingText}</p>
            </div>
        ) : topics.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-slate-800 rounded-xl">
                <p className="text-slate-400">
                    {searchQuery ? categoryTopicsText.noSearchResults : categoryTopicsText.noTopicsMessage}
                </p>
            </div>
        ) : (
            <div className="space-y-4">
                {topics.map((topic) => (
                    <Link  className="block p-6 rounded-xl border border-slate-800 bg-slate-900/50 transition-all duration-200 hover:border-blue-500 hover:shadow-[0_0_10px_rgba(59,130,246,0.1)] group"
                    key={topic.id}
                    href={`/category/${categorySlug}/${topic.slug}`}>
                        <h2 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-blue-400 transition-colors">{topic.title}</h2>
                        <div className="flex items-center gap-3 text-sm text-slate-500">
                            <span className="flex items-center gap-1">{categoryTopicsText.byText} 
                                <span className="text-slate-400">{topic.profiles.username}</span>
                            </span>
                            <span className="text-slate-700">•</span>
                            <span>{new Date(topic.created_at).toLocaleDateString()}</span>
                        </div>
                    </Link>
                ))}
            </div>
        )}
    </div>
  )
}

export default CategoryTopics