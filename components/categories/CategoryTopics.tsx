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
        <div className="mb-6">
            <SearchBar onSearch={handleSearch} />
        </div>
        {searchQuery && (
            <p className="text-gray-600 mb-4">
                {categoryTopicsText.searchResultsFor} &quot;{searchQuery}&quot;
            </p>
        )}
        {isLoading ? (
            <div className="text-center py-12">
                <p className="text-gray-500">{categoryTopicsText.loadingText}</p>
            </div>
        ) : topics.length === 0 ? (
            <div className="text-center py-12">
                <p className="text-gray-700">
                    {searchQuery ? categoryTopicsText.noSearchResults : categoryTopicsText.noTopicsMessage}
                </p>
            </div>
        ) : (
            <div className="space-y-4">
                {topics.map((topic) => (
                    <Link  className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                    key={topic.id}
                    href={`/category/${categorySlug}/${topic.slug}`}>
                        <h2 className="text-xl font-bold mb-2">{topic.title}</h2>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>{categoryTopicsText.byText} {topic.profiles.username}</span>
                            <span>•</span>
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