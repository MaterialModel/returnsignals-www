/**
 * Form for sending messages in a conversation
 */

import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui'
import { ApiError } from '@/api'

interface MessageFormProps {
  onSend: (content: string) => Promise<void>
  disabled?: boolean
}

export function MessageForm({ onSend, disabled }: MessageFormProps) {
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const trimmedContent = content.trim()
    if (!trimmedContent) return

    setError(null)
    setIsLoading(true)

    try {
      await onSend(trimmedContent)
      setContent('')
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.detail)
      } else {
        setError('Failed to send message. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Submit on Enter, but allow Shift+Enter for new lines
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as FormEvent)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border-t border-border p-4">
      {error && <p className="text-sm text-accent-error mb-2">{error}</p>}
      <div className="flex gap-2">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={disabled || isLoading}
          rows={1}
          className="
            flex-1 px-3 py-2 resize-none
            border border-border rounded
            bg-surface-base text-primary
            placeholder:text-tertiary
            focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent
            disabled:bg-surface-subtle disabled:text-tertiary disabled:cursor-not-allowed
          "
          style={{ minHeight: '42px', maxHeight: '120px' }}
        />
        <Button
          type="submit"
          variant="primary"
          disabled={disabled || !content.trim()}
          isLoading={isLoading}
        >
          Send
        </Button>
      </div>
      <p className="text-xs text-tertiary mt-2">Press Enter to send, Shift+Enter for new line</p>
    </form>
  )
}
