/**
 * Reset password page - set new password from email link
 */

import { useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button, Input, ErrorMessage, Card, CheckCircleIcon, CloseIcon } from '@/components/ui'
import { authApi, ApiError } from '@/api'

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!token) {
      setError('Invalid reset link. Please request a new password reset.')
      return
    }

    if (!newPassword) {
      setError('Please enter a new password')
      return
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      setIsLoading(true)
      await authApi.confirmPasswordReset(token, newPassword)
      setSuccess(true)
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.getDisplayMessage())
      } else {
        setError('Failed to reset password. The link may have expired.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Success state
  if (success) {
    return (
      <div className="min-h-vh-fix flex items-center justify-center bg-surface-base px-4">
        <div className="w-full max-w-md">
          <Card>
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-accent-success/10 mb-6">
                <CheckCircleIcon className="w-10 h-10 text-accent-success" />
              </div>
              <h2 className="text-2xl font-medium text-primary mb-4">Password Reset Successful</h2>
              <p className="text-secondary mb-8">
                Your password has been updated successfully. You can now sign in with your new
                password.
              </p>
              <Link to="/login">
                <Button variant="primary" className="w-full">
                  Continue to Login
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  // Invalid token state
  if (!token) {
    return (
      <div className="min-h-vh-fix flex items-center justify-center bg-surface-base px-4">
        <div className="w-full max-w-md">
          <Card>
            <ErrorMessage error="Invalid password reset link. The link may have expired or been used already." />
            <div className="mt-6 text-center">
              <Link
                to="/forgot-password"
                className="text-accent-primary hover:text-accent-hover font-medium"
              >
                Request a new password reset
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
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium text-primary mb-2">Reset Password</h1>
          <p className="text-secondary">Enter your new password below</p>
        </div>

        <Card>
          {error && (
            <div className="mb-4">
              <ErrorMessage error={error} />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                label="New Password"
                type="password"
                name="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
                minLength={8}
                autoComplete="new-password"
                autoFocus
              />
              <p className="mt-1 text-xs text-tertiary">Must be at least 8 characters</p>
            </div>

            <Input
              label="Confirm New Password"
              type="password"
              name="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
              autoComplete="new-password"
            />

            {/* Password match indicator */}
            {newPassword && confirmPassword && (
              <div className="flex items-center text-sm">
                {newPassword === confirmPassword ? (
                  <div className="flex items-center text-accent-success">
                    <CheckCircleIcon className="w-4 h-4 mr-2" />
                    Passwords match
                  </div>
                ) : (
                  <div className="flex items-center text-accent-error-text">
                    <CloseIcon className="w-4 h-4 mr-2" />
                    Passwords do not match
                  </div>
                )}
              </div>
            )}

            <Button type="submit" variant="primary" isLoading={isLoading} className="w-full">
              Reset Password
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-secondary">Link expired? </span>
            <Link
              to="/forgot-password"
              className="text-accent-primary hover:text-accent-hover font-medium"
            >
              Request a new one
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
