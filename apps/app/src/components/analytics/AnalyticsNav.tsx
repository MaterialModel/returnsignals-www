/**
 * Tab navigation for analytics pages
 */

import { NavLink, useParams } from 'react-router-dom'
import { useAuth } from '@/hooks'

export function AnalyticsNav() {
  const { orgId } = useParams<{ orgId: string }>()
  const { user } = useAuth()

  // Check if user has manager+ role for this org (for configuration tab)
  const membership = user?.memberships.find((m) => m.organization_id === orgId)
  const canManageSettings =
    membership?.role === 'manager' || membership?.role === 'admin' || membership?.role === 'owner'

  const tabs = [
    { label: 'Overview', to: `/org/${orgId}/analytics/overview` },
    { label: 'Interventions', to: `/org/${orgId}/analytics/interventions` },
    { label: 'Products', to: `/org/${orgId}/analytics/products` },
    ...(canManageSettings
      ? [{ label: 'Configuration', to: `/org/${orgId}/analytics/configuration` }]
      : []),
  ]

  return (
    <nav className="border-b border-border">
      <div className="flex gap-1 px-4">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              `px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                isActive
                  ? 'border-accent-primary text-accent-primary'
                  : 'border-transparent text-secondary hover:text-primary hover:border-border'
              }`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
