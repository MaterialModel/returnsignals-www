/**
 * Protected route wrapper
 * Redirects to login if not authenticated
 */

import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { LoadingSpinner } from '@/components/ui'

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="min-h-vh-fix flex items-center justify-center bg-surface-base">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!isAuthenticated) {
    // Save intended destination for post-login redirect
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
