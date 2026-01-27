/**
 * Registration form component
 */

import { useState, type FormEvent } from 'react'
import { Button, Input, ErrorMessage } from '@/components/ui'
import { ApiError } from '@/api'
import type { RegisterRequest, RegisterResponse } from '@/types'

interface RegisterFormProps {
  onSubmit: (data: RegisterRequest) => Promise<RegisterResponse>
  onSuccess: (emailVerificationRequired: boolean, token: string | null) => void
}

export function RegisterForm({ onSubmit, onSuccess }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setIsLoading(true)

    try {
      const response = await onSubmit({
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name,
      })
      onSuccess(response.email_verification_required, response.pending_authentication_token)
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <ErrorMessage error={error} />}

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First name"
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange('first_name')}
          placeholder="John"
          required
          autoComplete="given-name"
          autoFocus
        />

        <Input
          label="Last name"
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange('last_name')}
          placeholder="Doe"
          required
          autoComplete="family-name"
        />
      </div>

      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange('email')}
        placeholder="you@example.com"
        required
        autoComplete="email"
      />

      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange('password')}
        placeholder="At least 8 characters"
        required
        autoComplete="new-password"
        minLength={8}
      />

      <Input
        label="Confirm password"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange('confirmPassword')}
        placeholder="Confirm your password"
        required
        autoComplete="new-password"
        minLength={8}
      />

      <Button type="submit" variant="primary" isLoading={isLoading} className="w-full">
        Create account
      </Button>
    </form>
  )
}
