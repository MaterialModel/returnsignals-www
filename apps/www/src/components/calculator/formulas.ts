// Variable categories for input definitions
export const inputVariables = {
  businessMetrics: [
    {
      symbol: 'N',
      html: 'N',
      name: 'Units Sold',
      description: 'Monthly e-commerce units sold (before returns)',
    },
    {
      symbol: 'AUR',
      html: 'AUR',
      name: 'Average Unit Revenue',
      description: 'Revenue per unit after discounts, before refunds',
    },
    {
      symbol: 'AUC',
      html: 'AUC',
      name: 'Average Unit Cost / Landed Duty Paid',
      description: 'Cost per unit including shipping, duties, and taxes',
    },
    {
      symbol: 'U',
      html: 'U',
      name: 'Units Per Order',
      description: 'Average number of units in an order',
    },
    {
      symbol: 'S',
      html: 'S',
      name: 'Phone Number Collection Rate',
      description: 'Fraction of customers who share phone number',
    },
    {
      symbol: 'M_r',
      html: 'M<sub>r</sub>',
      name: 'Repeat Marketing Cost',
      description: 'Marketing cost to acquire a repeat order',
    },
  ],
  costs: [
    {
      symbol: 'C_o',
      html: 'C<sub>o</sub>',
      name: 'Order Shipping Cost',
      description: 'Outbound shipping cost per order',
    },
    {
      symbol: 'C_s',
      html: 'C<sub>s</sub>',
      name: 'Unit Shipping Cost',
      descriptionHtml: 'Per-unit shipping (C<sub>o</sub> / U)',
    },
    {
      symbol: 'C_r',
      html: 'C<sub>r</sub>',
      name: 'Return Processing Cost',
      description: 'Cost to process and ship a return',
    },
  ],
  returnRates: [
    {
      symbol: 'r_f',
      html: 'r<sub>f</sub>',
      name: 'Fit Refund Rate',
      description: 'Fraction of units refunded for fit issues',
    },
    {
      symbol: 'r_o',
      html: 'r<sub>o</sub>',
      name: 'Other Refund Rate',
      description: 'Fraction of units refunded for non-fit reasons',
    },
    {
      symbol: 'm',
      html: 'm',
      name: 'Multi-size Rate',
      description: 'Fraction of fit orders with multiple sizes ordered',
    },
    {
      symbol: 'p',
      html: 'p',
      name: 'Resale Probability',
      description: 'Probability a returned unit can be resold',
    },
  ],
  impact: [
    {
      symbol: 'E_p',
      html: 'E<sub>p</sub>',
      name: 'Problem Engagement Rate',
      description: 'Fraction of problem customers who engage when contacted',
    },
    {
      symbol: 'E_h',
      html: 'E<sub>h</sub>',
      name: 'Happy Engagement Rate',
      description: 'Fraction of happy customers who engage when contacted',
    },
    {
      symbol: 'L_{\\text{exch}}',
      html: 'L<sub>exch</sub>',
      name: 'Exchange Lift',
      description: 'Uplift in customers who exchange',
    },
    {
      symbol: 'L_{\\text{keep}}',
      html: 'L<sub>keep</sub>',
      name: 'Keep Lift',
      description: 'Uplift in customers who keep the item',
    },
    {
      symbol: 'L_{\\text{ret}}',
      html: 'L<sub>ret</sub>',
      name: 'Retention Lift',
      description: 'Increase in 180-day repeat purchase rate',
    },
  ],
}

