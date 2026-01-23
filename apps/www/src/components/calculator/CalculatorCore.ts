export interface CalculationInputs {
  unitsSold: number
  avgRevenue: number
  avgCost: number
  unitsPerOrder: number
  orderShippingCost: number
  returnCost: number
  fitReturnRate: number
  otherReturnRate: number
  multisizeFit: number
  resaleProbability: number
  smsCollectionRate: number
  problemEngagementRate: number
  happyEngagementRate: number
  exchangeLift: number
  keepLift: number
  retentionLift: number
  repeatMarketingCost: number
}

export interface CalculationResults {
  totalMonthly: number
  totalAnnual: number
  exchangeValue: number
  keepValue: number
  retentionValue: number
  eligibleReturns: number
  engagedCustomers: number
  resolvedCustomers: number
  returnsPrevented: number
  baselineMonthly: number
  baselineAnnual: number
  marginExpansionPct: number
}

export function calculateROI(inputs: CalculationInputs): CalculationResults {
  const {
    unitsSold: N_sold,
    avgRevenue: AUR,
    avgCost: AUC,
    unitsPerOrder: UPO,
    orderShippingCost: C_ord,
    returnCost: C_ret,
    fitReturnRate,
    otherReturnRate,
    multisizeFit,
    resaleProbability,
    smsCollectionRate,
    problemEngagementRate,
    happyEngagementRate,
    exchangeLift: lift_exch,
    keepLift: lift_keep,
    retentionLift: lift_retention_180,
    repeatMarketingCost: MCO_repeat,
  } = inputs

  // Convert percentages to decimals
  const pct_refund_fit = fitReturnRate / 100
  const pct_refund_other = otherReturnRate / 100
  const pct_multisize_fit = multisizeFit / 100
  const pct_resale = resaleProbability / 100
  const sms_rate = smsCollectionRate / 100
  const eng_problem = problemEngagementRate / 100
  const eng_happy = happyEngagementRate / 100
  const lift_ex = lift_exch / 100
  const lift_kp = lift_keep / 100
  const lift_ret = lift_retention_180 / 100

  // Calculate per-unit shipping cost
  const C_unit = C_ord / UPO

  // Calculate eligible returns
  const N_fit_eligible = N_sold * pct_refund_fit * (1 - pct_multisize_fit)
  const N_other_eligible = N_sold * pct_refund_other
  const N_eligible = N_fit_eligible + N_other_eligible

  // Calculate engaged customers with problems (for exchange/keep)
  const N_engaged_problem = N_eligible * sms_rate * eng_problem
  const N_res = N_engaged_problem * (lift_ex + lift_kp)

  // Calculate engaged happy customers (for retention)
  const N_happy = N_sold - N_eligible
  const N_engaged_happy = N_happy * sms_rate * eng_happy

  // Total engaged for retention
  const N_engaged_retention = N_engaged_problem + N_engaged_happy

  // Calculate incremental value per intervention
  const delta_V_refund_to_exch = AUR - C_unit - AUC
  const delta_V_refund_to_keep = AUR + C_ret - AUC * pct_resale

  // Calculate value of repeat order
  const V_repeat_order = UPO * (AUR - AUC - C_unit) - MCO_repeat

  // Calculate value components
  const V_exch = N_engaged_problem * lift_ex * delta_V_refund_to_exch
  const V_keep = N_engaged_problem * lift_kp * delta_V_refund_to_keep
  const V_retention = N_engaged_retention * lift_ret * V_repeat_order

  // Calculate total value
  const totalMonthly = V_exch + V_keep + V_retention
  const totalAnnual = totalMonthly * 12

  // Calculate returns prevented (same as resolved customers)
  const returnsPrevented = N_res

  // Calculate baseline revenue (units sold minus returns)
  const totalReturns = N_sold * (pct_refund_fit + pct_refund_other)
  const baselineRevenue = (N_sold - totalReturns) * AUR
  const baselineAnnual = baselineRevenue * 12

  // Calculate margin expansion as percentage of baseline net sales
  const marginExpansionPct = baselineRevenue > 0 ? (totalMonthly / baselineRevenue) * 100 : 0

  return {
    totalMonthly,
    totalAnnual,
    exchangeValue: V_exch,
    keepValue: V_keep,
    retentionValue: V_retention,
    eligibleReturns: N_eligible,
    engagedCustomers: N_engaged_retention,
    resolvedCustomers: N_res,
    returnsPrevented,
    baselineMonthly: baselineRevenue,
    baselineAnnual,
    marginExpansionPct,
  }
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}
