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
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Conversation list - hide on mobile when viewing detail */}
      <div
        className={`
          w-full md:w-80 lg:w-96 flex-shrink-0 border-r border-border
          overflow-y-auto bg-surface-base
          ${isDetailView ? 'hidden md:block' : 'block'}
        `}
      >
        <div className="sticky top-0 z-10 bg-surface-base border-b border-border p-4">
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
        <ConversationList conversations={conversations} isLoading={isLoading} error={error} />
      </div>

      {/* Conversation detail - Outlet renders the nested route */}
      <div
        className={`
          flex-1 bg-surface-base
          ${isDetailView ? 'block' : 'hidden md:block'}
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
