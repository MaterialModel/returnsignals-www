/**
 * Authentication API functions
 */

import { api } from './client'
import type {
  User,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  EmailVerificationRequest,
  EmailVerificationResponse,
  MessageResponse,
} from '@/types'

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
   * Verify email with 6-digit code
   * Completes email verification flow after registration
   */
  verifyEmail: (data: EmailVerificationRequest) =>
    api.post<EmailVerificationResponse>('/auth/verify-email', data),

  /**
   * Refresh an expired session
   * Uses the refresh token embedded in the session to get a new access token
   */
  refresh: () => api.post<{ message: string }>('/auth/refresh'),

  /**
   * Request password reset email
   * Always returns success to prevent email enumeration
   */
  requestPasswordReset: (email: string) =>
    api.post<MessageResponse>('/auth/password-reset/request', { email }),

  /**
   * Confirm password reset with token from email
   */
  confirmPasswordReset: (token: string, newPassword: string) =>
    api.post<MessageResponse>('/auth/password-reset/confirm', {
      token,
      new_password: newPassword,
    }),
}
