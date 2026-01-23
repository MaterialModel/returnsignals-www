/**
 * Conversation status badge
 */

import type { ConversationStatus } from '@/types'

interface StatusBadgeProps {
  status: ConversationStatus
}

const statusConfig: Record<ConversationStatus, { label: string; className: string }> = {
  active: {
    label: 'Active',
    className: 'bg-accent-muted text-accent-primary',
  },
  escalated: {
    label: 'Escalated',
    className: 'bg-accent-error-bg text-accent-error-text',
  },
  resolved: {
    label: 'Resolved',
    className: 'bg-accent-success-bg text-accent-success-text',
  },
  expired: {
    label: 'Expired',
    className: 'bg-surface-elevated text-tertiary',
  },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  )
}
