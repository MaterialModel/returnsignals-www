/**
 * Authentication types based on OpenAPI schema
 */

export type OrgRole = 'owner' | 'admin' | 'manager' | 'viewer'

export interface OrgMembership {
  organization_id: string
  organization_name: string
  role: OrgRole
}

export interface User {
  user_id: string
  email: string
  first_name: string | null
  last_name: string | null
  is_superadmin: boolean
  memberships: OrgMembership[]
  created_at: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
}

export interface RegisterRequest {
  email: string
  password: string
  first_name: string
  last_name: string
}

export interface RegisterResponse {
  message: string
}
