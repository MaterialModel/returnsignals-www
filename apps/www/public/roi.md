# ROI Calculator Methodology

## Overview

The Return Signals ROI Calculator estimates the financial impact of reducing returns, increasing exchanges, and improving customer retention through our platform.

## Example Calculation

Based on typical e-commerce metrics:

### Input Values

**Business Metrics:**

- Monthly Units Sold: 30,000
- Average Unit Revenue: $200
- Average Unit Cost / Landed Duty Paid: $60
- Units Per Order: 2
- Phone Number Collection Rate: 40%
- Repeat Marketing Cost: $0

**Costs:**

- Outbound Shipping Cost per Order: $10
- Return Processing Cost per Unit: $20

**Return Rates:**

- Fit-Related Refund Rate: 12%
- Other Refund Rate: 18%
- Multi-size Fit Orders / Bracketing: 25%
- Resale Probability: 30%

**Return Signals Impact:**

- Problem Engagement Rate: 95%
- Happy Customer Engagement Rate: 50%
- Return to Exchange Lift: 40%
- Return to Keep Item Lift: 10%
- 180-day Retention Lift: 5%

### Output Values

**Total Impact:**

- Annual Profit Increase: $3,524,358
- Margin Expansion: 7.0%
- Baseline Annual Net Sales: $50,400,000

**Value Breakdown:**

- Exchange Value: $1,930,278 (returns converted to exchanges)
- Keep Item Value: $773,712 (returns avoided entirely)
- Retention Value: $820,368 (increased customer lifetime value)

---

## Calculation Methodology

### Input Variables

#### Business Metrics

- **N**: Monthly e-commerce units sold (before returns)
- **AUR**: Revenue per unit after discounts, before refunds
- **AUC**: Landed Duty Paid (LDP) cost per unit
- **U**: Average number of units in an order
- **S**: Fraction of customers who share phone number
- **M_r**: Marketing cost to acquire a repeat order

#### Costs

- **C_o**: Outbound shipping cost per order
- **C_s**: Per-unit shipping (C_o / U)
- **C_r**: Cost to process and ship a return

#### Return Rates

- **r_f**: Fraction of units refunded for fit issues
- **r_o**: Fraction of units refunded for non-fit reasons
- **m**: Fraction of fit orders with multiple sizes ordered
- **p**: Probability a returned unit can be resold

#### Return Signals Impact

- **E_p**: Fraction of problem customers who engage when contacted
- **E_h**: Fraction of happy customers who engage when contacted
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
V_exch = N_elig * S * E_p * L_exch * DeltaV_exch
```

**Where:**

- `DeltaV_exch = AUR - C_s - AUC` -- Incremental value per exchange vs. refund

**Why this formula works:**

- N_elig × S × E_p = customers with return intent who engage with us
- Multiplied by L_exch = engaged customers who convert to exchange
- Each exchange keeps original revenue (AUR), pays for replacement shipping (C_s), uses one more unit of inventory (AUC)

---

### Step 3: Keep Item Value

Value created when customers decide to keep the item instead of returning it.

**Formula:**

```
V_keep = N_elig * S * E_p * L_keep * DeltaV_keep
```

**Where:**

- `DeltaV_keep = AUR + C_r - AUC * p` -- Incremental value per kept item vs. refund

**Why this formula works:**

- N_elig × S × E_p = customers with return intent who engage with us
- Multiplied by L_keep = engaged customers who decide to keep the item
- Each kept item preserves revenue (AUR), avoids return processing cost (+C_r saved), but loses inventory we would have recovered (AUC × p)

---

### Step 4: Retention Value

Value from increased repeat purchases by customers who engaged with Return Signals.

**Formula:**

```
V_ret = N_eng * L_ret * V_repeat
```

**Where:**

- `N_eng = (N_elig * S * E_p) + (N - N_elig) * S * E_h` -- Total engaged customers (problem + happy)
- `V_repeat = U * (AUR - AUC - C_s) - M_r` -- Contribution margin per repeat order

**Why this formula works:**

- Problem customers engaged = N_elig × S × E_p
- Happy customers engaged = (N - N_elig) × S × E_h
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
- **Engaged Customers**: (N_elig _ S _ E_p) + (N - N_elig) _ S _ E_h
- **Returns Prevented**: N_elig _ S _ E_p \* (L_exch + L_keep)

---

## Frequently Asked Questions

### What is a good return rate for e-commerce?

Return rates vary significantly by category. [The NRF reports](https://nrf.com/media-center/press-releases/nrf-and-happy-returns-report-2024-retail-returns-total-890-billion) U.S. retail returns total about 16.9% of sales overall. However, apparel tends much higher: many brands see 30%+ return rates. Fit-related returns alone can account for up to 60% of all apparel returns.

### How much does it cost to process a return?

[Radial estimates](https://www.radial.com/insights/returns-management-2024) merchants pay an average of $27 to process a return on a $100 order. This includes return shipping, receiving, inspection, and restocking. Only about 30% of returned merchandise gets resold at full price. The rest goes to liquidation, donation, or disposal.

### How do returns affect customer retention?

The return experience has a significant impact on whether customers come back. [NRF reports](https://nrf.com/media-center/press-releases/nrf-and-happy-returns-report-2024-retail-returns-total-890-billion) 67% of consumers say a negative return experience would discourage them from shopping with that retailer again. Conversely, [Narvar found](https://corp.narvar.com/blog/emotion-driven-ecommerce) 70% say an easy return or exchange experience makes them more likely to become repeat customers.

### How does Return Signals calculate ROI?

We calculate value from three sources:

1. **Exchange Value** - Returns converted to exchanges that preserve revenue and reduce refunds
2. **Keep Item Value** - Customers who decide to keep items after receiving guidance or support, avoiding the return entirely
3. **Retention Value** - Increased repeat purchases from customers whose issues were resolved positively

See the methodology section above for the complete formulas.

### What causes most apparel returns?

Most apparel returns are not quality failures but information gaps. [PowerReviews found](https://www.powerreviews.com/research/apparel-shopping-trends-2023/merchandise-returns/) 39% of apparel returns are due to fit issues (the garment does not work on the customer's body), and 28% are because the item did not look as expected (color, style, or fabric differs from what was shown online). These are exactly the kinds of issues that proactive post-purchase engagement can address.

### Where can I learn more about reducing returns?

Read our in-depth article [The End of Reactive Support](/blog/return-starts-before-return) to learn how proactive post-purchase engagement can prevent returns, convert refunds to exchanges, and build customer loyalty. We cover the economics of returns, why most apparel returns happen, and how AI is changing customer support from reactive to proactive.
