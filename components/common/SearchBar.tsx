'use client'
import Input from './Input'
import Button from './Button'
import { searchBarText } from '@/lib/data/searchBarText'
import { useState } from 'react'

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
    <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={searchBarText.placeholder}
        className="flex-1"
        />
        <Button type="submit">
            {searchBarText.searchButton}
        </Button>
        {query && (
            <Button type="button" variant="secondary" onClick={handleClear}>
                {searchBarText.clearButton}
            </Button>
        )}
    </form>
  )
}

export default SearchBar