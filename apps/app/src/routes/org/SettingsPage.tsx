/**
 * Organization settings page
 */

import { useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { useOrganization, useAuth } from '@/hooks'
import { LoadingSpinner, ErrorMessage } from '@/components/ui'
import { SettingsNav, OrganizationForm } from '@/components/settings'
import type { Organization } from '@/types'

export default function SettingsPage() {
  const { orgId } = useParams<{ orgId: string }>()
  const { user } = useAuth()
  const { organization, isLoading, error } = useOrganization(orgId)
  const [currentOrg, setCurrentOrg] = useState<Organization | null>(null)

  // Check if user has admin+ role
  const membership = user?.memberships.find((m) => m.organization_id === orgId)
  const canManage = membership?.role === 'admin' || membership?.role === 'owner'

  if (!canManage && !isLoading) {
    return <Navigate to={`/org/${orgId}/conversations`} replace />
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <SettingsNav />
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  if (error || !organization) {
    return (
      <div className="p-6">
        <SettingsNav />
        <ErrorMessage error={error || 'Organization not found'} />
      </div>
    )
  }

  const displayOrg = currentOrg || organization

  return (
    <div className="p-6">
      <SettingsNav />
      <OrganizationForm organization={displayOrg} onUpdate={setCurrentOrg} />
    </div>
  )
}
