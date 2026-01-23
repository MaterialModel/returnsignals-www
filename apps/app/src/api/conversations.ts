/**
 * Conversations API functions
 */

import { api } from './client'
import type {
  ConversationListResponse,
  ConversationDetail,
  ConversationStatus,
  SendMessageRequest,
  SendMessageResponse,
} from '@/types'

export interface ConversationListParams {
  status?: ConversationStatus
  limit?: number
  offset?: number
}

export interface CreateConversationRequest {
  customer_phone: string
  order_id?: string | null
  initial_message?: string | null
}

export interface CreateConversationResponse {
  conversation: ConversationDetail
  message_sent: boolean
}

export const conversationsApi = {
  /**
   * List conversations for an organization
   */
  list: (orgId: string, params?: ConversationListParams) => {
    const searchParams = new URLSearchParams()
    if (params?.status) searchParams.set('status', params.status)
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    if (params?.offset) searchParams.set('offset', params.offset.toString())

    const query = searchParams.toString()
    const endpoint = `/organizations/${orgId}/conversations${query ? `?${query}` : ''}`
    return api.get<ConversationListResponse>(endpoint)
  },

  /**
   * Get conversation details with messages
   */
  get: (orgId: string, conversationId: string) =>
    api.get<ConversationDetail>(`/organizations/${orgId}/conversations/${conversationId}`),

  /**
   * Create a new conversation (proactive outreach)
   */
  create: (orgId: string, data: CreateConversationRequest) =>
    api.post<CreateConversationResponse>(`/organizations/${orgId}/conversations`, data),

  /**
   * Send a message in a conversation
   */
  sendMessage: (orgId: string, conversationId: string, data: SendMessageRequest) =>
    api.post<SendMessageResponse>(
      `/organizations/${orgId}/conversations/${conversationId}/messages`,
      data
    ),
}
