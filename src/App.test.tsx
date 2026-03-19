import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import App from './App';

function createMockLocalStorage() {
  const store: Record<string, string> = {};
  return {
    store,
    mock: {
      getItem: (key: string) => store[key] ?? null,
      setItem: (key: string, value: string) => { store[key] = value; },
      removeItem: (key: string) => { delete store[key]; },
      clear: () => { Object.keys(store).forEach((k) => delete store[k]); },
      get length() { return Object.keys(store).length; },
      key: (i: number) => Object.keys(store)[i] ?? null,
    } as Storage,
  };
}

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

describe('App', () => {
  it('renders all major sections without errors', () => {
    render(<App />);

    // Header
    expect(screen.getByRole('banner')).toBeInTheDocument();

    // Main
    expect(screen.getByRole('main')).toBeInTheDocument();

    // Hero section
    expect(screen.getByText(/your neighbourhood/i)).toBeInTheDocument();

    // Services grid
    expect(screen.getByText('Our Services')).toBeInTheDocument();

    // Price calculator
    expect(screen.getByText('Printing Price Calculator')).toBeInTheDocument();

    // Testimonials
    expect(screen.getByText('What Our Clients Say')).toBeInTheDocument();

    // Footer
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByText('38 Libertas Building')).toBeInTheDocument();
  });

  it('renders in light mode by default', () => {
    render(<App />);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('toggles to dark mode and back without errors', async () => {
    const user = userEvent.setup();
    render(<App />);

    const toggleButton = screen.getByRole('button', { name: /switch to dark mode/i });

    // Switch to dark mode
    await act(async () => {
      await user.click(toggleButton);
    });
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    // All sections still present
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();

    // Switch back to light mode
    const lightToggle = screen.getByRole('button', { name: /switch to light mode/i });
    await act(async () => {
      await user.click(lightToggle);
    });
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    // All sections still present
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
