/**
 * Analytics types based on OpenAPI schema
 */

import type { ConversationStatus } from './conversation'

// Enums
export type OutcomeType = 'kept' | 'exchanged' | 'disposal' | 'returned' | 'pending'
export type IssueCategory =
  | 'fit_sizing'
  | 'quality_defects'
  | 'expectations_mismatch'
  | 'other'
  | 'extraction_failed'
export type VoiceTone = 'friendly' | 'professional' | 'casual'
export type AnswerLength = 'concise' | 'standard' | 'detailed'
export type IntegrationStatus = 'active' | 'error' | 'pending' | 'disconnected'

// Outcomes breakdown
export interface OutcomesBreakdown {
  kept: number
  exchanged: number
  disposal: number
  returned: number
  pending: number
}

// Overview metrics
export interface OverviewMetrics {
  active_checkins: number
  checkins_sent: number
  response_rate: number // 0-1
  avg_resolution_time_seconds: number | null
  outcomes: OutcomesBreakdown
}

// Recent activity item
export interface RecentActivityItem {
  conversation_id: string
  customer_phone: string // masked
  status: ConversationStatus
  outcome_type: OutcomeType | null
  last_message_at: string | null
  created_at: string
}

// Overview response
export interface AnalyticsOverviewResponse {
  metrics: OverviewMetrics
  recent_activity: RecentActivityItem[]
  period_start: string
  period_end: string
}

// Pagination metadata
export interface PaginationMeta {
  total: number
  limit: number
  offset: number
  has_more: boolean
}

// Intervention item
export interface InterventionItem {
  conversation_id: string
  customer_phone: string // masked
  customer_name: string | null
  status: ConversationStatus
  outcome_type: OutcomeType | null
  product_title: string | null
  issue_category: IssueCategory | null
  message_count: number
  created_at: string
  resolved_at: string | null
}

// Interventions list response
export interface InterventionsListResponse {
  interventions: InterventionItem[]
  pagination: PaginationMeta
  period_start: string
  period_end: string
}

// Intervention list params
export interface InterventionListParams {
  status?: ConversationStatus
  outcome_type?: OutcomeType
  from_date?: string
  to_date?: string
  limit?: number
  offset?: number
}

// Problem product
export interface ProblemProduct {
  product_id: string
  title: string
  vendor: string | null
  image_url: string | null
  conversation_count: number
  issue_count: number
  return_rate: number // 0-1
}

// Top products response
export interface TopProductsResponse {
  products: ProblemProduct[]
  total_products: number
  period_start: string
  period_end: string
}

// Product snapshot
export interface ProductSnapshot {
  product_id: string
  shopify_product_id: string
  title: string
  vendor: string | null
  product_type: string | null
  image_url: string | null
  created_at: string
}

// Product issue breakdown
export interface ProductIssueBreakdown {
  fit_sizing: number
  quality_defects: number
  expectations_mismatch: number
  other: number
}

// Product conversation summary
export interface ProductConversationSummary {
  conversation_id: string
  customer_phone: string // masked
  status: string
  issue_category: IssueCategory | null
  outcome_type: string | null
  created_at: string
}

// Product detail response
export interface ProductDetailResponse {
  product: ProductSnapshot
  issue_breakdown: ProductIssueBreakdown
  total_conversations: number
  total_issues: number
  conversations: ProductConversationSummary[]
}

// Issue category count
export interface IssueCategoryCount {
  category: IssueCategory
  count: number
  percentage: number // 0-1
}

// Trending issues response
export interface TrendingIssuesResponse {
  issues: IssueCategoryCount[]
  total_issues: number
  period_start: string
  period_end: string
}

// AI settings response
export interface AISettingsResponse {
  org_ai_setting_id: string | null
  organization_id: string
  voice_tone: VoiceTone
  answer_length: AnswerLength
  custom_procedures: Record<string, unknown> | null
  response_templates: Record<string, unknown> | null
  created_at: string | null
  updated_at: string | null
}

// AI settings update request
export interface AISettingsUpdate {
  voice_tone?: VoiceTone
  answer_length?: AnswerLength
  custom_procedures?: Record<string, unknown> | null
  response_templates?: Record<string, unknown> | null
}

// Integration response
export interface IntegrationResponse {
  shopify_connected: boolean
  shopify_shop_domain: string | null
  status: IntegrationStatus
  error_message: string | null
}

// Integration update request
export interface IntegrationUpdate {
  shopify_shop_domain?: string | null
  shopify_access_token?: string | null
}

// Date range filter params
export interface DateRangeParams {
  from_date?: string
  to_date?: string
}

// Complaint search - product mention
export interface ComplaintSearchProductMention {
  product_id: string
  title: string
  url: string
}

// Complaint search - conversation mention
export interface ComplaintSearchConversationMention {
  conversation_id: string
  url: string
}

// Complaint search response
export interface ComplaintSearchResponse {
  answer: string // Markdown with embedded links
  products_mentioned: ComplaintSearchProductMention[]
  conversations_mentioned: ComplaintSearchConversationMention[]
  query_tokens: number
  rate_limit_remaining: number
}
