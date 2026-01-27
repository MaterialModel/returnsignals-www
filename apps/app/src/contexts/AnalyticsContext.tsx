/**
 * Analytics context for shared date range state
 */

import { createContext, useContext, type ReactNode } from 'react'
import { useDateRange } from '@/hooks'
import type { DateRangeParams } from '@/types'

interface AnalyticsContextValue {
  dateRange: DateRangeParams
  setDateRange: (range: DateRangeParams) => void
  setDaysAgo: (days: number) => void
}

const AnalyticsContext = createContext<AnalyticsContextValue | null>(null)

interface AnalyticsProviderProps {
  children: ReactNode
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const { dateRange, setDateRange, setDaysAgo } = useDateRange(30)

  return (
    <AnalyticsContext.Provider value={{ dateRange, setDateRange, setDaysAgo }}>
      {children}
    </AnalyticsContext.Provider>
  )
}

export function useAnalyticsContext() {
  const context = useContext(AnalyticsContext)
  if (!context) {
    throw new Error('useAnalyticsContext must be used within an AnalyticsProvider')
  }
  return context
}
