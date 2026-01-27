/**
 * Hooks for analytics data
 */

import { useEffect, useState, useCallback, useMemo } from 'react'
import { analyticsApi } from '@/api'
import type {
  AnalyticsOverviewResponse,
  InterventionItem,
  InterventionListParams,
  ProblemProduct,
  ProductDetailResponse,
  TrendingIssuesResponse,
  DateRangeParams,
  OutcomeType,
  ConversationStatus,
} from '@/types'

/**
 * Hook for managing date range state
 */
export function useDateRange(defaultDays = 30) {
  const [dateRange, setDateRange] = useState<DateRangeParams>(() => {
    const to = new Date()
    const from = new Date()
    from.setDate(from.getDate() - defaultDays)
    return {
      from_date: from.toISOString().split('T')[0],
      to_date: to.toISOString().split('T')[0],
    }
  })

  const setDaysAgo = useCallback((days: number) => {
    const to = new Date()
    const from = new Date()
    from.setDate(from.getDate() - days)
    setDateRange({
      from_date: from.toISOString().split('T')[0],
      to_date: to.toISOString().split('T')[0],
    })
  }, [])

  return { dateRange, setDateRange, setDaysAgo }
}

/**
 * Hook for analytics overview data
 */
export function useAnalyticsOverview(orgId: string | undefined, dateRange?: DateRangeParams) {
  const [overview, setOverview] = useState<AnalyticsOverviewResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchOverview = useCallback(async () => {
    if (!orgId) {
      setOverview(null)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)
    try {
      const data = await analyticsApi.getOverview(orgId, dateRange)
      setOverview(data)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch overview'))
    } finally {
      setIsLoading(false)
    }
  }, [orgId, dateRange?.from_date, dateRange?.to_date])

  useEffect(() => {
    fetchOverview()
  }, [fetchOverview])

  return { overview, isLoading, error, refetch: fetchOverview }
}

/**
 * Hook for interventions list with filtering and pagination
 */
export function useInterventions(orgId: string | undefined, params?: InterventionListParams) {
  const [interventions, setInterventions] = useState<InterventionItem[]>([])
  const [total, setTotal] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchInterventions = useCallback(async () => {
    if (!orgId) {
      setInterventions([])
      setTotal(0)
      setHasMore(false)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)
    try {
      const data = await analyticsApi.listInterventions(orgId, params)
      setInterventions(data.interventions)
      setTotal(data.pagination.total)
      setHasMore(data.pagination.has_more)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch interventions'))
    } finally {
      setIsLoading(false)
    }
  }, [
    orgId,
    params?.status,
    params?.outcome_type,
    params?.from_date,
    params?.to_date,
    params?.limit,
    params?.offset,
  ])

  useEffect(() => {
    fetchInterventions()
  }, [fetchInterventions])

  return { interventions, total, hasMore, isLoading, error, refetch: fetchInterventions }
}

/**
 * Hook for intervention filters
 */
export function useInterventionFilters(dateRange?: DateRangeParams) {
  const [status, setStatus] = useState<ConversationStatus | undefined>(undefined)
  const [outcomeType, setOutcomeType] = useState<OutcomeType | undefined>(undefined)
  const [page, setPage] = useState(0)
  const limit = 20

  const params = useMemo<InterventionListParams>(
    () => ({
      status,
      outcome_type: outcomeType,
      from_date: dateRange?.from_date,
      to_date: dateRange?.to_date,
      limit,
      offset: page * limit,
    }),
    [status, outcomeType, dateRange?.from_date, dateRange?.to_date, page]
  )

  const resetFilters = useCallback(() => {
    setStatus(undefined)
    setOutcomeType(undefined)
    setPage(0)
  }, [])

  return {
    status,
    setStatus,
    outcomeType,
    setOutcomeType,
    page,
    setPage,
    params,
    limit,
    resetFilters,
  }
}

/**
 * Hook for top problem products
 */
export function useAnalyticsProducts(orgId: string | undefined, dateRange?: DateRangeParams) {
  const [products, setProducts] = useState<ProblemProduct[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchProducts = useCallback(async () => {
    if (!orgId) {
      setProducts([])
      setTotal(0)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)
    try {
      const data = await analyticsApi.getProducts(orgId, dateRange)
      setProducts(data.products)
      setTotal(data.total_products)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch products'))
    } finally {
      setIsLoading(false)
    }
  }, [orgId, dateRange?.from_date, dateRange?.to_date])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return { products, total, isLoading, error, refetch: fetchProducts }
}

/**
 * Hook for product detail
 */
export function useProductDetail(orgId: string | undefined, productId: string | undefined) {
  const [product, setProduct] = useState<ProductDetailResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchProduct = useCallback(async () => {
    if (!orgId || !productId) {
      setProduct(null)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)
    try {
      const data = await analyticsApi.getProductDetail(orgId, productId)
      setProduct(data)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch product'))
    } finally {
      setIsLoading(false)
    }
  }, [orgId, productId])

  useEffect(() => {
    fetchProduct()
  }, [fetchProduct])

  return { product, isLoading, error, refetch: fetchProduct }
}

/**
 * Hook for trending issues
 */
export function useTrendingIssues(orgId: string | undefined, dateRange?: DateRangeParams) {
  const [data, setData] = useState<TrendingIssuesResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchTrending = useCallback(async () => {
    if (!orgId) {
      setData(null)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)
    try {
      const result = await analyticsApi.getTrendingIssues(orgId, dateRange)
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch trending issues'))
    } finally {
      setIsLoading(false)
    }
  }, [orgId, dateRange?.from_date, dateRange?.to_date])

  useEffect(() => {
    fetchTrending()
  }, [fetchTrending])

  return {
    issues: data?.issues ?? [],
    totalIssues: data?.total_issues ?? 0,
    isLoading,
    error,
    refetch: fetchTrending,
  }
}
