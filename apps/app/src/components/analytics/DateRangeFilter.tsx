/**
 * Date range filter with preset options
 */

import { useAnalyticsContext } from '@/contexts/AnalyticsContext'

const presets = [
  { label: '7 days', days: 7 },
  { label: '30 days', days: 30 },
  { label: '90 days', days: 90 },
]

export function DateRangeFilter() {
  const { dateRange, setDaysAgo } = useAnalyticsContext()

  // Determine which preset is active based on current date range
  const getActiveDays = () => {
    if (!dateRange.from_date || !dateRange.to_date) return 30
    const from = new Date(dateRange.from_date)
    const to = new Date(dateRange.to_date)
    const diffDays = Math.round((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const activeDays = getActiveDays()

  return (
    <div className="flex items-center gap-1">
      <span className="text-sm text-secondary mr-2">Period:</span>
      {presets.map((preset) => (
        <button
          key={preset.days}
          onClick={() => setDaysAgo(preset.days)}
          className={`px-3 py-1.5 text-sm rounded transition-colors ${
            activeDays === preset.days
              ? 'bg-accent-primary text-white'
              : 'bg-surface-subtle text-secondary hover:bg-surface-elevated hover:text-primary'
          }`}
        >
          {preset.label}
        </button>
      ))}
    </div>
  )
}
