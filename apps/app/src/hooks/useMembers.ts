/**
 * Hook for managing organization members
 */

import { useEffect, useState, useCallback } from 'react'
import { membersApi, type Member } from '@/api'
import type { OrgRole } from '@/types'

export function useMembers(orgId: string | undefined) {
  const [members, setMembers] = useState<Member[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchMembers = useCallback(async () => {
    if (!orgId) {
      setMembers([])
      setTotal(0)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)
    try {
      const data = await membersApi.list(orgId)
      setMembers(data.members)
      setTotal(data.total)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch members'))
    } finally {
      setIsLoading(false)
    }
  }, [orgId])

  useEffect(() => {
    fetchMembers()
  }, [fetchMembers])

  const changeRole = useCallback(
    async (userId: string, role: OrgRole) => {
      if (!orgId) {
        throw new Error('Organization is required')
      }

      const updatedMember = await membersApi.changeRole(orgId, userId, { role })

      // Update the member in the list
      setMembers((prev) => prev.map((m) => (m.user_id === userId ? updatedMember : m)))

      return updatedMember
    },
    [orgId]
  )

  const removeMember = useCallback(
    async (userId: string) => {
      if (!orgId) {
        throw new Error('Organization is required')
      }

      await membersApi.remove(orgId, userId)

      // Remove the member from the list
      setMembers((prev) => prev.filter((m) => m.user_id !== userId))
      setTotal((prev) => prev - 1)
    },
    [orgId]
  )

  return {
    members,
    total,
    isLoading,
    error,
    refetch: fetchMembers,
    changeRole,
    removeMember,
  }
}
