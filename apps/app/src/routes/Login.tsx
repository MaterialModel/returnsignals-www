/**
 * Login page
 */

import { useState } from 'react'
import { useNavigate, useLocation, useSearchParams, Link, Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { LoginForm } from '@/components/auth'
import { Card } from '@/components/ui'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const { login, isAuthenticated, isLoading } = useAuth()

  const isResend = searchParams.get('resend') === 'true'
  const next = searchParams.get('next')
  const [infoMessage] = useState<string | null>(
    isResend ? 'Enter your password to receive a new verification code' : null
  )

  // Get the intended destination from query param, location state, or default
  const from = next || (location.state as { from?: Location })?.from?.pathname || '/'

  // If already authenticated, redirect
  if (!isLoading && isAuthenticated) {
    return <Navigate to={from} replace />
  }

  const handleLogin = async (email: string, password: string) => {
    await login({ email, password })
    navigate(from, { replace: true })
  }

  const handleVerificationRequired = (email: string, token: string) => {
    const verifyUrl = `/verify-email?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`
    const finalUrl = next ? `${verifyUrl}&next=${encodeURIComponent(next)}` : verifyUrl
    navigate(finalUrl)
  }

  return (
    <div className="min-h-vh-fix flex items-center justify-center bg-surface-base px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium text-primary mb-2">Welcome back</h1>
          <p className="text-secondary">Sign in to your Return Signals account</p>
        </div>

        <Card>
          {infoMessage && (
            <div className="mb-4 p-3 bg-accent-primary/10 border border-accent-primary/30 rounded text-sm text-primary">
              {infoMessage}
            </div>
          )}
          <LoginForm onSubmit={handleLogin} onVerificationRequired={handleVerificationRequired} />

          <div className="mt-6 text-center text-sm">
            <span className="text-secondary">Don't have an account? </span>
            <Link
              to={`/register${next ? `?next=${encodeURIComponent(next)}` : ''}`}
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
