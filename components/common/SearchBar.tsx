'use client'
import Input from './Input'
import Button from './Button'
import { searchBarText } from '@/lib/data/searchBarText'
import { useState } from 'react'
import { Search, X } from 'lucide-react'

interface SearchBarProps {
    onSearch: (query: string) => void
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
    const [query, setQuery] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSearch(query)
    }

    const handleClear = () => {
        setQuery('')
        onSearch('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full">
        <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-500" />
            </div>
            <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchBarText.placeholder}
            className="w-full pl-10 bg-slate-900/50 border-slate-800 focus:border-blue-500"
            />
        </div>
        <Button type="submit" className="shrink-0">
            {searchBarText.searchButton}
        </Button>
        {query && (
            <Button type="button" variant="secondary" onClick={handleClear} className="shrink-0 flex items-center gap-2">
                <X size={18} className="text-slate-400" />
                <span className="hidden sm:inline">{searchBarText.clearButton}</span>
            </Button>
        )}
        
    </form>
  )
}

export default SearchBar