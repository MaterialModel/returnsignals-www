/**
 * Hook for fetching and managing organizations
 */

import { useEffect, useState, useCallback } from 'react'
import { organizationsApi } from '@/api'
import type { Organization } from '@/types'

// Module-level cache for organizations
let cachedOrganizations: Organization[] | null = null

export function useOrganizations() {
  // Initialize with cached data if available
  const [organizations, setOrganizations] = useState<Organization[]>(cachedOrganizations || [])
  const [isLoading, setIsLoading] = useState(cachedOrganizations === null)
  const [error, setError] = useState<Error | null>(null)

  const fetchOrganizations = useCallback(async (background = false) => {
    if (!background) {
      setIsLoading(true)
    }
    setError(null)
    try {
      const data = await organizationsApi.list()
      cachedOrganizations = data
      setOrganizations(data)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch organizations'))
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    // If we have cached data, fetch in background; otherwise fetch normally
    fetchOrganizations(cachedOrganizations !== null)
  }, [fetchOrganizations])

  return {
    organizations,
    isLoading,
    error,
    refetch: () => fetchOrganizations(false),
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