// Step-by-step formula derivations
export const formulas = {
  eligibleReturns: {
    title: 'Step 1: Calculate Eligible Returns',
    description:
      'First, we identify which returns Return Signals can potentially convert to exchanges or keeps.',
    intuition:
      "We exclude multi-size fit returns because those customers intentionally ordered multiple sizes to find their fit. They found it and returned the rest as expected - this is normal behavior we don't need to intervene on.",
    mainFormula: 'N_{\\text{elig}} = N_f + N_o',
    subFormulas: [
      {
        latex: 'N_f = N \\times r_f \\times (1 - m)',
        description: 'Fit returns excluding intentional multi-size orders',
      },
      {
        latex: 'N_o = N \\times r_o',
        description: 'Non-fit related returns (quality, changed mind, etc.)',
      },
    ],
  },

  exchangeValue: {
    title: 'Step 2: Exchange Value',
    description: 'Value created when customers exchange instead of requesting a refund.',
    intuition:
      'When converting a refund to an exchange, we keep the original sale revenue, pay to ship the replacement item, and use one additional unit of inventory.',
    intuitionBulletsHtml: [
      'N<sub>elig</sub> × S × E<sub>p</sub> = customers with return intent who engage with us',
      'Multiplied by L<sub>exch</sub> = engaged customers who convert to exchange',
      'Each exchange keeps original revenue (AUR), pays for replacement shipping (C<sub>s</sub>), uses one more unit of inventory (AUC)',
    ],
    mainFormula:
      'V_{\\text{exch}} = N_{\\text{elig}} \\times S \\times E_p \\times L_{\\text{exch}} \\times \\Delta V_{\\text{exch}}',
    subFormulas: [
      {
        latex: '\\Delta V_{\\text{exch}} = AUR - C_s - AUC',
        description: 'Incremental value per exchange vs. refund',
      },
    ],
  },

  keepValue: {
    title: 'Step 3: Keep Item Value',
    description: 'Value created when customers decide to keep the item instead of returning it.',
    intuition:
      'When a customer keeps the item, we retain the original revenue, avoid the return processing cost entirely, but we lose the inventory value we would have recovered through resale.',
    intuitionBulletsHtml: [
      'N<sub>elig</sub> × S × E<sub>p</sub> = customers with return intent who engage with us',
      'Multiplied by L<sub>keep</sub> = engaged customers who decide to keep the item',
      'Each kept item preserves revenue (AUR), avoids return processing cost (+C<sub>r</sub> saved), but loses inventory we would have recovered (AUC × p)',
    ],
    mainFormula:
      'V_{\\text{keep}} = N_{\\text{elig}} \\times S \\times E_p \\times L_{\\text{keep}} \\times \\Delta V_{\\text{keep}}',
    subFormulas: [
      {
        latex: '\\Delta V_{\\text{keep}} = AUR + C_r - AUC \\times p',
        description: 'Incremental value per kept item vs. refund',
      },
    ],
  },

  retentionValue: {
    title: 'Step 4: Retention Value',
    description:
      'Value from increased repeat purchases by customers who engaged with Return Signals.',
    intuition:
      'Customers who engage with Return Signals are more likely to purchase again. The value of each additional repeat order is the unit margin times units per order, minus any marketing cost to bring them back.',
    intuitionBulletsHtml: [
      'Problem customers engaged = N<sub>elig</sub> × S × E<sub>p</sub>',
      'Happy customers engaged = (N - N<sub>elig</sub>) × S × E<sub>h</sub>',
      'Each repeat order contributes margin minus marketing cost',
    ],
    mainFormula:
      'V_{\\text{ret}} = N_{\\text{eng}} \\times L_{\\text{ret}} \\times V_{\\text{repeat}}',
    subFormulas: [
      {
        latex:
          'N_{\\text{eng}} = (N_{\\text{elig}} \\times S \\times E_p) + (N - N_{\\text{elig}}) \\times S \\times E_h',
        description: 'Total engaged customers (problem + happy)',
      },
      {
        latex: 'V_{\\text{repeat}} = U \\times (AUR - AUC - C_s) - M_r',
        description: 'Contribution margin per repeat order',
      },
    ],
  },

  totalValue: {
    title: 'Total Monthly Value',
    formula: 'V_{\\text{total}} = V_{\\text{exch}} + V_{\\text{keep}} + V_{\\text{ret}}',
    description: 'Sum of all three value components',
  },
}
