import { useState, useCallback } from 'react';
import { priceConfig, type PrintType } from '../data/priceConfig';

export interface CalculatorState {
  printType: PrintType;
  pageCount: string;
  totalPrice: number | null;
  error: string | null;
}

/**
 * Validates the page count input and returns the calculator state.
 * Exported for direct testing without rendering.
 */
export function calculatePrice(
  printType: PrintType,
  pageCount: string,
): { totalPrice: number | null; error: string | null } {
  // Empty string (no input yet) — no error, no price
  if (pageCount === '') {
    return { totalPrice: null, error: null };
  }

  const trimmed = pageCount.trim();

  // Whitespace-only is treated as invalid input
  if (trimmed === '') {
    return { totalPrice: null, error: 'Please enter a valid number of pages.' };
  }

  // Reject non-numeric values (allow only digits, optionally with leading +)
  if (!/^\+?\d+$/.test(trimmed)) {
    // Check specific cases for better error messages
    if (/^-/.test(trimmed)) {
      return { totalPrice: null, error: 'Page count cannot be negative.' };
    }
    if (/^\d*\.\d+$/.test(trimmed)) {
      return { totalPrice: null, error: 'Page count must be a whole number.' };
    }
    return { totalPrice: null, error: 'Please enter a valid number of pages.' };
  }

  const count = parseInt(trimmed, 10);
  const total = priceConfig[printType] * count;
  return { totalPrice: total, error: null };
}

export function PriceCalculator() {
  const [state, setState] = useState<CalculatorState>({
    printType: 'bw',
    pageCount: '',
    totalPrice: null,
    error: null,
  });

  const handlePrintTypeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const printType = e.target.value as PrintType;
      setState((prev) => {
        const { totalPrice, error } = calculatePrice(printType, prev.pageCount);
        return { ...prev, printType, totalPrice, error };
      });
    },
    [],
  );

  const handlePageCountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const pageCount = e.target.value;
      setState((prev) => {
        const { totalPrice, error } = calculatePrice(prev.printType, pageCount);
        return { ...prev, pageCount, totalPrice, error };
      });
    },
    [],
  );

  return (
    <section id="pricing" className="py-16 px-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-6 text-center">
        Printing Price Calculator
      </h2>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="print-type"
            className="block text-sm font-medium text-gray-700 dark:text-dark-muted mb-1"
          >
            Print Type
          </label>
          <select
            id="print-type"
            value={state.printType}
            onChange={handlePrintTypeChange}
            className="w-full rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text px-3 py-2 focus:outline-2 focus:outline-offset-2 focus:outline-stellies-green"
          >
            <option value="bw">B&amp;W — R{priceConfig.bw.toFixed(2)}/page</option>
            <option value="color">Color — R{priceConfig.color.toFixed(2)}/page</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="page-count"
            className="block text-sm font-medium text-gray-700 dark:text-dark-muted mb-1"
          >
            Number of Pages
          </label>
          <input
            id="page-count"
            type="text"
            inputMode="numeric"
            value={state.pageCount}
            onChange={handlePageCountChange}
            placeholder="Enter page count"
            aria-describedby={state.error ? 'page-count-error' : undefined}
            aria-invalid={state.error ? true : undefined}
            className="w-full rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text px-3 py-2 focus:outline-2 focus:outline-offset-2 focus:outline-stellies-green"
          />
          {state.error && (
            <p
              id="page-count-error"
              role="alert"
              className="mt-1 text-sm text-red-600 dark:text-red-400"
            >
              {state.error}
            </p>
          )}
        </div>

        {state.totalPrice !== null && !state.error && (
          <div
            className="mt-4 p-4 rounded-lg bg-stellies-green/10 text-center"
            aria-live="polite"
          >
            <p className="text-sm text-gray-600 dark:text-dark-muted">Estimated Total</p>
            <p className="text-3xl font-bold text-stellies-green">
              R{state.totalPrice.toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
