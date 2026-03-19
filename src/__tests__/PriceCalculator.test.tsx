import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PriceCalculator, calculatePrice } from '../components/PriceCalculator';

describe('PriceCalculator', () => {
  it('renders inside a semantic section element with id="pricing"', () => {
    const { container } = render(<PriceCalculator />);
    const section = container.querySelector('section#pricing');
    expect(section).toBeInTheDocument();
  });

  it('displays R0.00 when zero pages are entered', async () => {
    const user = userEvent.setup();
    render(<PriceCalculator />);

    const input = screen.getByLabelText('Number of Pages');
    await user.type(input, '0');

    expect(screen.getByText('R0.00')).toBeInTheDocument();
  });

  it('does not display a price or error for empty string input', () => {
    render(<PriceCalculator />);

    // Default state: empty input, no price, no error
    expect(screen.queryByText(/^R\d/)).not.toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('shows error for whitespace-only input', async () => {
    const user = userEvent.setup();
    render(<PriceCalculator />);

    const input = screen.getByLabelText('Number of Pages');
    await user.type(input, '   ');

    // Whitespace-only should show error
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.queryByText('Estimated Total')).not.toBeInTheDocument();
  });

  it('handles large numbers correctly', async () => {
    const user = userEvent.setup();
    render(<PriceCalculator />);

    const input = screen.getByLabelText('Number of Pages');
    await user.type(input, '999999');

    // B&W default: 2.00 * 999999 = 1999998.00
    expect(screen.getByText('R1999998.00')).toBeInTheDocument();
  });
});

describe('calculatePrice', () => {
  it('returns R0.00 for zero pages', () => {
    const result = calculatePrice('bw', '0');
    expect(result.totalPrice).toBe(0);
    expect(result.error).toBeNull();
  });

  it('returns null totalPrice and null error for empty string', () => {
    const result = calculatePrice('bw', '');
    expect(result.totalPrice).toBeNull();
    expect(result.error).toBeNull();
  });

  it('returns error for whitespace-only input', () => {
    const result = calculatePrice('bw', '   ');
    expect(result.totalPrice).toBeNull();
    expect(result.error).not.toBeNull();
  });

  it('calculates correctly for large numbers', () => {
    const result = calculatePrice('color', '999999');
    expect(result.totalPrice).toBe(5 * 999999);
    expect(result.error).toBeNull();
  });

  it('rejects decimal input', () => {
    const result = calculatePrice('bw', '3.5');
    expect(result.totalPrice).toBeNull();
    expect(result.error).not.toBeNull();
  });

  it('rejects negative input', () => {
    const result = calculatePrice('bw', '-5');
    expect(result.totalPrice).toBeNull();
    expect(result.error).toBe('Page count cannot be negative.');
  });
});
