/**
 * Organizations API functions
 */

import { api } from './client'
import type { Organization } from '@/types'

export interface OrganizationUpdateRequest {
  name?: string
  display_name?: string
  website_url?: string
  support_email?: string
  timezone?: string
}

export const organizationsApi = {
  /**
   * List organizations the current user belongs to
   */
  list: () => api.get<Organization[]>('/organizations'),

  /**
   * Get organization details
   */
  get: (orgId: string) => api.get<Organization>(`/organizations/${orgId}`),

  /**
   * Update organization settings (admin+)
   */
  update: (orgId: string, data: OrganizationUpdateRequest) =>
    api.put<Organization>(`/organizations/${orgId}`, data),
}
