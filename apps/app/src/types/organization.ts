/**
 * Organization types based on OpenAPI schema
 */

import type { OrgRole } from './auth'

export interface Organization {
  organization_id: string
  name: string
  slug: string
  display_name: string | null
  is_active: boolean
  user_role: OrgRole | null
  created_at: string
}
