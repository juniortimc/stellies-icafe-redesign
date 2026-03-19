import { describe, it } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as fc from 'fast-check';
import { PriceCalculator, calculatePrice } from '../components/PriceCalculator';
import { priceConfig } from '../data/priceConfig';

/**
 * Feature: stellies-icafe-redesign, Property 4: Price calculation correctness
 *
 * **Validates: Requirements 6.3**
 *
 * For any valid print type ('bw' or 'color') and any non-negative integer page count,
 * the calculated total price should equal priceConfig[printType] * pageCount.
 */
describe('Property 4: Price calculation correctness', () => {
  it('calculates correct total for any valid print type and non-negative integer page count', () => {
    const printTypeArb = fc.constantFrom<'bw' | 'color'>('bw', 'color');
    const pageCountArb = fc.integer({ min: 0, max: 1_000_000 });

    fc.assert(
      fc.property(printTypeArb, pageCountArb, (printType, pageCount) => {
        const result = calculatePrice(printType, String(pageCount));
        const expected = priceConfig[printType] * pageCount;

        if (result.error !== null) {
          throw new Error(
            `Unexpected error for printType="${printType}", pageCount=${pageCount}: ${result.error}`,
          );
        }
        if (result.totalPrice !== expected) {
          throw new Error(
            `Expected R${expected.toFixed(2)} but got R${result.totalPrice?.toFixed(2)} for printType="${printType}", pageCount=${pageCount}`,
          );
        }
      }),
      { numRuns: 100 },
    );
  });

  it('displays correct total in the rendered component', async () => {
    const printTypeArb = fc.constantFrom<'bw' | 'color'>('bw', 'color');
    const pageCountArb = fc.integer({ min: 1, max: 10_000 });

    await fc.assert(
      fc.asyncProperty(printTypeArb, pageCountArb, async (printType, pageCount) => {
        cleanup();
        const user = userEvent.setup();
        render(<PriceCalculator />);

        // Select print type
        const select = screen.getByLabelText('Print Type');
        await user.selectOptions(select, printType);

        // Enter page count
        const input = screen.getByLabelText('Number of Pages');
        await user.clear(input);
        await user.type(input, String(pageCount));

        const expected = priceConfig[printType] * pageCount;
        const priceText = `R${expected.toFixed(2)}`;
        const el = screen.getByText(priceText);
        if (!el) {
          throw new Error(
            `Expected "${priceText}" for printType="${printType}", pageCount=${pageCount}`,
          );
        }

        cleanup();
      }),
      { numRuns: 100 },
    );
  });
});

/**
 * Feature: stellies-icafe-redesign, Property 5: Invalid price input rejection
 *
 * **Validates: Requirements 6.4**
 *
 * For any string that is non-numeric, represents a negative number, or contains
 * decimal values, the price calculator should produce an error state and not
 * display a calculated price.
 */
describe('Property 5: Invalid price input rejection', () => {
  it('rejects any non-numeric, negative, or decimal input via calculatePrice', () => {
    const printTypeArb = fc.constantFrom<'bw' | 'color'>('bw', 'color');

    // Generate strings that are non-numeric, negative, or decimal
    const invalidInputArb = fc.oneof(
      // Non-numeric strings (letters, symbols, mixed)
      fc
        .string({ minLength: 1, maxLength: 20, unit: 'grapheme' })
        .filter((s) => s.trim().length > 0 && !/^\+?\d+$/.test(s.trim())),
      // Negative integers
      fc.integer({ min: -1_000_000, max: -1 }).map(String),
      // Decimal numbers
      fc
        .tuple(
          fc.integer({ min: 0, max: 10000 }),
          fc.integer({ min: 1, max: 99 }),
        )
        .map(([whole, frac]) => `${whole}.${frac}`),
    );

    fc.assert(
      fc.property(printTypeArb, invalidInputArb, (printType, input) => {
        const result = calculatePrice(printType, input);

        if (result.error === null) {
          throw new Error(
            `Expected error for invalid input "${input}" but got totalPrice=${result.totalPrice}`,
          );
        }
        if (result.totalPrice !== null) {
          throw new Error(
            `Expected null totalPrice for invalid input "${input}" but got ${result.totalPrice}`,
          );
        }
      }),
      { numRuns: 100 },
    );
  });
});
