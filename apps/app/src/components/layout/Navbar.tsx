/**
 * Top navigation bar
 */

import { Link } from 'react-router-dom'
import { OrgSwitcher } from './OrgSwitcher'
import { UserMenu } from './UserMenu'

interface NavbarProps {
  onMenuToggle?: () => void
  showMenuButton?: boolean
}

export function Navbar({ onMenuToggle, showMenuButton = false }: NavbarProps) {
  return (
    <header className="h-16 border-b border-border bg-surface-base sticky top-0 z-50">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showMenuButton && (
            <button
              onClick={onMenuToggle}
              className="p-2 rounded hover:bg-surface-subtle transition-colors lg:hidden"
              aria-label="Toggle menu"
            >
              <svg
                className="w-5 h-5 text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          )}

          <Link to="/" className="flex items-center gap-2">
            <span className="text-lg font-semibold text-primary">Return Signals</span>
          </Link>

          <div className="hidden sm:block border-l border-border h-6 mx-2" />

          <div className="hidden sm:block">
            <OrgSwitcher />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
