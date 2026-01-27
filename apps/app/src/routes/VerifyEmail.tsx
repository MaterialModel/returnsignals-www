/**
 * Email verification page
 */

import { useState, useEffect } from 'react'
import { Navigate, useSearchParams, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button, Input, Card, ErrorMessage, CheckCircleIcon } from '@/components/ui'
import { authApi, ApiError } from '@/api'

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const token = searchParams.get('token')
  const email = searchParams.get('email')
  const next = searchParams.get('next')

  useEffect(() => {
    // If no token in URL, redirect to login
    if (!authLoading && !token) {
      window.location.href = '/login'
    }
  }, [token, authLoading])

  // If already authenticated, redirect to home
  if (!authLoading && isAuthenticated) {
    return <Navigate to="/" replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) return

    setError(null)
    setIsLoading(true)

    try {
      await authApi.verifyEmail({
        code,
        pending_authentication_token: token,
      })
      setSuccess(true)
      // Redirect to intended destination after verification
      setTimeout(() => {
        window.location.href = next || '/'
      }, 1500)
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.getDisplayMessage())
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleRequestNewCode = () => {
    // Navigate to login with resend flag and preserve next param
    const loginUrl = `/login?resend=true${next ? `&next=${encodeURIComponent(next)}` : ''}`
    navigate(loginUrl)
  }

  if (success) {
    return (
      <div className="min-h-vh-fix flex items-center justify-center bg-surface-base px-4">
        <div className="w-full max-w-md">
          <Card className="text-center">
            <div className="mb-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-accent-success/10 flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-accent-success" />
              </div>
            </div>
            <h2 className="text-xl font-medium text-primary mb-2">Email verified!</h2>
            <p className="text-secondary">Redirecting to your dashboard...</p>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-vh-fix flex items-center justify-center bg-surface-base px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium text-primary mb-2">Verify your email</h1>
          {email && (
            <p className="text-secondary mb-2">
              We sent a code to <span className="font-medium text-primary">{email}</span>
            </p>
          )}
          <p className="text-sm text-tertiary">Code expires in 10 minutes</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <ErrorMessage message={error} />}

            <Input
              label="Verification code"
              type="text"
              name="code"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="000000"
              required
              maxLength={6}
              pattern="[0-9]{6}"
              autoFocus
              className="text-center text-2xl tracking-widest"
            />

            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              disabled={code.length !== 6}
              className="w-full"
            >
              Verify email
            </Button>
          </form>

          <div className="mt-6 space-y-3">
            <div className="text-center">
              <button
                type="button"
                onClick={handleRequestNewCode}
                className="text-sm text-accent-primary hover:text-accent-hover font-medium"
              >
                Request new code
              </button>
            </div>
            <div className="text-center text-xs text-tertiary">
              Enter your password on the next page to receive a new code
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
