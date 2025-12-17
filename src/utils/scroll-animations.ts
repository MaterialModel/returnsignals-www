/**
 * Scroll Animations Utility
 *
 * Global Intersection Observer for scroll-triggered animations
 * Observes elements with .animate-on-scroll and .stagger-children classes
 * Adds .is-visible class when elements enter viewport
 *
 * Features:
 * - One-time animation trigger (unobserves after animation)
 * - Respects prefers-reduced-motion
 * - Optimized threshold and root margin
 * - Works with CSS transitions defined in global.css
 */

export function initScrollAnimations() {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion) {
    // If user prefers reduced motion, immediately make all elements visible
    const elements = document.querySelectorAll('.animate-on-scroll, .stagger-children')
    elements.forEach((el) => {
      el.classList.add('is-visible')
    })
    return
  }

  // Create Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add visible class to trigger animation
          entry.target.classList.add('is-visible')

          // Unobserve after animation to save memory
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.15, // Trigger when 15% of element is visible
      rootMargin: '0px 0px -10% 0px', // Trigger slightly before element reaches center
    }
  )

  // Observe all elements with animation classes
  const elements = document.querySelectorAll('.animate-on-scroll, .stagger-children')
  elements.forEach((el) => {
    observer.observe(el)
  })
}

// Initialize after DOM is ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations)
  } else {
    initScrollAnimations()
  }
}
