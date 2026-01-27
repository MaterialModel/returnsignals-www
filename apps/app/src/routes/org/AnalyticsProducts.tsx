/**
 * Analytics Products tab - Product intelligence
 */

import { useParams } from 'react-router-dom'
import { useAnalyticsProducts, useTrendingIssues } from '@/hooks'
import { useAnalyticsContext } from '@/contexts/AnalyticsContext'
import { LoadingSpinner, ErrorMessage } from '@/components/ui'
import {
  ProductQueryInterface,
  ProductsTable,
  IssuesCategoryChart,
  TrendingIssues,
} from '@/components/analytics'

export default function AnalyticsProducts() {
  const { orgId } = useParams<{ orgId: string }>()
  const { dateRange } = useAnalyticsContext()

  const {
    products,
    total,
    isLoading: productsLoading,
    error: productsError,
  } = useAnalyticsProducts(orgId, dateRange)
  const {
    issues,
    totalIssues,
    isLoading: issuesLoading,
    error: issuesError,
  } = useTrendingIssues(orgId, dateRange)

  const isLoading = productsLoading || issuesLoading
  const error = productsError || issuesError

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

  return (
    <div className="p-4 space-y-6">
      {/* Natural language query interface */}
      <div className="bg-surface-base border border-border rounded-lg p-4">
        <ProductQueryInterface />
      </div>

      {/* Products table */}
      <div className="bg-surface-base border border-border rounded-lg overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-medium text-primary">Top Problem Products</h2>
          <p className="text-sm text-secondary mt-1">
            {total} products with reported issues in selected period
          </p>
        </div>
        <ProductsTable products={products} />
      </div>

      {/* Issue breakdown and trending */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Issues by category */}
        <div className="bg-surface-base border border-border rounded-lg p-4">
          <h2 className="text-lg font-medium text-primary mb-4">Issues by Category</h2>
          <IssuesCategoryChart issues={issues} total={totalIssues} />
        </div>

        {/* Trending issues */}
        <div className="bg-surface-base border border-border rounded-lg p-4">
          <h2 className="text-lg font-medium text-primary mb-4">Trending This Week</h2>
          <TrendingIssues issues={issues} />
        </div>
      </div>
    </div>
  )
}
