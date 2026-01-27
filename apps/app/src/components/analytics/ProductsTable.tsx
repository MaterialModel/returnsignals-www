/**
 * Top problem products table
 */

import { Link, useParams } from 'react-router-dom'
import { SignedImage } from '@/components/ui'
import type { ProblemProduct } from '@/types'

interface ProductsTableProps {
  products: ProblemProduct[]
}

export function ProductsTable({ products }: ProductsTableProps) {
  const { orgId } = useParams<{ orgId: string }>()

  if (products.length === 0) {
    return (
      <div className="text-center py-8 text-secondary">
        No product data available for this period.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 text-sm font-medium text-secondary">Product</th>
            <th className="text-right py-3 px-4 text-sm font-medium text-secondary">
              Conversations
            </th>
            <th className="text-right py-3 px-4 text-sm font-medium text-secondary">Issues</th>
            <th className="text-right py-3 px-4 text-sm font-medium text-secondary">Return Rate</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.product_id}
              className="border-b border-border hover:bg-surface-subtle transition-colors"
            >
              <td className="py-3 px-4">
                <Link
                  to={`/org/${orgId}/analytics/products/${product.product_id}`}
                  className="flex items-center gap-3 hover:text-accent-primary transition-colors"
                >
                  <SignedImage
                    src={product.image_url}
                    alt={product.title}
                    className="w-10 h-10 object-cover rounded"
                    fallback="placeholder"
                  />
                  <div>
                    <div className="text-sm font-medium text-primary">{product.title}</div>
                    {product.vendor && (
                      <div className="text-xs text-secondary">{product.vendor}</div>
                    )}
                  </div>
                </Link>
              </td>
              <td className="py-3 px-4 text-right">
                <span className="text-sm text-primary">
                  {product.conversation_count.toLocaleString()}
                </span>
              </td>
              <td className="py-3 px-4 text-right">
                <span className="text-sm text-primary">{product.issue_count.toLocaleString()}</span>
              </td>
              <td className="py-3 px-4 text-right">
                <span
                  className={`text-sm font-medium ${
                    product.return_rate > 0.25
                      ? 'text-accent-error'
                      : product.return_rate > 0.15
                        ? 'text-accent-warning'
                        : 'text-accent-success'
                  }`}
                >
                  {(product.return_rate * 100).toFixed(0)}%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
