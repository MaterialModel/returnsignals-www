/**
 * Analytics Animation Utilities
 *
 * Animation functions for the Analytics Platform Preview component
 * Provides counting animations, typing effects, and bar chart fills
 *
 * Pattern inspired by SMSMockup.astro autoplay implementation
 */

/**
 * Animates a number from 0 to target value with easing
 * @param element - HTML element to update
 * @param target - Target number value
 * @param duration - Animation duration in milliseconds (default: 1000ms)
 * @returns Promise that resolves when animation completes
 */
export function animateCount(
  element: HTMLElement,
  target: number,
  duration: number = 1000,
): Promise<void> {
  return new Promise((resolve) => {
    const start = 0;
    const startTime = performance.now();

    function update(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out-cubic)
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (target - start) * eased);

      element.textContent = current.toString();

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = target.toString();
        resolve();
      }
    }

    requestAnimationFrame(update);
  });
}

/**
 * Animates text typing effect character by character
 * @param element - Input element to type into
 * @param text - Text to type
 * @param charDelay - Delay between characters in milliseconds (default: 60ms)
 * @returns Promise that resolves when typing completes
 */
export function typeText(
  element: HTMLInputElement,
  text: string,
  charDelay: number = 60,
): Promise<void> {
  return new Promise((resolve) => {
    let i = 0;
    element.value = "";

    const interval = setInterval(() => {
      element.value = text.slice(0, i + 1);
      i++;

      if (i >= text.length) {
        clearInterval(interval);
        resolve();
      }
    }, charDelay);
  });
}

/**
 * Animates a bar chart fill from 0 to target width
 * @param barElement - Bar element to animate
 * @param targetWidth - Target width as percentage string (e.g., "56%")
 * @param duration - Animation duration in milliseconds (default: 800ms)
 * @returns Promise that resolves when animation completes
 */
export function animateBarFill(
  barElement: HTMLElement,
  targetWidth: string,
  duration: number = 800,
): Promise<void> {
  return new Promise((resolve) => {
    barElement.style.width = "0%";
    barElement.style.transition = `width ${duration}ms ease-out`;

    // Force reflow to ensure transition applies
    barElement.offsetHeight;

    barElement.style.width = targetWidth;

    setTimeout(() => {
      // Clean up will-change after animation
      barElement.style.willChange = "auto";
      resolve();
    }, duration);
  });
}

/**
 * Utility to wait for a specified duration
 * @param ms - Milliseconds to wait
 * @returns Promise that resolves after delay
 */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Adds staggered reveal animation to child elements
 * @param container - Parent container element
 * @param staggerDelay - Delay between each child in milliseconds (default: 150ms)
 * @returns Promise that resolves when all children are revealed
 */
export function staggerReveal(
  container: HTMLElement,
  staggerDelay: number = 150,
): Promise<void> {
  return new Promise((resolve) => {
    const children = Array.from(container.children) as HTMLElement[];

    if (children.length === 0) {
      resolve();
      return;
    }

    children.forEach((child, index) => {
      setTimeout(() => {
        child.classList.add("is-visible");

        // Resolve when last child is revealed
        if (index === children.length - 1) {
          setTimeout(resolve, 300); // Wait for animation to complete
        }
      }, index * staggerDelay);
    });
  });
}
