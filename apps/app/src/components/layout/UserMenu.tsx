/**
 * User menu dropdown component
 */

import { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'

export function UserMenu() {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    setIsOpen(false)
    await logout()
  }

  const displayName = user?.first_name
    ? `${user.first_name} ${user.last_name || ''}`.trim()
    : user?.email || 'User'

  const initials = user?.first_name
    ? `${user.first_name[0]}${user.last_name?.[0] || ''}`.toUpperCase()
    : user?.email?.[0]?.toUpperCase() || 'U'

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 rounded hover:bg-surface-subtle transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="w-8 h-8 rounded-full bg-surface-dark text-inverse flex items-center justify-center text-sm font-medium">
          {initials}
        </div>
        <svg
          className={`w-4 h-4 text-secondary transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded border border-border bg-surface-base shadow-soft z-50">
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-medium text-primary truncate">{displayName}</p>
            <p className="text-xs text-secondary truncate">{user?.email}</p>
          </div>
          <div className="py-1">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-sm text-secondary hover:bg-surface-subtle hover:text-primary transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
