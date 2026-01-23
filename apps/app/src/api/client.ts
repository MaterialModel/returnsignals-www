/**
 * Base API client with session cookie support and automatic token refresh
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export class ApiError extends Error {
  constructor(
    public status: number,
    public detail: string
  ) {
    super(detail)
    this.name = 'ApiError'
  }
}

// Track refresh state to avoid multiple concurrent refresh attempts
let isRefreshing = false
let refreshPromise: Promise<boolean> | null = null

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
    // Skip for auth endpoints to avoid loops
    if (response.status === 401 && !endpoint.startsWith('/auth/')) {
      // Try to refresh the session
      const refreshed = await tryRefreshSession()

      if (refreshed) {
        // Retry the original request
        return apiClient<T>(endpoint, options)
      }

      // Refresh failed - redirect to login
      window.location.href = '/login'
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
