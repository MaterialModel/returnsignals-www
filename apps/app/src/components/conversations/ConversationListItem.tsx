/**
 * Single conversation row in the list
 */

import { Link, useParams } from 'react-router-dom'
import type { ConversationSummary } from '@/types'
import { formatDate, formatPhone, truncate } from '@/utils/formatters'
import { StatusBadge } from './StatusBadge'

interface ConversationListItemProps {
  conversation: ConversationSummary
  isActive?: boolean
}

export function ConversationListItem({ conversation, isActive }: ConversationListItemProps) {
  const { orgId } = useParams<{ orgId: string }>()

  const displayName = conversation.customer_name || formatPhone(conversation.customer_phone)

  return (
    <Link
      to={`/org/${orgId}/conversations/${conversation.conversation_id}`}
      className={`
        block p-4 border-b border-border transition-colors
        ${isActive ? 'bg-surface-subtle' : 'hover:bg-surface-subtle'}
      `}
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-medium text-primary truncate">{displayName}</span>
          {conversation.unread_count > 0 && (
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-accent-primary text-inverse text-xs flex items-center justify-center">
              {conversation.unread_count > 9 ? '9+' : conversation.unread_count}
            </span>
          )}
        </div>
        <span className="flex-shrink-0 text-xs text-tertiary">
          {formatDate(conversation.last_message_at)}
        </span>
      </div>

      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-secondary truncate">
          {conversation.last_message_preview
            ? truncate(conversation.last_message_preview, 60)
            : 'No messages yet'}
        </p>
        <StatusBadge status={conversation.status} />
      </div>
    </Link>
  )
}
