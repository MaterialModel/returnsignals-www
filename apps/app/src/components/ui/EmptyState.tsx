/**
 * Empty state placeholder component
 */

import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function EmptyState({ icon, title, description, action, className = '' }: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}
    >
      {icon && <div className="mb-4 text-tertiary">{icon}</div>}
      <h3 className="text-lg font-medium text-primary mb-1">{title}</h3>
      {description && <p className="text-sm text-secondary max-w-sm mb-4">{description}</p>}
      {action}
    </div>
  )
}
