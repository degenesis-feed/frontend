"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, X, Clock, User, Hash, MessageSquare, Loader2 } from "lucide-react"

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
  onSearch: (query: string) => void
}

export default function SearchOverlay({ isOpen, onClose, onSearch }: SearchOverlayProps) {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const overlayRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches")
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches))
    }
  }, [])

  // Save recent searches to localStorage when updated
  useEffect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches))
  }, [recentSearches])

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  // Handle escape key to close
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [isOpen, onClose])

  const handleSearch = () => {
    if (!query.trim()) return

    setIsLoading(true)

    // Add to recent searches if not already there
    if (!recentSearches.includes(query)) {
      setRecentSearches((prev) => [query, ...prev.slice(0, 4)])
    }

    // Call the parent's onSearch function
    onSearch(query)

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
      onClose()
    }, 500)
  }

  const handleRecentSearch = (search: string) => {
    setQuery(search)
    onSearch(search)
    onClose()
  }

  const removeRecentSearch = (search: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setRecentSearches((prev) => prev.filter((item) => item !== search))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-start justify-center pt-16 px-4">
      <div ref={overlayRef} className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden">
        {/* Search Header */}
        <div className="flex items-center p-4 border-b border-gray-100">
          <Search className="h-5 w-5 text-gray-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 border-0 focus:ring-0 text-lg placeholder-gray-400 py-1"
            placeholder="Search Twitter"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          )}
          <button onClick={onClose} className="ml-2 px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-full">
            Cancel
          </button>
        </div>

        {/* Search Content */}
        <div className="max-h-[70vh] overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 text-orange-500 animate-spin" />
            </div>
          ) : query ? (
            <div className="p-4">
              {/* Search suggestions */}
              <div className="space-y-3">
                <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <Search className="h-5 w-5 text-gray-400 mr-3" />
                  <span>
                    Search for <strong>{query}</strong>
                  </span>
                </div>
                <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <Hash className="h-5 w-5 text-gray-400 mr-3" />
                  <span>#{query.replace(/\s+/g, "")}</span>
                </div>
                <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <User className="h-5 w-5 text-gray-400 mr-3" />
                  <span>
                    People with <strong>{query}</strong>
                  </span>
                </div>
              </div>

              {/* View all results button */}
              <button
                onClick={handleSearch}
                className="w-full mt-4 py-3 text-center text-orange-500 font-medium hover:bg-orange-50 rounded-lg"
              >
                View all results for "{query}"
              </button>
            </div>
          ) : (
            <div className="p-4">
              {/* Recent searches */}
              <h3 className="text-lg font-bold mb-3">Recent searches</h3>

              {recentSearches.length > 0 ? (
                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <div
                      key={index}
                      onClick={() => handleRecentSearch(search)}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                    >
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-gray-400 mr-3" />
                        <span>{search}</span>
                      </div>
                      <button
                        onClick={(e) => removeRecentSearch(search, e)}
                        className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 text-center py-8">
                  <MessageSquare className="h-10 w-10 mx-auto mb-3 text-gray-300" />
                  <p>Try searching for people, topics, or keywords</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

