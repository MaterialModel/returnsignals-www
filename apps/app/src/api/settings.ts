/**
 * Organization settings API functions
 */

import { api } from './client'
import type {
  AISettingsResponse,
  AISettingsUpdate,
  IntegrationResponse,
  IntegrationUpdate,
} from '@/types'

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

  /**
   * Get integration settings (admin+)
   */
  getIntegrations: (orgId: string) =>
    api.get<IntegrationResponse>(`/organizations/${orgId}/settings/integrations`),

  /**
   * Update integration settings (admin+)
   */
  updateIntegrations: (orgId: string, data: IntegrationUpdate) =>
    api.put<IntegrationResponse>(`/organizations/${orgId}/settings/integrations`, data),
}
