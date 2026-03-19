import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ServicesGrid } from '../components/ServicesGrid';
import { services } from '../data/services';

describe('ServicesGrid', () => {
  it('renders all 16 ServiceCard components', () => {
    render(<ServicesGrid />);

    // Each service card renders its title as an h3
    const titles = services.map((s) => screen.getByText(s.title));
    expect(titles).toHaveLength(16);
  });

  it('renders inside a semantic section element with id="services"', () => {
    const { container } = render(<ServicesGrid />);
    const section = container.querySelector('section#services');
    expect(section).toBeInTheDocument();
  });

  it('renders all service titles and descriptions', () => {
    render(<ServicesGrid />);

    for (const service of services) {
      expect(screen.getByText(service.title)).toBeInTheDocument();
      expect(screen.getByText(service.description)).toBeInTheDocument();
    }
  });
});
