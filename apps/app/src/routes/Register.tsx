/**
 * Registration page
 */

import { useState } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { RegisterForm } from '@/components/auth'
import { Card, CheckCircleIcon } from '@/components/ui'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { register, isAuthenticated, isLoading } = useAuth()
  const [success, setSuccess] = useState(false)
  const [registeredEmail, setRegisteredEmail] = useState<string>('')

  const next = searchParams.get('next')

  // If already authenticated, redirect to home
  if (!isLoading && isAuthenticated) {
    return <Navigate to="/" replace />
  }

  const handleSuccess = (
    email: string,
    emailVerificationRequired: boolean,
    token: string | null
  ) => {
    setRegisteredEmail(email)
    if (emailVerificationRequired && token) {
      // Redirect to verification page with email and next params
      const verifyUrl = `/verify-email?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`
      const finalUrl = next ? `${verifyUrl}&next=${encodeURIComponent(next)}` : verifyUrl
      navigate(finalUrl)
    } else {
      // No verification needed (already logged in), redirect to intended destination
      navigate(next || '/', { replace: true })
    }
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
