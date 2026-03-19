import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Header } from '../Header';
import { ThemeProvider } from '../../context/ThemeContext';

function renderHeader() {
  return render(
    <ThemeProvider>
      <Header />
    </ThemeProvider>
  );
}

describe('Header', () => {
  it('renders logo text "Stellies iCafe"', () => {
    renderHeader();
    expect(screen.getByText('Stellies iCafe')).toBeInTheDocument();
  });

  it('renders semantic header and nav elements', () => {
    const { container } = renderHeader();
    expect(container.querySelector('header')).toBeInTheDocument();
    expect(container.querySelector('nav[aria-label="Main navigation"]')).toBeInTheDocument();
  });

  it('renders desktop navigation links', () => {
    renderHeader();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    expect(screen.getByText('Testimonials')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('navigation links use smooth scroll anchors', () => {
    renderHeader();
    const servicesLink = screen.getByText('Services');
    expect(servicesLink).toHaveAttribute('href', '#services');
    expect(screen.getByText('Pricing')).toHaveAttribute('href', '#pricing');
    expect(screen.getByText('Testimonials')).toHaveAttribute('href', '#testimonials');
    expect(screen.getByText('Contact')).toHaveAttribute('href', '#contact');
  });

  it('renders ThemeToggle button', () => {
    renderHeader();
    expect(screen.getByLabelText(/switch to/i)).toBeInTheDocument();
  });

  it('renders hamburger menu button for mobile', () => {
    renderHeader();
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
  });

  it('applies glassmorphism classes to header', () => {
    const { container } = renderHeader();
    const header = container.querySelector('header');
    expect(header?.className).toContain('backdrop-blur-md');
    expect(header?.className).toContain('bg-white/70');
  });

  it('toggles mobile menu on hamburger click', async () => {
    const user = userEvent.setup();
    renderHeader();

    // Mobile nav should not be visible initially
    expect(screen.queryByLabelText('Mobile navigation')).not.toBeInTheDocument();

    // Click hamburger to open
    await user.click(screen.getByLabelText('Open menu'));
    expect(screen.getByLabelText('Mobile navigation')).toBeInTheDocument();

    // Click close to dismiss
    await user.click(screen.getByLabelText('Close menu'));
    expect(screen.queryByLabelText('Mobile navigation')).not.toBeInTheDocument();
  });

  it('closes mobile menu when a nav link is clicked', async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByLabelText('Open menu'));
    expect(screen.getByLabelText('Mobile navigation')).toBeInTheDocument();

    // Click a mobile nav link
    const mobileLinks = screen.getByLabelText('Mobile navigation').querySelectorAll('a');
    await user.click(mobileLinks[0]);

    expect(screen.queryByLabelText('Mobile navigation')).not.toBeInTheDocument();
  });
});
