/**
 * Trending issues panel
 */

import { TrendUpIcon, TrendDownIcon } from '@/components/ui'
import type { IssueCategoryCount, IssueCategory } from '@/types'

interface TrendingIssuesProps {
  issues: IssueCategoryCount[]
}

const categoryLabels: Record<IssueCategory, string> = {
  fit_sizing: 'Fit & Sizing',
  quality_defects: 'Quality Defects',
  expectations_mismatch: 'Expectations Mismatch',
  other: 'Other',
  extraction_failed: 'Unknown',
}

export function TrendingIssues({ issues }: TrendingIssuesProps) {
  if (issues.length === 0) {
    return <div className="text-secondary text-sm">No trending data available.</div>
  }

  // Sort by count descending and take top 5
  const topIssues = [...issues].sort((a, b) => b.count - a.count).slice(0, 5)

  // Simulate trend data (in real app, this would come from API comparing periods)
  const getTrend = (count: number, index: number) => {
    // Simple simulation - first item trending up, last trending down
    if (index === 0) return { direction: 'up' as const, value: Math.floor(Math.random() * 20) + 5 }
    if (index === topIssues.length - 1)
      return { direction: 'down' as const, value: Math.floor(Math.random() * 15) + 5 }
    return { direction: 'stable' as const, value: 0 }
  }

  return (
    <div className="space-y-3">
      {topIssues.map((issue, index) => {
        const trend = getTrend(issue.count, index)

        return (
          <div
            key={issue.category}
            className="flex items-center justify-between p-3 bg-surface-subtle rounded-lg"
          >
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-primary truncate">
                {categoryLabels[issue.category]}
              </div>
              <div className="text-xs text-secondary">
                {issue.count} issues ({(issue.percentage * 100).toFixed(0)}%)
              </div>
            </div>
            <div className="flex items-center gap-1 ml-2">
              {trend.direction === 'up' && (
                <span className="flex items-center text-red-500 text-sm">
                  <TrendUpIcon />+{trend.value}%
                </span>
              )}
              {trend.direction === 'down' && (
                <span className="flex items-center text-accent-success text-sm">
                  <TrendDownIcon />-{trend.value}%
                </span>
              )}
              {trend.direction === 'stable' && <span className="text-secondary text-sm">—</span>}
            </div>
          </div>
        )
      })}
    </div>
  )
}
