import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ThemeProvider } from '../context/ThemeContext';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { ServicesGrid } from '../components/ServicesGrid';
import { PriceCalculator } from '../components/PriceCalculator';
import { TestimonialCarousel } from '../components/TestimonialCarousel';
import { Footer } from '../components/Footer';

/**
 * Unit tests for semantic HTML structure and lazy-loading attributes.
 *
 * **Validates: Requirements 10.1, 10.2**
 */

function renderAllSections() {
  return render(
    <ThemeProvider>
      <Header />
      <main>
        <HeroSection />
        <ServicesGrid />
        <PriceCalculator />
        <TestimonialCarousel />
      </main>
      <Footer />
    </ThemeProvider>,
  );
}

describe('Semantic HTML structure', () => {
  it('page contains a <header> element', () => {
    const { container } = renderAllSections();
    expect(container.querySelector('header')).not.toBeNull();
  });

  it('page contains a <nav> element', () => {
    const { container } = renderAllSections();
    expect(container.querySelector('nav')).not.toBeNull();
  });

  it('page contains <section> elements', () => {
    const { container } = renderAllSections();
    const sections = container.querySelectorAll('section');
    expect(sections.length).toBeGreaterThanOrEqual(1);
  });

  it('page contains a <footer> element', () => {
    const { container } = renderAllSections();
    expect(container.querySelector('footer')).not.toBeNull();
  });
});

describe('Lazy-loading attributes', () => {
  it('all <img> elements have loading="lazy" attribute', () => {
    const { container } = renderAllSections();
    const images = container.querySelectorAll('img');

    // There should be at least the hero image
    expect(images.length).toBeGreaterThanOrEqual(1);

    images.forEach((img) => {
      expect(img).toHaveAttribute('loading', 'lazy');
    });
  });

  it('HeroSection image has loading="lazy"', () => {
    const { container } = render(
      <ThemeProvider>
        <HeroSection />
      </ThemeProvider>,
    );
    const img = container.querySelector('img');
    expect(img).not.toBeNull();
    expect(img).toHaveAttribute('loading', 'lazy');
  });
});
