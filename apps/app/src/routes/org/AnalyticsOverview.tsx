/**
 * Analytics Overview tab - Dashboard with KPIs and activity
 */

import { useParams } from 'react-router-dom'
import { useAnalyticsOverview } from '@/hooks'
import { useAnalyticsContext } from '@/contexts/AnalyticsContext'
import { LoadingSpinner, ErrorMessage } from '@/components/ui'
import { KPICard, OutcomesBreakdown, ActivityFeed } from '@/components/analytics'

export default function AnalyticsOverview() {
  const { orgId } = useParams<{ orgId: string }>()
  const { dateRange } = useAnalyticsContext()
  const { overview, isLoading, error } = useAnalyticsOverview(orgId, dateRange)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4">
        <ErrorMessage message={error.message} />
      </div>
    )
  }

  if (!overview) {
    return <div className="p-4 text-secondary">No data available for this period.</div>
  }

  const { metrics, recent_activity } = overview

  // Format resolution time
  const formatResolutionTime = (seconds: number | null) => {
    if (seconds === null) return 'N/A'
    const hours = seconds / 3600
    if (hours < 24) {
      return `${hours.toFixed(1)} hrs`
    }
    const days = hours / 24
    return `${days.toFixed(1)} days`
  }

  // Format percentage
  const formatPercent = (value: number) => `${(value * 100).toFixed(0)}%`

  return (
    <div className="p-4 space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          label="Active Check-ins"
          value={metrics.active_checkins.toLocaleString()}
          description="Currently open conversations"
        />
        <KPICard
          label="Check-ins Sent"
          value={metrics.checkins_sent.toLocaleString()}
          description="Total in period"
        />
        <KPICard
          label="Response Rate"
          value={formatPercent(metrics.response_rate)}
          description="Customer responses"
          trend={metrics.response_rate >= 0.7 ? 'positive' : undefined}
        />
        <KPICard
          label="Avg Resolution Time"
          value={formatResolutionTime(metrics.avg_resolution_time_seconds)}
          description="Time to resolution"
        />
      </div>

      {/* Main content: Outcomes + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Outcomes breakdown */}
        <div className="bg-surface-base border border-border rounded-lg p-4">
          <h2 className="text-lg font-medium text-primary mb-4">Outcomes</h2>
          <OutcomesBreakdown outcomes={metrics.outcomes} />
        </div>

        {/* Recent activity */}
        <div className="bg-surface-base border border-border rounded-lg p-4">
          <h2 className="text-lg font-medium text-primary mb-4">Recent Activity</h2>
          <ActivityFeed activities={recent_activity} />
        </div>
      </div>
    </div>
  )
}
