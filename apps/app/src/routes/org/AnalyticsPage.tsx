/**
 * Analytics page container with tab navigation
 */

import { Outlet } from 'react-router-dom'
import { AnalyticsProvider } from '@/contexts/AnalyticsContext'
import { AnalyticsNav } from '@/components/analytics/AnalyticsNav'
import { DateRangeFilter } from '@/components/analytics/DateRangeFilter'

export default function AnalyticsPage() {
  return (
    <AnalyticsProvider>
      <div className="flex flex-col h-full">
        {/* Header with title and date filter */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border-b border-border">
          <h1 className="text-xl font-semibold text-primary">Analytics</h1>
          <DateRangeFilter />
        </div>

        {/* Tab navigation */}
        <AnalyticsNav />

        {/* Tab content */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </AnalyticsProvider>
  )
}
