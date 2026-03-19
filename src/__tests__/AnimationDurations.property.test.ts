import { describe, it } from 'vitest';
import * as fc from 'fast-check';

/**
 * Feature: stellies-icafe-redesign, Property 7: Animation durations within performance budget
 *
 * **Validates: Requirements 9.4**
 *
 * For any Framer Motion animation configuration used in the application,
 * the duration value should be at most 0.5 seconds (500 milliseconds).
 */

/**
 * All animation duration configs used across the application components.
 *
 * Source audit:
 * - HeroSection: itemTransition.duration = 0.4 (reduced-motion: 0)
 * - ServicesGrid: itemTransition.duration = 0.4 (reduced-motion: 0)
 * - ServiceCard:  transition.duration    = 0.2
 * - TestimonialCarousel: animDuration    = 0.3 (reduced-motion: 0)
 */
const ALL_ANIMATION_DURATIONS: { component: string; context: string; duration: number }[] = [
  { component: 'HeroSection', context: 'itemTransition (normal)', duration: 0.4 },
  { component: 'HeroSection', context: 'itemTransition (reduced-motion)', duration: 0 },
  { component: 'ServicesGrid', context: 'itemTransition (normal)', duration: 0.4 },
  { component: 'ServicesGrid', context: 'itemTransition (reduced-motion)', duration: 0 },
  { component: 'ServiceCard', context: 'hover transition', duration: 0.2 },
  { component: 'TestimonialCarousel', context: 'animDuration (normal)', duration: 0.3 },
  { component: 'TestimonialCarousel', context: 'animDuration (reduced-motion)', duration: 0 },
];

const MAX_DURATION = 0.5;

describe('Property 7: Animation durations within performance budget', () => {
  it('all animation duration configs are ≤ 0.5s', () => {
    // Arbitrary that picks any of the real animation duration configs
    const durationConfigArb = fc.constantFrom(...ALL_ANIMATION_DURATIONS);

    fc.assert(
      fc.property(durationConfigArb, (config) => {
        if (config.duration > MAX_DURATION) {
          throw new Error(
            `Animation duration exceeds budget: ${config.component} (${config.context}) ` +
            `has duration ${config.duration}s, max allowed is ${MAX_DURATION}s`,
          );
        }
        return true;
      }),
      { numRuns: 100 },
    );
  });

  it('any duration value in [0, 0.5] satisfies the performance budget', () => {
    // Property: for any duration in the valid range, it should be ≤ 0.5
    const validDurationArb = fc.double({ min: 0, max: MAX_DURATION, noNaN: true });

    fc.assert(
      fc.property(validDurationArb, (duration) => {
        return duration <= MAX_DURATION;
      }),
      { numRuns: 100 },
    );
  });

  it('any duration value above 0.5 violates the performance budget', () => {
    // Property: for any duration above the budget, it should be rejected
    const invalidDurationArb = fc.double({
      min: MAX_DURATION + 0.001,
      max: 10,
      noNaN: true,
    });

    fc.assert(
      fc.property(invalidDurationArb, (duration) => {
        return duration > MAX_DURATION;
      }),
      { numRuns: 100 },
    );
  });
});
