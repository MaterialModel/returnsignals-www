/**
 * Conversation detail page
 */

import { useParams, Link } from 'react-router-dom'
import { useConversation } from '@/hooks'
import { ConversationDetail } from '@/components/conversations'

// Poll for new messages every 5 seconds
const POLLING_INTERVAL = 5000

export default function ConversationDetailPage() {
  const { orgId, convId } = useParams<{ orgId: string; convId: string }>()
  const { conversation, isLoading, error, sendMessage } = useConversation(orgId, convId, {
    pollingInterval: POLLING_INTERVAL,
  })

  const handleSendMessage = async (content: string) => {
    await sendMessage(content)
  }

  return (
    <div className="h-full flex flex-col">
      {/* Mobile back button */}
      <div className="md:hidden border-b border-border p-2">
        <Link
          to={`/org/${orgId}/conversations`}
          className="inline-flex items-center gap-1 text-sm text-secondary hover:text-primary"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to list
        </Link>
      </div>

      <div className="flex-1 min-h-0">
        <ConversationDetail
          conversation={conversation}
          isLoading={isLoading}
          error={error}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  )
}
