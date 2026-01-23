/**
 * Authentication API functions
 */

import { api } from './client'
import type { User, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '@/types'

export const authApi = {
  /**
   * Login with email and password
   * Sets HTTPOnly session cookie on success
   */
  login: (credentials: LoginRequest) => api.post<LoginResponse>('/auth/login', credentials),

  /**
   * Logout and clear session
   */
  logout: () => api.post<{ message: string }>('/auth/logout'),

  /**
   * Get current authenticated user
   * Returns 401 if not authenticated
   */
  me: () => api.get<User>('/auth/me'),

  /**
   * Register a new user account
   */
  register: (data: RegisterRequest) => api.post<RegisterResponse>('/auth/register', data),

  /**
   * Refresh an expired session
   * Uses the refresh token embedded in the session to get a new access token
   */
  refresh: () => api.post<{ message: string }>('/auth/refresh'),
}
