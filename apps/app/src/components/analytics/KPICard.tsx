/**
 * KPI metric card component
 */

interface KPICardProps {
  label: string
  value: string
  description?: string
  trend?: 'positive' | 'negative' | 'neutral'
  trendValue?: string
}

export function KPICard({ label, value, description, trend, trendValue }: KPICardProps) {
  const trendColors = {
    positive: 'text-accent-success',
    negative: 'text-accent-error',
    neutral: 'text-secondary',
  }

  return (
    <div className="bg-surface-base border border-border rounded-lg p-4">
      <div className="text-sm text-secondary mb-1">{label}</div>
      <div className="flex items-baseline gap-2">
        <div className="text-2xl font-semibold text-primary">{value}</div>
        {trend && trendValue && (
          <span className={`text-sm font-medium ${trendColors[trend]}`}>
            {trend === 'positive' && '+'}
            {trendValue}
          </span>
        )}
      </div>
      {description && <div className="text-xs text-tertiary mt-1">{description}</div>}
    </div>
  )
}
