import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as fc from 'fast-check';
import { LiveStatusBadge } from '../components/LiveStatusBadge';
import type { CafeStatus } from '../components/LiveStatusBadge';

/**
 * Feature: stellies-icafe-redesign, Property 2: Live status badge displays correct status
 *
 * **Validates: Requirements 4.3**
 */

describe('Property 2: Live status badge displays correct status', () => {
  it('renders text matching the label field and visually indicates the isOpen state for any CafeStatus', () => {
    const cafeStatusArb: fc.Arbitrary<CafeStatus> = fc.record({
      isOpen: fc.boolean(),
      label: fc.string({ minLength: 1, maxLength: 50 }).filter((s) => s.trim().length > 0),
    });

    fc.assert(
      fc.property(cafeStatusArb, (status) => {
        const { unmount } = render(<LiveStatusBadge status={status} />);

        // The badge should render text matching the label
        const badge = screen.getByRole('status');
        if (!badge.textContent?.includes(status.label)) {
          unmount();
          throw new Error(
            `Badge text "${badge.textContent}" does not contain label "${status.label}"`
          );
        }

        // The badge should visually indicate the isOpen state via color classes
        if (status.isOpen) {
          if (!badge.className.includes('green')) {
            unmount();
            throw new Error(
              `Expected green color class for isOpen=true, got className: "${badge.className}"`
            );
          }
        } else {
          if (!badge.className.includes('red')) {
            unmount();
            throw new Error(
              `Expected red color class for isOpen=false, got className: "${badge.className}"`
            );
          }
        }

        unmount();
      }),
      { numRuns: 100 }
    );
  });
});
