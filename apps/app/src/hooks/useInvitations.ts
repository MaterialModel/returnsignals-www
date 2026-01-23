/**
 * Hook for managing organization invitations
 */

import { useEffect, useState, useCallback } from 'react'
import { invitationsApi, type Invitation, type InvitationRequest } from '@/api'

export function useInvitations(orgId: string | undefined) {
  const [invitations, setInvitations] = useState<Invitation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchInvitations = useCallback(async () => {
    if (!orgId) {
      setInvitations([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)
    try {
      const data = await invitationsApi.list(orgId)
      setInvitations(data.invitations)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch invitations'))
    } finally {
      setIsLoading(false)
    }
  }, [orgId])

  useEffect(() => {
    fetchInvitations()
  }, [fetchInvitations])

  const invite = useCallback(
    async (data: InvitationRequest) => {
      if (!orgId) {
        throw new Error('Organization is required')
      }

      const invitation = await invitationsApi.create(orgId, data)

      // Add the invitation to the list
      setInvitations((prev) => [...prev, invitation])

      return invitation
    },
    [orgId]
  )

  return {
    invitations,
    isLoading,
    error,
    refetch: fetchInvitations,
    invite,
  }
}
