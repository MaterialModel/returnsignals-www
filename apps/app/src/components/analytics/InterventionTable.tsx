/**
 * Interventions table component
 */

import { Link, useParams } from 'react-router-dom'
import type { InterventionItem, OutcomeType, IssueCategory, ConversationStatus } from '@/types'

interface InterventionTableProps {
  interventions: InterventionItem[]
}

function getStatusBadge(status: ConversationStatus): { label: string; className: string } {
  const config: Record<ConversationStatus, { label: string; className: string }> = {
    active: { label: 'Active', className: 'bg-accent-primary/10 text-accent-primary' },
    resolved: { label: 'Resolved', className: 'bg-accent-success/10 text-accent-success' },
    escalated: { label: 'Escalated', className: 'bg-accent-warning/10 text-accent-warning' },
    expired: { label: 'Expired', className: 'bg-surface-elevated text-secondary' },
  }
  return config[status] || { label: status, className: 'bg-surface-elevated text-secondary' }
}

function getOutcomeBadge(outcome: OutcomeType | null): { label: string; className: string } | null {
  if (!outcome) return null
  const config: Record<OutcomeType, { label: string; className: string }> = {
    kept: { label: 'Kept', className: 'bg-accent-success/10 text-accent-success' },
    exchanged: { label: 'Exchanged', className: 'bg-accent-primary/10 text-accent-primary' },
    disposal: { label: 'Disposal', className: 'bg-accent-warning/10 text-accent-warning' },
    returned: { label: 'Returned', className: 'bg-accent-error/10 text-accent-error' },
    pending: { label: 'Pending', className: 'bg-surface-elevated text-secondary' },
  }
  return config[outcome]
}

function getIssueCategoryLabel(category: IssueCategory | null): string {
  if (!category) return '-'
  const labels: Record<IssueCategory, string> = {
    fit_sizing: 'Fit & Sizing',
    quality_defects: 'Quality Defects',
    expectations_mismatch: 'Expectations',
    other: 'Other',
    extraction_failed: '-',
  }
  return labels[category] || category
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString()
}

export function InterventionTable({ interventions }: InterventionTableProps) {
  const { orgId } = useParams<{ orgId: string }>()

  if (interventions.length === 0) {
    return (
      <div className="text-center py-8 text-secondary">
        No interventions found for the selected filters.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 text-sm font-medium text-secondary">Customer</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-secondary">Product</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-secondary">Issue</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-secondary">Status</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-secondary">Outcome</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-secondary">Time</th>
          </tr>
        </thead>
        <tbody>
          {interventions.map((intervention) => {
            const statusBadge = getStatusBadge(intervention.status)
            const outcomeBadge = getOutcomeBadge(intervention.outcome_type)

            return (
              <tr
                key={intervention.conversation_id}
                className="border-b border-border hover:bg-surface-subtle transition-colors"
              >
                <td className="py-3 px-4">
                  <Link
                    to={`/org/${orgId}/conversations/${intervention.conversation_id}`}
                    className="hover:text-accent-primary transition-colors"
                  >
                    <div className="text-sm font-medium text-primary">
                      {intervention.customer_name || 'Unknown'}
                    </div>
                    <div className="text-xs text-secondary">{intervention.customer_phone}</div>
                  </Link>
                </td>
                <td className="py-3 px-4">
                  <div className="text-sm text-primary truncate max-w-[200px]">
                    {intervention.product_title || '-'}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-sm text-secondary">
                    {getIssueCategoryLabel(intervention.issue_category)}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${statusBadge.className}`}
                  >
                    {statusBadge.label}
                  </span>
                </td>
                <td className="py-3 px-4">
                  {outcomeBadge ? (
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${outcomeBadge.className}`}
                    >
                      {outcomeBadge.label}
                    </span>
                  ) : (
                    <span className="text-secondary text-sm">-</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <div className="text-sm text-secondary whitespace-nowrap">
                    {formatDate(intervention.created_at)}
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
