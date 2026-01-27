/**
 * Forgot password page - request password reset email
 */

import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input, ErrorMessage, Card, CheckCircleIcon, ArrowLeftIcon } from '@/components/ui'
import { authApi, ApiError } from '@/api'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email) {
      setError('Please enter your email address')
      return
    }

    try {
      setIsLoading(true)
      await authApi.requestPasswordReset(email)
      setSuccess(true)
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.getDisplayMessage())
      } else {
        setError('Failed to send reset email. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Success state - show confirmation message
  if (success) {
    return (
      <div className="min-h-vh-fix flex items-center justify-center bg-surface-base px-4">
        <div className="w-full max-w-md">
          <Card>
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-accent-success/10 mb-6">
                <CheckCircleIcon className="w-10 h-10 text-accent-success" />
              </div>
              <h2 className="text-2xl font-medium text-primary mb-4">Check Your Email</h2>
              <p className="text-secondary mb-6">
                We've sent password reset instructions to{' '}
                <strong className="text-primary">{email}</strong>
              </p>
              <p className="text-sm text-tertiary mb-8">
                The link will expire in 15 minutes. If you don't see the email, check your spam
                folder.
              </p>
              <Link to="/login">
                <Button variant="primary" className="w-full">
                  Return to Login
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  // Form state
  return (
    <div className="min-h-vh-fix flex items-center justify-center bg-surface-base px-4">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <Link
            to="/login"
            className="inline-flex items-center text-sm text-secondary hover:text-primary mb-4"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Login
          </Link>
          <h1 className="text-3xl font-medium text-primary mb-2">Forgot Password?</h1>
          <p className="text-secondary">
            Enter your email and we'll send you instructions to reset your password
          </p>
        </div>

        <Card>
          {error && (
            <div className="mb-4">
              <ErrorMessage error={error} />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
              autoFocus
            />

            <Button type="submit" variant="primary" isLoading={isLoading} className="w-full">
              Send Reset Instructions
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-secondary">Remember your password? </span>
            <Link to="/login" className="text-accent-primary hover:text-accent-hover font-medium">
              Sign in
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
