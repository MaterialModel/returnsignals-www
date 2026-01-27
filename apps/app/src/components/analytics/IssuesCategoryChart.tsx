/**
 * Issues by category breakdown chart
 */

import type { IssueCategoryCount, IssueCategory } from '@/types'

interface IssuesCategoryChartProps {
  issues: IssueCategoryCount[]
  total: number
}

const categoryLabels: Record<IssueCategory, string> = {
  fit_sizing: 'Fit & Sizing',
  quality_defects: 'Quality Defects',
  expectations_mismatch: 'Expectations Mismatch',
  other: 'Other',
  extraction_failed: 'Unknown',
}

const categoryColors: Record<IssueCategory, string> = {
  fit_sizing: 'bg-accent-primary',
  quality_defects: 'bg-amber-500',
  expectations_mismatch: 'bg-accent-success',
  other: 'bg-purple-500',
  extraction_failed: 'bg-surface-elevated',
}

export function IssuesCategoryChart({ issues, total }: IssuesCategoryChartProps) {
  if (issues.length === 0 || total === 0) {
    return <div className="text-secondary text-sm">No issue data available.</div>
  }

  // Sort by count descending
  const sortedIssues = [...issues].sort((a, b) => b.count - a.count)

  return (
    <div className="space-y-4">
      {sortedIssues.map((issue) => (
        <div key={issue.category} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-primary">{categoryLabels[issue.category]}</span>
            <span className="text-secondary">
              {issue.count.toLocaleString()} ({(issue.percentage * 100).toFixed(0)}%)
            </span>
          </div>
          <div className="h-2 bg-surface-subtle rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${categoryColors[issue.category]}`}
              style={{ width: `${issue.percentage * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
