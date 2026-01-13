# ROI Calculator Methodology

## Overview

The Return Signals ROI Calculator estimates the financial impact of reducing returns, increasing exchanges, and improving customer retention through our platform.

## Example Calculation

Based on typical e-commerce metrics:

### Input Values

**Business Metrics:**
- Monthly Units Sold: 30,000
- Average Unit Revenue: $200
- Average Unit Cost: $70
- Units Per Order: 1.7

**Costs:**
- Outbound Shipping Cost per Order: $10
- Return Processing Cost per Unit: $10
- Repeat Marketing Cost: $0

**Return Rates:**
- Fit-Related Return Rate: 18%
- Other Return Rate: 12%
- Multi-size Fit Orders: 25%
- Resale Probability: 85%

**Return Signals Impact:**
- Customer Engagement Rate: 40%
- Return to Exchange Lift: 40%
- Return to Keep Item Lift: 10%
- 180-day Retention Lift: 20%

### Output Values

**Total Impact:**
- Monthly Profit Increase: $262,539
- Margin Expansion: 6.3%
- Baseline Monthly Net Sales: $4,200,000

**Value Breakdown:**
- Exchange Value: $151,920 (returns converted to exchanges)
- Keep Item Value: $46,053 (returns avoided entirely)
- Retention Value: $64,566 (increased customer lifetime value)

**Other Metrics:**
- Eligible Returns: 7,650
- Engaged Customers: 3,060
- Returns Prevented: 1,530

---

## Calculation Methodology

### Input Variables

#### Business Metrics
- **N**: Monthly e-commerce units sold (before returns)
- **AUR**: Revenue per unit after discounts, before refunds
- **AUC**: Manufacturing/procurement cost per unit
- **U**: Average number of units in an order

#### Costs
- **C_o**: Outbound shipping cost per order
- **C_s**: Per-unit shipping (C_o / U)
- **C_r**: Cost to process and ship a return
- **M_r**: Marketing cost to acquire a repeat order

#### Return Rates
- **r_f**: Fraction of units returned for fit issues
- **r_o**: Fraction of units returned for non-fit reasons
- **m**: Fraction of fit orders with multiple sizes ordered
- **p**: Probability a returned unit can be resold

#### Return Signals Impact
- **E**: Fraction of eligible customers who engage
- **L_exch**: Uplift in customers who exchange
- **L_keep**: Uplift in customers who keep the item
- **L_ret**: Increase in 180-day repeat purchase rate

---

### Step 1: Calculate Eligible Returns

First, we identify which returns Return Signals can potentially convert to exchanges or keeps.

**Formula:**
```
N_elig = N_f + N_o
```

**Where:**
- `N_f = N * r_f * (1 - m)` -- Fit returns excluding intentional multi-size orders
- `N_o = N * r_o` -- Non-fit related returns (quality, changed mind, etc.)

**Why?** We exclude multi-size fit returns because those customers intentionally ordered multiple sizes to find their fit. They found it and returned the rest as expected - this is normal behavior we don't need to intervene on.

---

### Step 2: Exchange Value

Value created when customers exchange instead of requesting a refund.

**Formula:**
```
V_exch = N_elig * E * L_exch * DeltaV_exch
```

**Where:**
- `DeltaV_exch = AUR - C_s - AUC` -- Incremental value per exchange vs. refund

**Why this formula works:**
- Keep the original revenue (AUR)
- Pay to ship the replacement (C_s)
- Use one more unit of inventory (AUC)

---

### Step 3: Keep Item Value

Value created when customers decide to keep the item instead of returning it.

**Formula:**
```
V_keep = N_elig * E * L_keep * DeltaV_keep
```

**Where:**
- `DeltaV_keep = AUR + C_r - AUC * p` -- Incremental value per kept item vs. refund

**Why this formula works:**
- Keep the original revenue (AUR)
- Avoid return processing cost (+C_r saved)
- Lose the inventory we would have recovered (AUC * p)

---

### Step 4: Retention Value

Value from increased repeat purchases by customers whose problems we resolved.

**Formula:**
```
V_ret = N_res * L_ret * V_repeat
```

**Where:**
- `N_res = N_elig * E * (L_exch + L_keep)` -- Number of resolved customers
- `V_repeat = U * (AUR - AUC - C_s) - M_r` -- Contribution margin per repeat order

**Why this formula works:**
- Resolved customers = those who exchanged or kept
- These customers have higher repeat purchase rates
- Each repeat order contributes margin minus marketing cost

---

### Total Monthly Value

```
V_total = V_exch + V_keep + V_ret
```

Sum of all three value components.

---

## Additional Metrics

### Baseline Revenue Calculation
```
Total Returns = N * (r_f + r_o)
Baseline Monthly Net Sales = (N - Total Returns) * AUR
```

### Margin Expansion
```
Margin Expansion % = (V_total / Baseline Net Sales) * 100
```

### Customer Impact Metrics
- **Eligible Returns**: N_elig
- **Engaged Customers**: N_elig * E
- **Returns Prevented**: N_elig * E * (L_exch + L_keep)
