/**
 * Analytics API functions
 */

import { api } from './client'
import type {
  AnalyticsOverviewResponse,
  InterventionsListResponse,
  InterventionListParams,
  TopProductsResponse,
  ProductDetailResponse,
  TrendingIssuesResponse,
  DateRangeParams,
  ComplaintSearchResponse,
} from '@/types'

/**
 * Build query string from params object
 */
function buildQueryString(params: Record<string, string | number | undefined>): string {
  const searchParams = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      searchParams.set(key, String(value))
    }
  }
  const query = searchParams.toString()
  return query ? `?${query}` : ''
}

export const analyticsApi = {
  /**
   * Get overview dashboard metrics
   */
  getOverview: (orgId: string, params?: DateRangeParams) => {
    const query = buildQueryString({
      from_date: params?.from_date,
      to_date: params?.to_date,
    })
    return api.get<AnalyticsOverviewResponse>(`/organizations/${orgId}/analytics/overview${query}`)
  },

  /**
   * List interventions with filtering and pagination
   */
  listInterventions: (orgId: string, params?: InterventionListParams) => {
    const query = buildQueryString({
      status: params?.status,
      outcome_type: params?.outcome_type,
      from_date: params?.from_date,
      to_date: params?.to_date,
      limit: params?.limit,
      offset: params?.offset,
    })
    return api.get<InterventionsListResponse>(
      `/organizations/${orgId}/analytics/interventions${query}`
    )
  },

  /**
   * Get top problem products
   */
  getProducts: (orgId: string, params?: DateRangeParams) => {
    const query = buildQueryString({
      from_date: params?.from_date,
      to_date: params?.to_date,
    })
    return api.get<TopProductsResponse>(`/organizations/${orgId}/analytics/products${query}`)
  },

  /**
   * Get product detail with issue breakdown
   */
  getProductDetail: (orgId: string, productId: string) =>
    api.get<ProductDetailResponse>(`/organizations/${orgId}/analytics/products/${productId}`),

  /**
   * Get trending issues
   */
  getTrendingIssues: (orgId: string, params?: DateRangeParams) => {
    const query = buildQueryString({
      from_date: params?.from_date,
      to_date: params?.to_date,
    })
    return api.get<TrendingIssuesResponse>(
      `/organizations/${orgId}/analytics/trending-issues${query}`
    )
  },

  /**
   * AI-powered complaint search
   */
  complaintSearch: (orgId: string, query: string) =>
    api.post<ComplaintSearchResponse>(`/organizations/${orgId}/analytics/complaint-search`, {
      query,
    }),
}
