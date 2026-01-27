/**
 * Authentication context provider
 * Manages user session state and auth operations
 */

/* eslint-disable react-refresh/only-export-components */

import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { authApi, ApiError } from '@/api'
import type { User, LoginRequest, RegisterRequest, RegisterResponse } from '@/types'

interface AuthContextValue {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (credentials: LoginRequest) => Promise<void>
  logout: () => Promise<void>
  register: (data: RegisterRequest) => Promise<RegisterResponse>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const userData = await authApi.me()
        setUser(userData)
      } catch (error) {
        // 401 means not authenticated - that's expected
        if (error instanceof ApiError && error.status === 401) {
          setUser(null)
        } else {
          // Unexpected error - clear user state silently
          setUser(null)
        }
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  const login = useCallback(async (credentials: LoginRequest) => {
    const response = await authApi.login(credentials)
    setUser(response.user)
  }, [])

  const logout = useCallback(async () => {
    try {
      await authApi.logout()
    } finally {
      // Always clear user state even if logout request fails
      setUser(null)
    }
  }, [])

  const register = useCallback(async (data: RegisterRequest) => {
    const response = await authApi.register(data)
    // If no verification required, user is already logged in (session cookie set)
    if (!response.email_verification_required && response.user) {
      setUser(response.user)
    }
    return response
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAuthenticated: user !== null,
      login,
      logout,
      register,
    }),
    [user, isLoading, login, logout, register]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
