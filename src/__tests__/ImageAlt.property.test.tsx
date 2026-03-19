import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import * as fc from 'fast-check';
import { ThemeProvider } from '../context/ThemeContext';
import { HeroSection } from '../components/HeroSection';
import { TestimonialCard } from '../components/TestimonialCard';
import type { Testimonial } from '../data/testimonials';

/**
 * Feature: stellies-icafe-redesign, Property 8: All images have alt text
 *
 * **Validates: Requirements 10.3**
 *
 * For any <img> element rendered by the application, the element should
 * have a non-empty alt attribute.
 */

const testimonialArb: fc.Arbitrary<Testimonial> = fc.record({
  id: fc.string({ minLength: 1, maxLength: 20 }),
  name: fc.string({ minLength: 1, maxLength: 50 }),
  text: fc.string({ minLength: 1, maxLength: 200 }),
  rating: fc.option(fc.integer({ min: 1, max: 5 }), { nil: undefined }),
  avatar: fc.option(
    fc.webUrl().map((url) => url),
    { nil: undefined },
  ),
});

describe('Property 8: All images have alt text', () => {
  it('HeroSection: all img elements have non-empty alt attribute', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container, unmount } = render(
          <ThemeProvider>
            <HeroSection />
          </ThemeProvider>,
        );

        const images = container.querySelectorAll('img');
        for (const img of images) {
          const alt = img.getAttribute('alt');
          if (!alt || alt.trim().length === 0) {
            unmount();
            throw new Error(
              `Found <img> with empty or missing alt attribute: src="${img.getAttribute('src')}"`,
            );
          }
        }

        unmount();
      }),
      { numRuns: 100 },
    );
  });

  it('TestimonialCard with avatar: img element has non-empty alt attribute', () => {
    const withAvatarArb = testimonialArb.filter((t) => t.avatar !== undefined);

    fc.assert(
      fc.property(withAvatarArb, (testimonial) => {
        const { container, unmount } = render(
          <TestimonialCard testimonial={testimonial} />,
        );

        const images = container.querySelectorAll('img');
        for (const img of images) {
          const alt = img.getAttribute('alt');
          if (!alt || alt.trim().length === 0) {
            unmount();
            throw new Error(
              `Found <img> with empty or missing alt for testimonial "${testimonial.name}"`,
            );
          }
        }

        unmount();
      }),
      { numRuns: 100 },
    );
  });
});
