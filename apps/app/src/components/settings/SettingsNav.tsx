/**
 * Settings navigation tabs
 */

import { NavLink, useParams } from 'react-router-dom'

export function SettingsNav() {
  const { orgId } = useParams<{ orgId: string }>()

  const tabs = [
    { to: `/org/${orgId}/settings`, label: 'General', end: true },
    { to: `/org/${orgId}/settings/members`, label: 'Members' },
  ]

  return (
    <nav className="border-b border-border mb-6">
      <div className="flex gap-6">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            className={({ isActive }) =>
              `pb-3 text-sm font-medium border-b-2 transition-colors ${
                isActive
                  ? 'border-accent-primary text-primary'
                  : 'border-transparent text-secondary hover:text-primary'
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
