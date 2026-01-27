/**
 * Outcomes breakdown with horizontal bars
 */

import type { OutcomesBreakdown as OutcomesBreakdownType } from '@/types'

interface OutcomesBreakdownProps {
  outcomes: OutcomesBreakdownType
}

interface OutcomeBarProps {
  label: string
  count: number
  percentage: number
  colorClass: string
}

function OutcomeBar({ label, count, percentage, colorClass }: OutcomeBarProps) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-primary">{label}</span>
        <span className="text-secondary">
          {count.toLocaleString()} ({(percentage * 100).toFixed(0)}%)
        </span>
      </div>
      <div className="h-2 bg-surface-subtle rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${colorClass}`}
          style={{ width: `${percentage * 100}%` }}
        />
      </div>
    </div>
  )
}

export function OutcomesBreakdown({ outcomes }: OutcomesBreakdownProps) {
  const total =
    outcomes.kept + outcomes.exchanged + outcomes.disposal + outcomes.returned + outcomes.pending

  if (total === 0) {
    return <div className="text-secondary text-sm">No outcomes recorded yet.</div>
  }

  const outcomeItems = [
    {
      key: 'kept',
      label: 'Kept',
      count: outcomes.kept,
      colorClass: 'bg-accent-success',
    },
    {
      key: 'exchanged',
      label: 'Exchanged',
      count: outcomes.exchanged,
      colorClass: 'bg-accent-primary',
    },
    {
      key: 'disposal',
      label: 'Disposal',
      count: outcomes.disposal,
      colorClass: 'bg-amber-500',
    },
    {
      key: 'returned',
      label: 'Returned',
      count: outcomes.returned,
      colorClass: 'bg-red-500',
    },
    {
      key: 'pending',
      label: 'Pending',
      count: outcomes.pending,
      colorClass: 'bg-surface-elevated',
    },
  ]

  return (
    <div className="space-y-4">
      {outcomeItems.map((item) => (
        <OutcomeBar
          key={item.key}
          label={item.label}
          count={item.count}
          percentage={total > 0 ? item.count / total : 0}
          colorClass={item.colorClass}
        />
      ))}
    </div>
  )
}
