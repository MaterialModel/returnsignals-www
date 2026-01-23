/**
 * Conversation types based on OpenAPI schema
 */

export type ConversationStatus = 'active' | 'resolved' | 'escalated' | 'expired'
export type MessageDirection = 'inbound' | 'outbound'
export type MessageStatus = 'pending' | 'sent' | 'delivered' | 'failed' | 'read'
export type SpeakerType = 'customer' | 'bot' | 'human_agent'

export interface ConversationSummary {
  conversation_id: string
  customer_phone: string
  customer_name: string | null
  status: ConversationStatus
  last_message_preview: string | null
  last_message_at: string | null
  unread_count: number
  created_at: string
}

export interface ConversationListResponse {
  conversations: ConversationSummary[]
  total: number
}

export interface Message {
  message_id: string
  direction: MessageDirection
  speaker: SpeakerType
  content: string
  status: MessageStatus
  sent_by_user_id: string | null
  media_urls: string[]
  created_at: string
}

export interface ConversationDetail {
  conversation_id: string
  customer_phone: string
  customer_name: string | null
  customer_email: string | null
  status: ConversationStatus
  order_id: string | null
  messages: Message[]
  created_at: string
  updated_at: string
}

export interface SendMessageRequest {
  content: string
}

export interface SendMessageResponse {
  message: Message
}
