/**
 * Sidebar navigation
 */

import { NavLink, useParams } from 'react-router-dom'
import { useAuth } from '@/hooks'
import { ChatIcon, ChartIcon, SettingsIcon, CloseIcon } from '@/components/ui'

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const { orgId } = useParams<{ orgId: string }>()
  const { user } = useAuth()

  // Check if user has admin+ role for this org
  const membership = user?.memberships.find((m) => m.organization_id === orgId)
  const canManageSettings = membership?.role === 'admin' || membership?.role === 'owner'

  const navItems = [
    {
      label: 'Conversations',
      to: `/org/${orgId}/conversations`,
      icon: <ChatIcon />,
    },
    {
      label: 'Analytics',
      to: `/org/${orgId}/analytics`,
      icon: <ChartIcon />,
    },
    ...(canManageSettings
      ? [
          {
            label: 'Settings',
            to: `/org/${orgId}/settings`,
            icon: <SettingsIcon />,
          },
        ]
      : []),
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-primary/20 z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40 lg:z-auto
          w-64 bg-surface-base border-r border-border
          transform transition-transform duration-200 ease-in-out
          lg:transform-none
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full pt-16 lg:pt-0">
          {/* Mobile header */}
          <div className="flex items-center justify-between p-4 border-b border-border lg:hidden">
            <span className="text-lg font-semibold text-primary">Menu</span>
            <button
              onClick={onClose}
              className="p-2 rounded hover:bg-surface-subtle transition-colors"
              aria-label="Close menu"
            >
              <CloseIcon className="w-5 h-5 text-secondary" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-surface-subtle text-primary'
                          : 'text-secondary hover:bg-surface-subtle hover:text-primary'
                      }`
                    }
                  >
                    {item.icon}
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  )
}
