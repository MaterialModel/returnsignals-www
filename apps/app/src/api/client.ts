/**
 * Base API client with session cookie support and automatic token refresh
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export class ApiError extends Error {
  constructor(
    public status: number,
    public detail: string | Record<string, unknown>
  ) {
    super(typeof detail === 'string' ? detail : JSON.stringify(detail))
    this.name = 'ApiError'
  }

  // Check if this is an email verification required error
  isEmailVerificationRequired(): boolean {
    return (
      this.status === 403 &&
      typeof this.detail === 'object' &&
      this.detail !== null &&
      'code' in this.detail &&
      this.detail.code === 'email_verification_required'
    )
  }

  // Get the pending authentication token from email verification error
  getPendingAuthToken(): string | null {
    if (this.isEmailVerificationRequired() && typeof this.detail === 'object') {
      return (
        (this.detail as { pending_authentication_token?: string }).pending_authentication_token ??
        null
      )
    }
    return null
  }

  // Get display message
  getDisplayMessage(): string {
    if (typeof this.detail === 'string') {
      return this.detail
    }
    if (typeof this.detail === 'object' && this.detail !== null && 'message' in this.detail) {
      return String(this.detail.message)
    }
    return 'An error occurred'
  }
}

// Track refresh state to avoid multiple concurrent refresh attempts
let isRefreshing = false
let refreshPromise: Promise<boolean> | null = null

// Session expiration event system
type SessionEventHandler = () => void
const sessionExpiredHandlers: Set<SessionEventHandler> = new Set()

/**
 * Subscribe to session expiration events.
 * Called when token refresh fails and user needs to re-authenticate.
 * Returns an unsubscribe function.
 */
export function onSessionExpired(handler: SessionEventHandler): () => void {
  sessionExpiredHandlers.add(handler)
  return () => sessionExpiredHandlers.delete(handler)
}

function notifySessionExpired() {
  sessionExpiredHandlers.forEach((handler) => handler())
}

// Endpoints that should NOT attempt refresh on 401
// (to prevent infinite loops or unnecessary refresh attempts)
const SKIP_REFRESH_ENDPOINTS = ['/auth/login', '/auth/register', '/auth/refresh', '/auth/logout']

/**
 * Attempt to refresh the session
 * Returns true if refresh succeeded, false otherwise
 */
async function tryRefreshSession(): Promise<boolean> {
  // If already refreshing, wait for that to complete
  if (isRefreshing && refreshPromise) {
    return refreshPromise
  }

  isRefreshing = true
  refreshPromise = (async () => {
    try {
      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return response.ok
    } catch {
      return false
    } finally {
      isRefreshing = false
      refreshPromise = null
    }
  })()

  return refreshPromise
}

export async function apiClient<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_URL}${endpoint}`

  const response = await fetch(url, {
    ...options,
    credentials: 'include', // Critical for session cookies
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  // Handle 204 No Content
  if (response.status === 204) {
    return undefined as T
  }

  // Try to parse JSON response
  let data: unknown
  try {
    data = await response.json()
  } catch {
    // No JSON body
    data = {}
  }

  if (!response.ok) {
    const errorData = data as { detail?: string }

    // Handle session expiration with automatic refresh
    // Skip refresh for specific auth endpoints to avoid loops
    const shouldAttemptRefresh =
      response.status === 401 && !SKIP_REFRESH_ENDPOINTS.some((e) => endpoint.startsWith(e))

    if (shouldAttemptRefresh) {
      // Try to refresh the session
      const refreshed = await tryRefreshSession()

      if (refreshed) {
        // Retry the original request
        return apiClient<T>(endpoint, options)
      }

      // Refresh failed - notify AuthContext to clear user state
      notifySessionExpired()
      throw new ApiError(401, 'Session expired')
    }

    throw new ApiError(
      response.status,
      errorData.detail || `Request failed with status ${response.status}`
    )
  }

  return data as T
}

// Convenience methods
export const api = {
  get: <T>(endpoint: string) => apiClient<T>(endpoint, { method: 'GET' }),

  post: <T>(endpoint: string, body?: unknown) =>
    apiClient<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T>(endpoint: string, body?: unknown) =>
    apiClient<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    }),

  patch: <T>(endpoint: string, body?: unknown) =>
    apiClient<T>(endpoint, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(endpoint: string) => apiClient<T>(endpoint, { method: 'DELETE' }),
}
