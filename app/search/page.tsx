'use client'
import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import BackButton from '@/components/common/BackButton'
import { searchPageText } from '@/lib/data/searchPage'
import { categoryPage } from '@/lib/data/categoryPage'
import type { TopicWithDetails } from '@/lib/types/topics'

const SearchPage = () => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<TopicWithDetails[]>([])
    const [searched, setSearched] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!query.trim()) return
        setLoading(true)
        
        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
            const data = await response.json()
            setResults(data)
            setSearched(true)
        } catch (error) {
            console.error('Search failed:', error)
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className="min-h-screen bg-gray-50">
        <Header user={null} />
        <main className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-6">
            <BackButton />
            </div>
            <h1 className="text-3xl font-bold mb-6">{searchPageText.heading}</h1>
            <form onSubmit={handleSearch} className="flex gap-2 mb-8">
                <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPageText.placeholder}
                className="flex-1"/>
                <Button type="submit" disabled={loading}>
                    {searchPageText.searchButton}
                </Button>
            </form>
            {searched && (
                <div>
                    {query && (
                        <p className="text-gray-700 mb-4">
                            {searchPageText.resultsFor} &quot;{query}&quot;
                        </p>
                    )}
                    {results.length === 0 ? (
                        <p className="text-gray-600 text-center py-8">
                            {searchPageText.noResults}
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {results.map((topic) => (
                                <Link className="block p-6 bg-white rounded-md shadow hover:shadow-md transition-shadow" key={topic.id} href={`/category/${topic.categories?.slug}/${topic.slug}`}>
                                    <h2 className="text-xl font-bold mb-2">{topic.title}</h2>
                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                        <span>{categoryPage.byText} {topic.profiles.username}</span>
                                        <span>•</span>
                                        <span>{topic.categories?.name}</span>
                                        <span>•</span>
                                        <span>{new Date(topic.created_at).toLocaleDateString()}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </main>
    </div>
  )
}

export default SearchPage