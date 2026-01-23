/**
 * Organization members API functions
 */

import { api } from './client'
import type { OrgRole } from '@/types'

export interface Member {
  user_id: string
  email: string
  first_name: string | null
  last_name: string | null
  role: OrgRole
  joined_at: string
}

export interface MemberListResponse {
  members: Member[]
  total: number
}

export interface RoleUpdateRequest {
  role: OrgRole
}

export const membersApi = {
  /**
   * List organization members
   */
  list: (orgId: string) => api.get<MemberListResponse>(`/organizations/${orgId}/members`),

  /**
   * Change a member's role
   */
  changeRole: (orgId: string, userId: string, data: RoleUpdateRequest) =>
    api.patch<Member>(`/organizations/${orgId}/members/${userId}/role`, data),

  /**
   * Remove a member from the organization
   */
  remove: (orgId: string, userId: string) =>
    api.delete<{ message: string }>(`/organizations/${orgId}/members/${userId}`),
}
