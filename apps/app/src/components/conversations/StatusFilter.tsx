/**
 * Conversation status filter tabs
 */

import type { ConversationStatus } from '@/types'

interface StatusFilterProps {
  value: ConversationStatus | undefined
  onChange: (status: ConversationStatus | undefined) => void
}

const statuses: { value: ConversationStatus | undefined; label: string }[] = [
  { value: undefined, label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'escalated', label: 'Escalated' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'expired', label: 'Expired' },
]

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <div className="flex gap-1 p-1 bg-surface-subtle rounded-lg">
      {statuses.map((status) => (
        <button
          key={status.value ?? 'all'}
          onClick={() => onChange(status.value)}
          className={`
            px-3 py-1.5 text-sm font-medium rounded-md transition-colors
            ${
              value === status.value
                ? 'bg-surface-base text-primary shadow-sm'
                : 'text-secondary hover:text-primary'
            }
          `}
        >
          {status.label}
        </button>
      ))}
    </div>
  )
}
