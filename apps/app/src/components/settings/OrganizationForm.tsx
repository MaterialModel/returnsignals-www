/**
 * Organization settings form
 */

import { useState, type FormEvent } from 'react'
import { Button, Input, ErrorMessage } from '@/components/ui'
import { organizationsApi, ApiError, type OrganizationUpdateRequest } from '@/api'
import type { Organization } from '@/types'

interface OrganizationFormProps {
  organization: Organization
  onUpdate: (org: Organization) => void
}

export function OrganizationForm({ organization, onUpdate }: OrganizationFormProps) {
  const [formData, setFormData] = useState({
    name: organization.name,
    display_name: organization.display_name || '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
    setSuccess(false)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setIsLoading(true)

    try {
      const updateData: OrganizationUpdateRequest = {
        name: formData.name,
        display_name: formData.display_name || undefined,
      }

      const updatedOrg = await organizationsApi.update(organization.organization_id, updateData)
      onUpdate(updatedOrg)
      setSuccess(true)
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.detail)
      } else {
        setError('Failed to update organization. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
      <div>
        <h3 className="text-lg font-medium text-primary mb-4">Organization Details</h3>

        {error && <ErrorMessage error={error} className="mb-4" />}

        {success && (
          <div className="rounded border border-accent-success-border bg-accent-success-bg p-4 mb-4">
            <p className="text-sm text-accent-success-text">Settings saved successfully.</p>
          </div>
        )}

        <div className="space-y-4">
          <Input
            label="Organization name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange('name')}
            required
          />

          <Input
            label="Display name"
            type="text"
            name="display_name"
            value={formData.display_name}
            onChange={handleChange('display_name')}
            placeholder="Optional display name"
          />

          <div className="pt-2">
            <p className="text-sm text-secondary">
              <span className="font-medium text-primary">Slug:</span> {organization.slug}
            </p>
            <p className="text-xs text-tertiary mt-1">The slug cannot be changed after creation.</p>
          </div>
        </div>
      </div>

      <Button type="submit" variant="primary" isLoading={isLoading}>
        Save changes
      </Button>
    </form>
  )
}
