import type { FAQItem } from '@components/shared/FAQ.astro'

export const roiFaqItems: FAQItem[] = [
  {
    question: 'What is a good return rate for e-commerce?',
    answerHtml:
      'Return rates vary significantly by category. <a href="https://nrf.com/media-center/press-releases/nrf-and-happy-returns-report-2024-retail-returns-total-890-billion" target="_blank" rel="noopener noreferrer" class="text-accent-primary hover:text-accent-hover underline">The NRF reports</a> U.S. retail returns total about 16.9% of sales overall. However, apparel tends much higher: many brands see 30%+ return rates. Fit-related returns alone can account for up to 60% of all apparel returns.',
    answerText:
      'Return rates vary significantly by category. The NRF reports U.S. retail returns total about 16.9% of sales overall. However, apparel tends much higher: many brands see 30%+ return rates. Fit-related returns alone can account for up to 60% of all apparel returns.',
  },
  {
    question: 'What are typical costs to process a return?',
    answerHtml:
      '<a href="https://www.radial.com/insights/returns-management-2024" target="_blank" rel="noopener noreferrer" class="text-accent-primary hover:text-accent-hover underline">Radial estimates</a> merchants pay an average of $27 to process a return on a $100 order. This includes return shipping, receiving, inspection, and restocking. Only about 30% of returned merchandise gets resold at full price. The rest goes to liquidation, donation, or disposal.',
    answerText:
      'Radial estimates merchants pay an average of $27 to process a return on a $100 order. This includes return shipping, receiving, inspection, and restocking. Only about 30% of returned merchandise gets resold at full price. The rest goes to liquidation, donation, or disposal.',
  },
  {
    question: 'How do returns affect customer retention?',
    answerHtml:
      'The return experience has a significant impact on whether customers come back. <a href="https://nrf.com/media-center/press-releases/nrf-and-happy-returns-report-2024-retail-returns-total-890-billion" target="_blank" rel="noopener noreferrer" class="text-accent-primary hover:text-accent-hover underline">NRF reports</a> 67% of consumers say a negative return experience would discourage them from shopping with that retailer again. On the flip side, <a href="https://corp.narvar.com/blog/emotion-driven-ecommerce" target="_blank" rel="noopener noreferrer" class="text-accent-primary hover:text-accent-hover underline">Narvar found</a> 70% say an easy return or exchange experience makes them more likely to become repeat customers.',
    answerText:
      'The return experience has a significant impact on whether customers come back. NRF reports 67% of consumers say a negative return experience would discourage them from shopping with that retailer again. Conversely, Narvar found 70% say an easy return or exchange experience makes them more likely to become repeat customers.',
  },
  {
    question: 'How does Return Signals calculate ROI?',
    answerHtml:
      'We calculate value from three sources: (1) Exchange Value, which captures returns converted to exchanges that preserve revenue and reduce refunds, (2) Keep Item Value, where customers decide to keep items after receiving guidance or support, avoiding the return entirely, and (3) Retention Value, the increased repeat purchases from customers who engaged with Return Signals. See the <a href="#methodology" class="text-accent-primary hover:text-accent-hover underline">methodology section</a> above for the complete formulas.',
    answerText:
      'We calculate value from three sources: (1) Exchange Value, which captures returns converted to exchanges that preserve revenue and reduce refunds, (2) Keep Item Value, where customers decide to keep items after receiving guidance or support, avoiding the return entirely, and (3) Retention Value, the increased repeat purchases from customers who engaged with Return Signals.',
  },
  {
    question: 'What causes most apparel returns?',
    answerHtml:
      'Most apparel returns are not quality failures but information gaps. <a href="https://www.powerreviews.com/research/apparel-shopping-trends-2023/merchandise-returns/" target="_blank" rel="noopener noreferrer" class="text-accent-primary hover:text-accent-hover underline">PowerReviews found</a> 39% of apparel returns are due to fit issues (the garment does not work on the customer\'s body), and 28% are because the item did not look as expected (color, style, or fabric differs from what was shown online). These are exactly the kinds of issues that proactive post-purchase engagement can address before they become returns.',
    answerText:
      "Most apparel returns are not quality failures but information gaps. PowerReviews found 39% of apparel returns are due to fit issues (the garment does not work on the customer's body), and 28% are because the item did not look as expected (color, style, or fabric differs from what was shown online). These are exactly the kinds of issues that proactive post-purchase engagement can address.",
  },
  {
    question: 'Where can I learn more about reducing returns?',
    answerHtml:
      'Read our in-depth article <a href="/blog/return-starts-before-return" class="text-accent-primary hover:text-accent-hover underline">The End of Reactive Support</a> to learn how proactive post-purchase engagement can prevent returns, convert refunds to exchanges, and build customer loyalty. We cover the economics of returns, why most apparel returns happen, and how AI is changing customer support from reactive to proactive.',
    answerText:
      "Read our in-depth article 'The End of Reactive Support' on our blog to learn how proactive post-purchase engagement can prevent returns, convert refunds to exchanges, and build customer loyalty. We cover the economics of returns, why most apparel returns happen, and how AI is changing customer support from reactive to proactive.",
  },
]
