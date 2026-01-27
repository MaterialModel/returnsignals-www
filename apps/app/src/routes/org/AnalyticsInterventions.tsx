/**
 * Analytics Interventions tab - Paginated check-ins list
 */

import { useParams } from 'react-router-dom'
import { useInterventions, useInterventionFilters } from '@/hooks'
import { useAnalyticsContext } from '@/contexts/AnalyticsContext'
import { LoadingSpinner, ErrorMessage, Button } from '@/components/ui'
import { InterventionTable, KPICard } from '@/components/analytics'
import type { ConversationStatus, OutcomeType } from '@/types'

const statusOptions: { value: ConversationStatus | ''; label: string }[] = [
  { value: '', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'escalated', label: 'Escalated' },
  { value: 'expired', label: 'Expired' },
]

const outcomeOptions: { value: OutcomeType | ''; label: string }[] = [
  { value: '', label: 'All Outcomes' },
  { value: 'kept', label: 'Kept' },
  { value: 'exchanged', label: 'Exchanged' },
  { value: 'disposal', label: 'Disposal' },
  { value: 'returned', label: 'Returned' },
  { value: 'pending', label: 'Pending' },
]

export default function AnalyticsInterventions() {
  const { orgId } = useParams<{ orgId: string }>()
  const { dateRange } = useAnalyticsContext()
  const { status, setStatus, outcomeType, setOutcomeType, page, setPage, params, limit } =
    useInterventionFilters(dateRange)

  const { interventions, total, hasMore, isLoading, error } = useInterventions(orgId, params)

  // Calculate summary stats from interventions
  const outcomesSummary = interventions.reduce(
    (acc, i) => {
      if (i.outcome_type) {
        acc[i.outcome_type] = (acc[i.outcome_type] || 0) + 1
      }
      return acc
    },
    { kept: 0, exchanged: 0, disposal: 0, returned: 0, pending: 0 }
  )

  const totalPages = Math.ceil(total / limit)

  return (
    <div className="p-4 space-y-6">
      {/* Pipeline stats - only show when loaded */}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <KPICard
            label="Total Interventions"
            value={total.toLocaleString()}
            description="In selected period"
          />
          <KPICard
            label="Resolution Rate"
            value={
              total > 0
                ? `${(((outcomesSummary.kept + outcomesSummary.exchanged + outcomesSummary.disposal + outcomesSummary.returned) / total) * 100).toFixed(0)}%`
                : '0%'
            }
            description="Completed outcomes"
          />
          <KPICard
            label="Returns Prevented"
            value={outcomesSummary.kept.toLocaleString()}
            description="Items kept by customers"
            trend={outcomesSummary.kept > 0 ? 'positive' : undefined}
          />
        </div>
      )}

      {/* Content */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <ErrorMessage message={error.message} />
      ) : (
        <>
          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <label htmlFor="status-filter" className="sr-only">
                Filter by status
              </label>
              <select
                id="status-filter"
                value={status || ''}
                onChange={(e) => {
                  setStatus((e.target.value || undefined) as ConversationStatus | undefined)
                  setPage(0)
                }}
                className="px-3 py-2 bg-surface-base border border-border rounded text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/50"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="outcome-filter" className="sr-only">
                Filter by outcome
              </label>
              <select
                id="outcome-filter"
                value={outcomeType || ''}
                onChange={(e) => {
                  setOutcomeType((e.target.value || undefined) as OutcomeType | undefined)
                  setPage(0)
                }}
                className="px-3 py-2 bg-surface-base border border-border rounded text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/50"
              >
                {outcomeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            {(status || outcomeType) && (
              <Button
                variant="text"
                size="sm"
                onClick={() => {
                  setStatus(undefined)
                  setOutcomeType(undefined)
                  setPage(0)
                }}
              >
                Clear filters
              </Button>
            )}
          </div>

          {/* Table */}
          <div className="bg-surface-base border border-border rounded-lg overflow-hidden">
            <InterventionTable interventions={interventions} />
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-secondary">
                Showing {page * limit + 1}-{Math.min((page + 1) * limit, total)} of {total}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 0}
                >
                  Previous
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setPage(page + 1)}
                  disabled={!hasMore}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
