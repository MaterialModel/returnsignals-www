/**
 * Conversations inbox page
 */

import { useState } from 'react'
import { useParams, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useConversations, useConversationFilters, useAuth } from '@/hooks'
import { conversationsApi, type CreateConversationRequest } from '@/api'
import { ConversationList, StatusFilter, NewConversationModal } from '@/components/conversations'
import { Button } from '@/components/ui'

export default function ConversationsPage() {
  const { orgId } = useParams<{ orgId: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { status, setStatus, params } = useConversationFilters()
  const { conversations, isLoading, error, refetch } = useConversations(orgId, params)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Check if user can create conversations (manager+ role)
  const membership = user?.memberships.find((m) => m.organization_id === orgId)
  const canCreateConversation =
    membership?.role && ['manager', 'admin', 'owner'].includes(membership.role)

  // Check if we're on a detail page (has convId in path)
  const isDetailView =
    location.pathname.includes('/conversations/') &&
    location.pathname !== `/org/${orgId}/conversations`

  const handleCreateConversation = async (data: CreateConversationRequest) => {
    if (!orgId) throw new Error('Organization ID is required')

    const response = await conversationsApi.create(orgId, data)

    // Refresh the list and navigate to the new conversation
    refetch()
    navigate(`/org/${orgId}/conversations/${response.conversation.conversation_id}`)
  }

  return (
    <div className="flex h-full">
      {/* Left column: Conversations list */}
      <div
        className={`
          w-full md:w-80 lg:w-96 flex-shrink-0 border-r border-border
          flex flex-col bg-surface-base
          ${isDetailView ? 'hidden md:flex' : 'flex'}
        `}
      >
        {/* Header */}
        <div className="flex-shrink-0 border-b border-border p-4 h-[116px] flex flex-col justify-center">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-lg font-medium text-primary">Conversations</h1>
            {canCreateConversation && (
              <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                New
              </Button>
            )}
          </div>
          <StatusFilter value={status} onChange={setStatus} />
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          <ConversationList conversations={conversations} isLoading={isLoading} error={error} />
        </div>
      </div>

      {/* Right column: Conversation detail */}
      <div
        className={`
          flex-1 bg-surface-base h-full overflow-hidden flex flex-col min-h-0
          ${isDetailView ? 'flex' : 'hidden md:flex'}
        `}
      >
        <Outlet />
      </div>

      {/* New Conversation Modal */}
      <NewConversationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateConversation}
      />
    </div>
  )
}
