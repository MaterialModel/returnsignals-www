/**
 * Recent activity feed component
 */

import { Link, useParams } from 'react-router-dom'
import type { RecentActivityItem, OutcomeType, ConversationStatus } from '@/types'

interface ActivityFeedProps {
  activities: RecentActivityItem[]
}

function getStatusLabel(status: ConversationStatus): string {
  const labels: Record<ConversationStatus, string> = {
    active: 'Active',
    resolved: 'Resolved',
    escalated: 'Escalated',
    expired: 'Expired',
  }
  return labels[status] || status
}

function getStatusColor(status: ConversationStatus): string {
  const colors: Record<ConversationStatus, string> = {
    active: 'bg-accent-primary/10 text-accent-primary',
    resolved: 'bg-accent-success/10 text-accent-success',
    escalated: 'bg-accent-warning/10 text-accent-warning',
    expired: 'bg-surface-elevated text-secondary',
  }
  return colors[status] || 'bg-surface-elevated text-secondary'
}

function getOutcomeLabel(outcome: OutcomeType | null): string {
  if (!outcome) return ''
  const labels: Record<OutcomeType, string> = {
    kept: 'Kept',
    exchanged: 'Exchanged',
    disposal: 'Disposal',
    returned: 'Returned',
    pending: 'Pending',
  }
  return labels[outcome] || outcome
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString()
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const { orgId } = useParams<{ orgId: string }>()

  if (activities.length === 0) {
    return <div className="text-secondary text-sm">No recent activity.</div>
  }

  return (
    <div className="space-y-3">
      {activities.map((activity) => (
        <Link
          key={activity.conversation_id}
          to={`/org/${orgId}/conversations/${activity.conversation_id}`}
          className="block p-3 rounded-lg bg-surface-subtle hover:bg-surface-elevated transition-colors"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-primary truncate">
                  {activity.customer_phone}
                </span>
                <span
                  className={`px-2 py-0.5 text-xs font-medium rounded ${getStatusColor(activity.status)}`}
                >
                  {getStatusLabel(activity.status)}
                </span>
              </div>
              {activity.outcome_type && (
                <div className="text-xs text-secondary mt-1">
                  Outcome: {getOutcomeLabel(activity.outcome_type)}
                </div>
              )}
            </div>
            <div className="text-xs text-tertiary whitespace-nowrap">
              {formatTimeAgo(activity.last_message_at || activity.created_at)}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
