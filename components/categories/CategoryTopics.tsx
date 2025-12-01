'use client'
import SearchBar from '@/components/common/SearchBar'
import { categoryTopicsText } from '@/lib/data/categoryTopicsText'
import Link from 'next/link'
import type { TopicWithDetails } from '@/lib/types/topics'
import { useState } from 'react'
import Image from 'next/image'

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
    <div className='w-full'>
        <div className="mb-10">
            <SearchBar onSearch={handleSearch} />
        </div>
        {searchQuery && (
            <p className="text-slate-400 mb-4 text-sm">
                {categoryTopicsText.searchResultsFor} &quot;{searchQuery}&quot;
            </p>
        )}
        {isLoading ? (
            <div className="text-center py-12">
                <p className="text-blue-400 font-medium">{categoryTopicsText.loadingText}</p>
            </div>
        ) : topics.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-slate-800 rounded-2xl bg-slate-900/30">
                <p className="text-slate-400">
                    {searchQuery ? categoryTopicsText.noSearchResults : categoryTopicsText.noTopicsMessage}
                </p>
            </div>
        ) : (
            <div className="flex flex-col gap-6">
                {topics.map((topic) => (
                    <Link  className="relative flex flex-col md:flex-row gap-5 p-5 rounded-xl border border-slate-800 bg-slate-900/40 transition-all duration-200 hover:border-blue-500/50 hover:bg-slate-900/60 hover:shadow-lg hover:shadow-blue-900/10 group"
                    key={topic.id}
                    href={`/category/${categorySlug}/${topic.slug}`}>
                        <div className="flex md:flex-col items-center md:items-start gap-3 md:w-44 shrink-0 md:border-r md:border-slate-800/50 md:pr-5">
                            <div className="flex items-center gap-3 w-full">
                                <div className="h-9 w-9 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-300 font-bold text-sm group-hover:border-blue-500/30 group-hover:text-blue-400 transition-colors shrink-0">
                                    {topic.profiles.username.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex flex-col overflow-hidden">
                                    <span className="text-slate-200 font-medium text-sm group-hover:text-blue-400 transition-colors truncate">
                                        {topic.profiles.username}
                                    </span>
                                    <span className="text-slate-500 text-xs whitespace-nowrap">
                                        {new Date(topic.created_at).toISOString().split('T')[0]}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col grow justify-center py-1 min-w-0">
                        <h2 className="text-lg md:text-xl font-bold text-slate-100 mb-2 leading-snug group-hover:text-blue-100 transition-colors break">
                            {topic.title}
                        </h2>
                        {topic.image_url && (
                            <div className="md:hidden mt-3 mb-3 rounded-lg overflow-hidden border border-slate-800 relative h-48">
                                <Image src={topic.image_url} alt={topic.title} className="object-cover" fill  />
                            </div>
                        )}
                        <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mt-2">
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                </svg>
                                {categoryTopicsText.discussText}
                            </span>
                        </div>
                        </div>
                        <div className="hidden md:flex items-center gap-5 md:pl-5 md:border-l border-slate-800/50 shrink-0">
                            {topic.image_url && (
                                <div className="h-16 w-24 rounded-lg border border-slate-800 bg-slate-900/50 overflow-hidden shrink-0 group-hover:border-blue-500/30 transition-colors relative">
                                    <Image src={topic.image_url} alt={topic.title} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                </div>
                            )}
                            <svg className="w-5 h-5 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all transform shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </Link>
                ))}
            </div>
        )}
    </div>
  )
}

export default CategoryTopics