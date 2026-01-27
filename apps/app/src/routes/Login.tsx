/**
 * Login page
 */

import { useNavigate, useLocation, Link, Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { LoginForm } from '@/components/auth'
import { Card } from '@/components/ui'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isAuthenticated, isLoading } = useAuth()

  // Get the intended destination from location state
  const from = (location.state as { from?: Location })?.from?.pathname || '/'

  // If already authenticated, redirect
  if (!isLoading && isAuthenticated) {
    return <Navigate to={from} replace />
  }

  const handleLogin = async (email: string, password: string) => {
    await login({ email, password })
    navigate(from, { replace: true })
  }

  const handleVerificationRequired = (token: string) => {
    navigate(`/verify-email?token=${token}`)
  }

  return (
    <div className="min-h-vh-fix flex items-center justify-center bg-surface-base px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium text-primary mb-2">Welcome back</h1>
          <p className="text-secondary">Sign in to your Return Signals account</p>
        </div>

        <Card>
          <LoginForm onSubmit={handleLogin} onVerificationRequired={handleVerificationRequired} />

          <div className="mt-6 text-center text-sm">
            <span className="text-secondary">Don't have an account? </span>
            <Link
              to="/register"
              className="text-accent-primary hover:text-accent-hover font-medium"
            >
              Sign up
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
