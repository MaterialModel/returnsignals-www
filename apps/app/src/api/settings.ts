/**
 * Organization settings API functions
 */

import { api } from './client'
import type { AISettingsResponse, AISettingsUpdate } from '@/types'

export const settingsApi = {
  /**
   * Get AI settings (viewer+)
   */
  getAISettings: (orgId: string) =>
    api.get<AISettingsResponse>(`/organizations/${orgId}/settings/ai`),

  /**
   * Update AI settings (manager+)
   */
  updateAISettings: (orgId: string, data: AISettingsUpdate) =>
    api.put<AISettingsResponse>(`/organizations/${orgId}/settings/ai`, data),
}
