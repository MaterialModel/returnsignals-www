/**
 * Form for inviting new members
 */

import { useState, type FormEvent } from 'react'
import { Button, Input, ErrorMessage } from '@/components/ui'
import { ApiError, type InvitationRequest } from '@/api'
import type { OrgRole } from '@/types'

interface InviteFormProps {
  onInvite: (data: InvitationRequest) => Promise<void>
}

const roleOptions: { value: OrgRole; label: string }[] = [
  { value: 'viewer', label: 'Viewer - Read-only access' },
  { value: 'manager', label: 'Manager - Can send messages' },
  { value: 'admin', label: 'Admin - Can manage members' },
]

export function InviteForm({ onInvite }: InviteFormProps) {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<OrgRole>('viewer')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setIsLoading(true)

    try {
      await onInvite({ email, role })
      setEmail('')
      setRole('viewer')
      setSuccess(true)
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.detail)
      } else {
        setError('Failed to send invitation. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <ErrorMessage error={error} />}

      {success && (
        <div className="rounded border border-accent-success-border bg-accent-success-bg p-4">
          <p className="text-sm text-accent-success-text">Invitation sent successfully.</p>
        </div>
      )}

      <div className="flex gap-3">
        <div className="flex-1">
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setSuccess(false)
            }}
            placeholder="email@example.com"
            required
          />
        </div>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value as OrgRole)}
          className="border border-border rounded px-3 py-2 bg-surface-base text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary"
        >
          {roleOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <Button type="submit" variant="primary" isLoading={isLoading}>
          Invite
        </Button>
      </div>
    </form>
  )
}
