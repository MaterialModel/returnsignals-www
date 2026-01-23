/**
 * Hook for fetching and managing organizations
 */

import { useEffect, useState, useCallback } from 'react'
import { organizationsApi } from '@/api'
import type { Organization } from '@/types'

export function useOrganizations() {
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchOrganizations = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await organizationsApi.list()
      setOrganizations(data)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch organizations'))
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchOrganizations()
  }, [fetchOrganizations])

  return {
    organizations,
    isLoading,
    error,
    refetch: fetchOrganizations,
  }
}

export function useOrganization(orgId: string | undefined) {
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!orgId) {
      setOrganization(null)
      setIsLoading(false)
      return
    }

    const fetchOrganization = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const data = await organizationsApi.get(orgId)
        setOrganization(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch organization'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrganization()
  }, [orgId])

  return {
    organization,
    isLoading,
    error,
  }
}
