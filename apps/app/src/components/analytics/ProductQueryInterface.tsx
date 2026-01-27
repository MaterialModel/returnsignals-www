/**
 * AI-powered complaint search interface
 * Natural language queries about product complaints
 */

import { useState, useCallback, useEffect, useMemo, useRef } from 'react'
import { useSearchParams, useNavigate, useParams } from 'react-router-dom'
import { marked } from 'marked'
import { SearchIcon, LoadingSpinner } from '@/components/ui'
import { useComplaintSearch } from '@/hooks/useAnalytics'

interface QuerySuggestion {
  query: string
  label: string
}

const suggestions: QuerySuggestion[] = [
  {
    query: 'What products are customers most disappointed with?',
    label: 'Most complaints',
  },
  {
    query: 'Which products have fit or sizing issues?',
    label: 'Fit issues',
  },
  {
    query: 'What products have quality defect complaints?',
    label: 'Quality defects',
  },
]

export function ProductQueryInterface() {
  const { orgId } = useParams<{ orgId: string }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const initialQuery = searchParams.get('q') || ''
  const [inputValue, setInputValue] = useState(initialQuery)
  const { result, isLoading, error, search, reset } = useComplaintSearch(orgId)
  const hasSearchedInitialQuery = useRef(false)

  // Load initial query from URL on mount
  useEffect(() => {
    if (!hasSearchedInitialQuery.current && initialQuery && initialQuery.length >= 10) {
      hasSearchedInitialQuery.current = true
      search(initialQuery)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery])

  // Configure marked to handle links
  const renderedAnswer = useMemo(() => {
    if (!result?.answer) return ''

    // Custom renderer for links
    const renderer = new marked.Renderer()
    renderer.link = ({ href, text }) => {
      // Internal links (starting with /) should be handled by React Router
      if (href.startsWith('/')) {
        return `<a href="${href}" class="text-accent-primary hover:underline font-medium" data-internal="true">${text}</a>`
      }
      // External links open in new tab
      return `<a href="${href}" class="text-accent-primary hover:underline" target="_blank" rel="noopener noreferrer">${text}</a>`
    }

    return marked(result.answer, { renderer })
  }, [result?.answer])

  // Handle clicks on internal links to use React Router navigation
  const handleAnswerClick = useCallback(
    (e: React.MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a[data-internal="true"]') as HTMLAnchorElement
      if (link) {
        e.preventDefault()
        navigate(link.getAttribute('href') || '/')
      }
    },
    [navigate]
  )

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      const trimmedQuery = inputValue.trim()

      if (trimmedQuery.length < 10) {
        return
      }

      // Update URL with query
      setSearchParams({ q: trimmedQuery })

      await search(trimmedQuery)
    },
    [inputValue, search, setSearchParams]
  )

  const handleSuggestionClick = useCallback(
    (suggestion: QuerySuggestion) => {
      setInputValue(suggestion.query)
      setSearchParams({ q: suggestion.query })
      search(suggestion.query)
    },
    [search, setSearchParams]
  )

  const handleClear = useCallback(() => {
    setInputValue('')
    setSearchParams({})
    reset()
  }, [reset, setSearchParams])

  const isValidQuery = inputValue.trim().length >= 10

  return (
    <div className="space-y-4">
      {/* Search form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary">
            <SearchIcon />
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-surface-base border-2 border-border rounded-lg text-primary placeholder:text-tertiary focus:outline-none focus:border-accent-primary transition-colors"
            placeholder="Ask about product complaints..."
            minLength={10}
            maxLength={500}
            disabled={isLoading}
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={!isValidQuery || isLoading}
            className="px-4 py-2 bg-accent-primary text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent-primary/90 transition-colors flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <LoadingSpinner className="w-4 h-4" />
                Searching...
              </>
            ) : (
              'Search'
            )}
          </button>

          {(result || error) && (
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-2 text-secondary hover:text-primary transition-colors"
            >
              Clear
            </button>
          )}

          {!isValidQuery && inputValue.length > 0 && (
            <span className="text-sm text-tertiary">
              {10 - inputValue.trim().length} more characters needed
            </span>
          )}
        </div>
      </form>

      {/* Quick suggestions */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-secondary">Try:</span>
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleSuggestionClick(suggestion)}
            disabled={isLoading}
            className="text-xs px-3 py-1.5 rounded-full bg-surface-subtle text-secondary hover:bg-surface-elevated hover:text-primary disabled:opacity-50 transition-colors"
          >
            {suggestion.label}
          </button>
        ))}
      </div>

      {/* Error message */}
      {error && (
        <div className="p-4 bg-accent-error/10 border border-accent-error/20 rounded-lg">
          <p className="text-sm text-accent-error">{error}</p>
        </div>
      )}

      {/* Search result */}
      {result && (
        <div className="bg-surface-subtle border border-border rounded-lg p-5 space-y-4">
          {/* Markdown answer */}
          <div
            className="prose prose-sm max-w-none text-primary [&_a]:text-accent-primary [&_a]:no-underline hover:[&_a]:underline [&_strong]:text-primary [&_ul]:list-disc [&_ol]:list-decimal [&_li]:ml-4"
            onClick={handleAnswerClick}
            dangerouslySetInnerHTML={{ __html: renderedAnswer }}
          />

          {/* Rate limit info */}
          <div className="pt-3 border-t border-border flex items-center justify-between text-xs text-tertiary">
            <span>{result.query_tokens} tokens used</span>
            <span>{result.rate_limit_remaining.toLocaleString()} queries remaining this hour</span>
          </div>
        </div>
      )}
    </div>
  )
}
