/**
 * Natural language query interface with animations
 */

import { useState, useEffect, useCallback } from 'react'
import { SearchIcon, InfoIcon } from '@/components/ui'

interface QuerySuggestion {
  query: string
  category: string
  description: string
}

interface ProductQueryInterfaceProps {
  onQuerySelect?: (query: string) => void
}

const suggestions: QuerySuggestion[] = [
  {
    query: 'What are common fit complaints for the wrap dress?',
    category: 'fit_sizing',
    description: 'Analyze fit and sizing issues',
  },
  {
    query: 'Which products have the highest quality defect rate?',
    category: 'quality_defects',
    description: 'Find quality issues',
  },
  {
    query: 'What products are customers most disappointed with?',
    category: 'expectations_mismatch',
    description: 'Identify expectations gaps',
  },
]

export function ProductQueryInterface({ onQuerySelect }: ProductQueryInterfaceProps) {
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  const currentSuggestion = suggestions[currentSuggestionIndex]

  // Typewriter effect
  useEffect(() => {
    if (!isTyping) return

    const fullText = currentSuggestion.query
    let index = 0

    const typeInterval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(typeInterval)
        setIsTyping(false)
        // Show answer after typing completes
        setTimeout(() => setShowAnswer(true), 300)
      }
    }, 40) // Typing speed

    return () => clearInterval(typeInterval)
  }, [isTyping, currentSuggestion.query])

  // Auto-cycle through suggestions
  useEffect(() => {
    if (isTyping) return

    const cycleTimeout = setTimeout(() => {
      setShowAnswer(false)
      setTimeout(() => {
        setDisplayText('')
        setIsTyping(true)
        setCurrentSuggestionIndex((prev) => (prev + 1) % suggestions.length)
      }, 300)
    }, 5000) // Show each suggestion for 5 seconds

    return () => clearTimeout(cycleTimeout)
  }, [isTyping])

  const handleSuggestionClick = useCallback(
    (suggestion: QuerySuggestion) => {
      setDisplayText(suggestion.query)
      setIsTyping(false)
      setShowAnswer(true)
      onQuerySelect?.(suggestion.query)
    },
    [onQuerySelect]
  )

  return (
    <div className="space-y-4">
      {/* Search input with typewriter */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary">
          <SearchIcon />
        </div>
        <input
          type="text"
          value={displayText}
          readOnly
          className="w-full pl-12 pr-4 py-3 bg-surface-base border-2 border-accent-primary/30 rounded-lg text-primary focus:outline-none focus:border-accent-primary transition-colors"
          placeholder="Ask a question about your products..."
        />
        {isTyping && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-accent-primary animate-pulse" />
        )}
      </div>

      {/* Animated answer */}
      {showAnswer && (
        <div
          className="bg-accent-primary/5 border border-accent-primary/20 rounded-lg p-4 animate-fadeIn"
          style={{ animation: 'fadeIn 0.3s ease-out' }}
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-accent-primary/10 rounded-lg">
              <InfoIcon className="w-5 h-5 text-accent-primary" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-primary mb-2">
                {currentSuggestion.description}
              </div>
              <div className="text-sm text-secondary">
                Select a product from the table below to see detailed issue analytics, or use the
                category breakdown to filter by issue type.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick suggestions */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-secondary">Try:</span>
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => handleSuggestionClick(suggestion)}
            className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
              index === currentSuggestionIndex
                ? 'bg-accent-primary text-white'
                : 'bg-surface-subtle text-secondary hover:bg-surface-elevated hover:text-primary'
            }`}
          >
            {suggestion.description}
          </button>
        ))}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
