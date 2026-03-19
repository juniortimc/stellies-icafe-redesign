import { describe, it } from 'vitest';
import { render, cleanup, within } from '@testing-library/react';
import * as fc from 'fast-check';
import { ServiceCard } from '../components/ServiceCard';
import type { Service } from '../data/services';

/**
 * Feature: stellies-icafe-redesign, Property 3: Service card renders all required fields
 *
 * **Validates: Requirements 5.2**
 */

const VALID_ICONS = [
  'Printer', 'Camera', 'PenTool', 'Shirt', 'Wrench', 'Globe',
  'Truck', 'Wifi', 'GraduationCap', 'Monitor', 'ShieldCheck',
  'FileText', 'FileCheck', 'Briefcase', 'Coffee', 'Palette',
];

// Generate trimmed alphanumeric strings (no leading/trailing whitespace)
const safeText = fc
  .string({ minLength: 3, maxLength: 30, unit: 'grapheme' })
  .map((s) => s.replace(/[^a-zA-Z0-9 ]/g, 'a').trim())
  .filter((s) => s.length >= 3);

describe('Property 3: Service card renders all required fields', () => {
  it('renders title and description for any Service', () => {
    const serviceArb: fc.Arbitrary<Service> = fc
      .tuple(safeText, safeText, fc.constantFrom(...VALID_ICONS))
      .filter(([title, desc]) => title !== desc)
      .map(([title, description, icon]) => ({
        id: title.toLowerCase().replace(/\s+/g, '-'),
        title,
        description,
        icon,
      }));

    fc.assert(
      fc.property(serviceArb, (service) => {
        cleanup();
        const { container, unmount } = render(<ServiceCard service={service} />);
        const view = within(container);

        // Title should be rendered in an h3
        const titleEl = view.getByRole('heading', { level: 3 });
        const titleMatch = titleEl.textContent?.includes(service.title);
        if (!titleMatch) {
          unmount();
          throw new Error(
            `Title "${service.title}" not found in heading. Got: "${titleEl.textContent}"`,
          );
        }

        // Description should be present in the rendered output
        const allText = container.textContent ?? '';
        if (!allText.includes(service.description)) {
          unmount();
          throw new Error(
            `Description "${service.description}" not found in rendered output`,
          );
        }

        unmount();
      }),
      { numRuns: 100 },
    );
  });
});
