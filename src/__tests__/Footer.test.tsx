import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '../components/Footer';

describe('Footer', () => {
  it('contains address text with Google Maps link', () => {
    render(<Footer />);
    const addressLink = screen.getByText('38 Libertas Building, Andringa & Banghoek, Stellenbosch');
    expect(addressLink).toBeInTheDocument();
    expect(addressLink.closest('a')).toHaveAttribute('href', expect.stringContaining('google.com/maps'));
    expect(addressLink.closest('a')).toHaveAttribute('target', '_blank');
  });

  it('contains email "icafe.stb@gmail.com" as mailto link', () => {
    render(<Footer />);
    const emailLink = screen.getByText('icafe.stb@gmail.com');
    expect(emailLink).toBeInTheDocument();
    expect(emailLink.closest('a')).toHaveAttribute('href', 'mailto:icafe.stb@gmail.com');
  });

  it('contains a WhatsApp link to wa.me/27845586640', () => {
    render(<Footer />);
    const whatsappLink = screen.getByText('WhatsApp').closest('a');
    expect(whatsappLink).toBeInTheDocument();
    expect(whatsappLink?.getAttribute('href')).toBe('https://wa.me/27845586640');
  });

  it('contains a phone number as tel: link', () => {
    render(<Footer />);
    const phoneLink = screen.getByText('+27 84 558 6680');
    expect(phoneLink).toBeInTheDocument();
    expect(phoneLink.closest('a')).toHaveAttribute('href', 'tel:+27845586680');
  });

  it('renders a Send Message button', () => {
    render(<Footer />);
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('renders the localization note', () => {
    render(<Footer />);
    expect(screen.getByText(/located right in the heart of stellenbosch/i)).toBeInTheDocument();
  });

  it('renders a semantic footer element with id="contact"', () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector('footer#contact');
    expect(footer).toBeInTheDocument();
  });

  it('renders social media icon links', () => {
    render(<Footer />);
    expect(screen.getByLabelText('Facebook')).toBeInTheDocument();
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument();
    expect(screen.getByLabelText('X (Twitter)')).toBeInTheDocument();
  });
});
