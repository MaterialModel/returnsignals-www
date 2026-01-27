/**
 * Hook for AI settings
 */

import { useEffect, useState, useCallback } from 'react'
import { settingsApi } from '@/api'
import type { AISettingsResponse, AISettingsUpdate } from '@/types'

export function useAISettings(orgId: string | undefined) {
  const [settings, setSettings] = useState<AISettingsResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<Error | null>(null)

  const fetchSettings = useCallback(async () => {
    if (!orgId) {
      setSettings(null)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)
    try {
      const data = await settingsApi.getAISettings(orgId)
      setSettings(data)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch AI settings'))
    } finally {
      setIsLoading(false)
    }
  }, [orgId])

  useEffect(() => {
    fetchSettings()
  }, [fetchSettings])

  const updateSettings = useCallback(
    async (updates: AISettingsUpdate) => {
      if (!orgId) throw new Error('Organization is required')

      setIsSaving(true)
      setSaveError(null)
      try {
        const updated = await settingsApi.updateAISettings(orgId, updates)
        setSettings(updated)
        return updated
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to save settings')
        setSaveError(error)
        throw error
      } finally {
        setIsSaving(false)
      }
    },
    [orgId]
  )

  return {
    settings,
    isLoading,
    error,
    isSaving,
    saveError,
    updateSettings,
    refetch: fetchSettings,
  }
}
