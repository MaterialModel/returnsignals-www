/**
 * Hooks for managing conversations
 */

import { useEffect, useState, useCallback } from 'react'
import { conversationsApi, type ConversationListParams } from '@/api'
import type { ConversationSummary, ConversationDetail, ConversationStatus } from '@/types'

export function useConversations(orgId: string | undefined, params?: ConversationListParams) {
  const [conversations, setConversations] = useState<ConversationSummary[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchConversations = useCallback(async () => {
    if (!orgId) {
      setConversations([])
      setTotal(0)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)
    try {
      const data = await conversationsApi.list(orgId, params)
      setConversations(data.conversations)
      setTotal(data.total)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch conversations'))
    } finally {
      setIsLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgId, params?.status, params?.limit, params?.offset])

  useEffect(() => {
    fetchConversations()
  }, [fetchConversations])

  return {
    conversations,
    total,
    isLoading,
    error,
    refetch: fetchConversations,
  }
}

export interface UseConversationOptions {
  /** Polling interval in milliseconds. Set to enable auto-refresh. */
  pollingInterval?: number
}

export function useConversation(
  orgId: string | undefined,
  conversationId: string | undefined,
  options?: UseConversationOptions
) {
  const [conversation, setConversation] = useState<ConversationDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchConversation = useCallback(async () => {
    if (!orgId || !conversationId) {
      setConversation(null)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)
    try {
      const data = await conversationsApi.get(orgId, conversationId)
      setConversation(data)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch conversation'))
    } finally {
      setIsLoading(false)
    }
  }, [orgId, conversationId])

  // Initial fetch
  useEffect(() => {
    fetchConversation()
  }, [fetchConversation])

  // Polling for new messages
  useEffect(() => {
    if (!options?.pollingInterval || !orgId || !conversationId) return

    const interval = setInterval(() => {
      // Silent refetch - don't show loading state
      conversationsApi
        .get(orgId, conversationId)
        .then(setConversation)
        .catch(() => {
          // Silently ignore polling errors to avoid disrupting the UI
        })
    }, options.pollingInterval)

    return () => clearInterval(interval)
  }, [orgId, conversationId, options?.pollingInterval])

  const sendMessage = useCallback(
    async (content: string) => {
      if (!orgId || !conversationId) {
        throw new Error('Organization and conversation are required')
      }

      const response = await conversationsApi.sendMessage(orgId, conversationId, { content })

      // Add the new message to the conversation
      setConversation((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          messages: [...prev.messages, response.message],
        }
      })

      return response.message
    },
    [orgId, conversationId]
  )

  return {
    conversation,
    isLoading,
    error,
    refetch: fetchConversation,
    sendMessage,
  }
}

export function useConversationFilters() {
  const [status, setStatus] = useState<ConversationStatus | undefined>(undefined)

  return {
    status,
    setStatus,
    params: { status } as ConversationListParams,
  }
}
