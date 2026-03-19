import { describe, it } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import * as fc from 'fast-check';
import { TestimonialCard } from '../components/TestimonialCard';
import type { Testimonial } from '../data/testimonials';

/**
 * Feature: stellies-icafe-redesign, Property 6: Testimonial card renders all required fields
 *
 * **Validates: Requirements 7.4**
 */

// Safe text generator: trimmed alphanumeric strings
const safeText = fc
  .string({ minLength: 3, maxLength: 40, unit: 'grapheme' })
  .map((s) => s.replace(/[^a-zA-Z0-9 ]/g, 'a').trim())
  .filter((s) => s.length >= 3);

describe('Property 6: Testimonial card renders all required fields', () => {
  it('renders name and text for any Testimonial', () => {
    const testimonialArb: fc.Arbitrary<Testimonial> = fc
      .record({
        name: safeText,
        text: safeText,
        rating: fc.option(fc.integer({ min: 1, max: 5 }), { nil: undefined }),
        avatar: fc.option(
          fc.webUrl().map((u) => u),
          { nil: undefined },
        ),
      })
      .filter((t) => t.name !== t.text)
      .map((t) => ({
        ...t,
        id: t.name.toLowerCase().replace(/\s+/g, '-'),
      }));

    fc.assert(
      fc.property(testimonialArb, (testimonial) => {
        cleanup();
        const { container, unmount } = render(
          <TestimonialCard testimonial={testimonial} />,
        );

        const allText = container.textContent ?? '';

        // Name must be present
        if (!allText.includes(testimonial.name)) {
          unmount();
          throw new Error(
            `Name "${testimonial.name}" not found in rendered output`,
          );
        }

        // Testimonial text must be present
        if (!allText.includes(testimonial.text)) {
          unmount();
          throw new Error(
            `Text "${testimonial.text}" not found in rendered output`,
          );
        }

        unmount();
      }),
      { numRuns: 100 },
    );
  });
});
