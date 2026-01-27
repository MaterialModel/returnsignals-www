/**
 * Product detail analytics page
 */

import { useParams, useNavigate, Link } from 'react-router-dom'
import { useProductDetail } from '@/hooks'
import { LoadingSpinner, ErrorMessage, Button, ChevronLeftIcon, SignedImage } from '@/components/ui'
import type { IssueCategory, ProductIssueBreakdown } from '@/types'

const categoryLabels: Record<IssueCategory, string> = {
  fit_sizing: 'Fit & Sizing',
  quality_defects: 'Quality Defects',
  expectations_mismatch: 'Expectations Mismatch',
  other: 'Other',
  extraction_failed: 'Unknown',
}

const categoryColors: Record<string, string> = {
  fit_sizing: 'bg-accent-primary',
  quality_defects: 'bg-amber-500',
  expectations_mismatch: 'bg-accent-success',
  other: 'bg-purple-500',
}

function IssueBreakdownBar({ breakdown }: { breakdown: ProductIssueBreakdown }) {
  const total =
    breakdown.fit_sizing +
    breakdown.quality_defects +
    breakdown.expectations_mismatch +
    breakdown.other

  if (total === 0) {
    return <div className="text-secondary text-sm">No issues recorded.</div>
  }

  const items = [
    { key: 'fit_sizing', label: categoryLabels.fit_sizing, count: breakdown.fit_sizing },
    {
      key: 'quality_defects',
      label: categoryLabels.quality_defects,
      count: breakdown.quality_defects,
    },
    {
      key: 'expectations_mismatch',
      label: categoryLabels.expectations_mismatch,
      count: breakdown.expectations_mismatch,
    },
    { key: 'other', label: categoryLabels.other, count: breakdown.other },
  ].filter((item) => item.count > 0)

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.key} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-primary">{item.label}</span>
            <span className="text-secondary">
              {item.count} ({((item.count / total) * 100).toFixed(0)}%)
            </span>
          </div>
          <div className="h-2 bg-surface-subtle rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${categoryColors[item.key]}`}
              style={{ width: `${(item.count / total) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function AnalyticsProductDetail() {
  const { orgId, productId } = useParams<{ orgId: string; productId: string }>()
  const navigate = useNavigate()
  const { product, isLoading, error } = useProductDetail(orgId, productId)

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

  if (!product) {
    return <div className="p-4 text-secondary">Product not found.</div>
  }

  return (
    <div className="p-4 space-y-6">
      {/* Back button and header */}
      <div>
        <Button
          variant="text"
          size="sm"
          onClick={() => navigate(`/org/${orgId}/analytics/products`)}
          className="mb-4"
        >
          <ChevronLeftIcon className="w-4 h-4 mr-1" />
          Back to Products
        </Button>

        <div className="flex items-start gap-4">
          <SignedImage
            src={product.product.image_url}
            alt={product.product.title}
            className="w-20 h-20 object-cover rounded-lg"
            fallback="placeholder"
          />
          <div>
            <h1 className="text-xl font-semibold text-primary">{product.product.title}</h1>
            {product.product.vendor && (
              <p className="text-sm text-secondary">{product.product.vendor}</p>
            )}
            {product.product.product_type && (
              <p className="text-xs text-tertiary mt-1">{product.product.product_type}</p>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-surface-base border border-border rounded-lg p-4">
          <div className="text-sm text-secondary">Total Conversations</div>
          <div className="text-2xl font-semibold text-primary">
            {product.total_conversations.toLocaleString()}
          </div>
        </div>
        <div className="bg-surface-base border border-border rounded-lg p-4">
          <div className="text-sm text-secondary">Total Issues</div>
          <div className="text-2xl font-semibold text-primary">
            {product.total_issues.toLocaleString()}
          </div>
        </div>
        <div className="bg-surface-base border border-border rounded-lg p-4">
          <div className="text-sm text-secondary">Issue Rate</div>
          <div className="text-2xl font-semibold text-primary">
            {product.total_conversations > 0
              ? ((product.total_issues / product.total_conversations) * 100).toFixed(0)
              : 0}
            %
          </div>
        </div>
      </div>

      {/* Issue breakdown */}
      <div className="bg-surface-base border border-border rounded-lg p-4">
        <h2 className="text-lg font-medium text-primary mb-4">Issue Breakdown</h2>
        <IssueBreakdownBar breakdown={product.issue_breakdown} />
      </div>

      {/* Recent conversations */}
      <div className="bg-surface-base border border-border rounded-lg overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-medium text-primary">Recent Conversations</h2>
        </div>
        {product.conversations.length === 0 ? (
          <div className="p-4 text-secondary text-sm">No conversations yet.</div>
        ) : (
          <div className="divide-y divide-border">
            {product.conversations.map((conv) => (
              <Link
                key={conv.conversation_id}
                to={`/org/${orgId}/conversations/${conv.conversation_id}`}
                className="block p-4 hover:bg-surface-subtle transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm font-medium text-primary">{conv.customer_phone}</div>
                    {conv.issue_category && (
                      <div className="text-xs text-secondary mt-1">
                        {categoryLabels[conv.issue_category]}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {conv.outcome_type && (
                      <span className="text-xs px-2 py-1 rounded bg-surface-elevated text-secondary">
                        {conv.outcome_type}
                      </span>
                    )}
                    <span className="text-xs text-tertiary">
                      {new Date(conv.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
