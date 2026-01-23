/**
 * Empty state shown when no conversation is selected
 */

import { EmptyState } from '@/components/ui'

export default function ConversationEmptyState() {
  return (
    <EmptyState
      icon={
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      }
      title="Select a conversation"
      description="Choose a conversation from the list to view messages."
      className="h-full"
    />
  )
}
