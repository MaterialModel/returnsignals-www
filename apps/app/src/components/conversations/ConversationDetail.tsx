/**
 * Full conversation detail view
 */

import { useState } from 'react'
import { useParams } from 'react-router-dom'
import type { ConversationDetail as ConversationDetailType } from '@/types'
import { useAuth, useOrganization } from '@/hooks'
import { LoadingSpinner, ErrorMessage, EmptyState } from '@/components/ui'
import { DevicePhoneIcon } from '@/components/ui/icons'
import { StatusBadge } from './StatusBadge'
import { MessageThread } from './MessageThread'
import { MessageForm } from './MessageForm'
import { CustomerViewModal } from './CustomerViewModal'
import { formatPhone, formatDateTime } from '@/utils/formatters'

interface ConversationDetailProps {
  conversation: ConversationDetailType | null
  isLoading: boolean
  error: Error | null
  onSendMessage: (content: string) => Promise<void>
}

export function ConversationDetail({
  conversation,
  isLoading,
  error,
  onSendMessage,
}: ConversationDetailProps) {
  const { orgId } = useParams<{ orgId: string }>()
  const { user } = useAuth()
  const { organization } = useOrganization(orgId)
  const [isCustomerViewOpen, setIsCustomerViewOpen] = useState(false)

  // Check if user can send messages (manager+ role in this org)
  const membership = user?.memberships.find((m) => m.organization_id === orgId)
  const canSendMessage = membership?.role && ['manager', 'admin', 'owner'].includes(membership.role)

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-full w-full flex items-center justify-center p-4">
        <ErrorMessage error={error} />
      </div>
    )
  }

  if (!conversation) {
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

  const displayName = conversation.customer_name || formatPhone(conversation.customer_phone)

  return (
    <div className="flex flex-col h-full w-full min-h-0">
      {/* Header - fixed height to align with left panel */}
      <div className="flex-shrink-0 border-b border-border h-[116px] flex flex-col justify-center">
        <div className="px-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-primary">{displayName}</h2>
              <p className="text-sm text-secondary">
                {formatPhone(conversation.customer_phone)}
                {conversation.customer_email && ` • ${conversation.customer_email}`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsCustomerViewOpen(true)}
                className="btn btn-secondary btn-sm flex items-center gap-1.5"
                aria-label="View as customer sees it"
              >
                <DevicePhoneIcon className="w-4 h-4" />
                <span>Customer View</span>
              </button>
              <StatusBadge status={conversation.status} />
            </div>
          </div>
          {conversation.order_id && (
            <p className="text-xs text-tertiary mt-2">Order: {conversation.order_id}</p>
          )}
          <p className="text-xs text-tertiary mt-1">
            Started {formatDateTime(conversation.created_at)}
          </p>
        </div>
      </div>

      {/* Messages */}
      <MessageThread messages={conversation.messages} />

      {/* Message form - only for managers+ */}
      {canSendMessage ? (
        <MessageForm
          onSend={onSendMessage}
          disabled={conversation.status === 'resolved' || conversation.status === 'expired'}
        />
      ) : (
        <div className="border-t border-border p-4 text-center">
          <p className="text-sm text-secondary">You need manager permissions to send messages.</p>
        </div>
      )}

      {/* Customer View Modal */}
      <CustomerViewModal
        isOpen={isCustomerViewOpen}
        onClose={() => setIsCustomerViewOpen(false)}
        messages={conversation.messages}
        brandName={organization?.name}
      />
    </div>
  )
}
