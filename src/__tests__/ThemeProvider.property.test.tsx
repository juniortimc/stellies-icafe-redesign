import { describe, it, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as fc from 'fast-check';
import { ThemeProvider, useTheme } from '../context/ThemeContext';

/**
 * Feature: stellies-icafe-redesign, Property 1: Theme toggle and persistence round-trip
 *
 * **Validates: Requirements 3.6, 3.7**
 */

function ThemeDisplay() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme-value">{theme}</span>
      <button data-testid="toggle-btn" onClick={toggleTheme}>
        Toggle
      </button>
    </div>
  );
}

function createMockLocalStorage() {
  const store: Record<string, string> = {};
  return {
    store,
    mock: {
      getItem: (key: string): string | null => store[key] ?? null,
      setItem: (key: string, value: string) => {
        store[key] = String(value);
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        for (const key of Object.keys(store)) {
          delete store[key];
        }
      },
      get length() {
        return Object.keys(store).length;
      },
      key: (index: number): string | null => Object.keys(store)[index] ?? null,
    } as Storage,
  };
}

describe('Property 1: Theme toggle and persistence round-trip', () => {
  let originalLocalStorage: Storage;
  let mockStorage: ReturnType<typeof createMockLocalStorage>;

  beforeEach(() => {
    originalLocalStorage = window.localStorage;
    mockStorage = createMockLocalStorage();
    Object.defineProperty(window, 'localStorage', {
      value: mockStorage.mock,
      writable: true,
      configurable: true,
    });
    document.documentElement.classList.remove('dark');
  });

  afterEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: originalLocalStorage,
      writable: true,
      configurable: true,
    });
    document.documentElement.classList.remove('dark');
  });

  it('toggling produces opposite value, persists it, and toggling again restores original', async () => {
    const themeArb = fc.constantFrom<Array<'light' | 'dark'>>('light', 'dark');

    await fc.assert(
      fc.asyncProperty(themeArb, async (startTheme) => {
        // Setup: seed localStorage with starting theme and reset DOM
        mockStorage.store['stellies-theme'] = startTheme;
        document.documentElement.classList.remove('dark');
        if (startTheme === 'dark') {
          document.documentElement.classList.add('dark');
        }

        const user = userEvent.setup();
        const { unmount } = render(
          <ThemeProvider>
            <ThemeDisplay />
          </ThemeProvider>
        );

        const opposite = startTheme === 'light' ? 'dark' : 'light';

        // Verify initial theme rendered correctly
        const themeEl = screen.getByTestId('theme-value');
        if (themeEl.textContent !== startTheme) {
          unmount();
          throw new Error(
            `Initial theme: expected "${startTheme}", got "${themeEl.textContent}"`
          );
        }

        // First toggle → should flip to opposite
        const btn = screen.getByTestId('toggle-btn');
        await act(async () => {
          await user.click(btn);
        });

        if (themeEl.textContent !== opposite) {
          unmount();
          throw new Error(
            `After first toggle: expected "${opposite}", got "${themeEl.textContent}"`
          );
        }

        // Verify localStorage persisted the new value
        if (mockStorage.store['stellies-theme'] !== opposite) {
          unmount();
          throw new Error(
            `localStorage after first toggle: expected "${opposite}", got "${mockStorage.store['stellies-theme']}"`
          );
        }

        // Verify dark class on documentElement
        const hasDark = document.documentElement.classList.contains('dark');
        if (opposite === 'dark' && !hasDark) {
          unmount();
          throw new Error('Expected dark class on documentElement after toggling to dark');
        }
        if (opposite === 'light' && hasDark) {
          unmount();
          throw new Error('Expected no dark class on documentElement after toggling to light');
        }

        // Second toggle → should restore original
        await act(async () => {
          await user.click(btn);
        });

        if (themeEl.textContent !== startTheme) {
          unmount();
          throw new Error(
            `After second toggle: expected "${startTheme}", got "${themeEl.textContent}"`
          );
        }

        if (mockStorage.store['stellies-theme'] !== startTheme) {
          unmount();
          throw new Error(
            `localStorage after second toggle: expected "${startTheme}", got "${mockStorage.store['stellies-theme']}"`
          );
        }

        unmount();
      }),
      { numRuns: 100 }
    );
  });
});
