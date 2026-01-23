/**
 * Registration page
 */

import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { RegisterForm } from '@/components/auth'
import { Card } from '@/components/ui'

export default function RegisterPage() {
  const { register, isAuthenticated, isLoading } = useAuth()
  const [success, setSuccess] = useState(false)

  // If already authenticated, redirect to home
  if (!isLoading && isAuthenticated) {
    return <Navigate to="/" replace />
  }

  const handleSuccess = () => {
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="min-h-vh-fix flex items-center justify-center bg-surface-base px-4">
        <div className="w-full max-w-md">
          <Card className="text-center">
            <div className="mb-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-accent-success-bg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-accent-success"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-medium text-primary mb-2">Check your email</h2>
            <p className="text-secondary mb-6">
              If this email is not already registered, you will receive a verification email
              shortly.
            </p>
            <Link to="/login" className="text-accent-primary hover:text-accent-hover font-medium">
              Back to sign in
            </Link>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-vh-fix flex items-center justify-center bg-surface-base px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium text-primary mb-2">Create an account</h1>
          <p className="text-secondary">Get started with Return Signals</p>
        </div>

        <Card>
          <RegisterForm onSubmit={register} onSuccess={handleSuccess} />

          <div className="mt-6 text-center text-sm">
            <span className="text-secondary">Already have an account? </span>
            <Link to="/login" className="text-accent-primary hover:text-accent-hover font-medium">
              Sign in
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
