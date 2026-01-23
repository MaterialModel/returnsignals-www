/**
 * Organization invitations API functions
 */

import { api } from './client'
import type { OrgRole } from '@/types'

export interface Invitation {
  invitation_id: string
  email: string
  role: OrgRole
  expires_at: string
}

export interface InvitationListResponse {
  invitations: Invitation[]
}

export interface InvitationRequest {
  email: string
  role?: OrgRole
}

export const invitationsApi = {
  /**
   * List pending invitations for an organization
   */
  list: (orgId: string) => api.get<InvitationListResponse>(`/organizations/${orgId}/invitations`),

  /**
   * Invite a user to the organization
   */
  create: (orgId: string, data: InvitationRequest) =>
    api.post<Invitation>(`/organizations/${orgId}/invitations`, data),
}
