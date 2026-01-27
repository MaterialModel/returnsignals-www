/**
 * Registration page
 */

import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { RegisterForm } from '@/components/auth'
import { Card } from '@/components/ui'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { register, isAuthenticated, isLoading } = useAuth()

  const next = searchParams.get('next')

  // If already authenticated, redirect to home
  if (!isLoading && isAuthenticated) {
    return <Navigate to="/" replace />
  }

  const handleSuccess = (
    _email: string,
    emailVerificationRequired: boolean,
    token: string | null
  ) => {
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
