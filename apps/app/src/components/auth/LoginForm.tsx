/**
 * Login form component
 */

import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input, ErrorMessage } from '@/components/ui'
import { ApiError } from '@/api'

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>
  onVerificationRequired?: (email: string, token: string) => void
}

export function LoginForm({ onSubmit, onVerificationRequired }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      await onSubmit(email, password)
    } catch (err) {
      if (err instanceof ApiError) {
        // Check if email verification is required
        if (err.isEmailVerificationRequired()) {
          const token = err.getPendingAuthToken()
          if (token && onVerificationRequired) {
            onVerificationRequired(email, token)
            return
          }
        }
        setError(err.getDisplayMessage())
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <ErrorMessage error={error} />}

      <Input
        label="Email"
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        required
        autoComplete="email"
        autoFocus
      />

      <div>
        <Input
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
          autoComplete="current-password"
          minLength={8}
        />
        <div className="mt-1 text-right">
          <Link
            to="/forgot-password"
            className="text-sm text-accent-primary hover:text-accent-hover"
          >
            Forgot password?
          </Link>
        </div>
      </div>

      <Button type="submit" variant="primary" isLoading={isLoading} className="w-full">
        Sign in
      </Button>
    </form>
  )
}
