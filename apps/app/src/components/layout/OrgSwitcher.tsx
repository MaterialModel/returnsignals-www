/**
 * Organization switcher dropdown
 */

import { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useOrganizations } from '@/hooks/useOrganizations'
import { LoadingSpinner } from '@/components/ui'

export function OrgSwitcher() {
  const { orgId } = useParams<{ orgId: string }>()
  const navigate = useNavigate()
  const { organizations, isLoading } = useOrganizations()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const currentOrg = organizations.find((org) => org.organization_id === orgId)

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

  const handleOrgSelect = (selectedOrgId: string) => {
    setIsOpen(false)
    navigate(`/org/${selectedOrgId}/conversations`)
  }

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-3 py-2">
        <LoadingSpinner size="sm" />
        <span className="text-sm text-secondary">Loading...</span>
      </div>
    )
  }

  if (organizations.length === 0) {
    return null
  }

  // If only one org, just show the name without dropdown
  if (organizations.length === 1) {
    return (
      <div className="px-3 py-2">
        <span className="text-sm font-medium text-primary">
          {currentOrg?.name || organizations[0].name}
        </span>
      </div>
    )
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded hover:bg-surface-subtle transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="text-sm font-medium text-primary">
          {currentOrg?.name || 'Select organization'}
        </span>
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
        <div className="absolute left-0 mt-1 w-64 rounded border border-border bg-surface-base shadow-soft z-50">
          <div className="py-1">
            {organizations.map((org) => (
              <button
                key={org.organization_id}
                onClick={() => handleOrgSelect(org.organization_id)}
                className={`
                  w-full px-4 py-2 text-left text-sm transition-colors
                  ${
                    org.organization_id === orgId
                      ? 'bg-surface-subtle text-primary font-medium'
                      : 'text-secondary hover:bg-surface-subtle hover:text-primary'
                  }
                `}
              >
                {org.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
