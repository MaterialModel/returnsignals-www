/**
 * Home redirect page
 * Redirects authenticated users to their first organization's conversations
 */

import { Navigate } from 'react-router-dom'
import { useOrganizations } from '@/hooks'
import { LoadingSpinner, EmptyState } from '@/components/ui'

export default function Home() {
  const { organizations, isLoading, error } = useOrganizations()

  if (isLoading) {
    return (
      <div className="min-h-vh-fix flex items-center justify-center bg-surface-base">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-vh-fix flex items-center justify-center bg-surface-base">
        <EmptyState
          title="Something went wrong"
          description="We couldn't load your organizations. Please try again."
        />
      </div>
    )
  }

  if (organizations.length > 0) {
    // Redirect to first organization's conversations
    return <Navigate to={`/org/${organizations[0].organization_id}/conversations`} replace />
  }

  // No organizations - show empty state
  return (
    <div className="min-h-vh-fix flex items-center justify-center bg-surface-base">
      <EmptyState
        icon={
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        }
        title="No organizations"
        description="You're not a member of any organizations yet. Contact your administrator to get access."
      />
    </div>
  )
}
