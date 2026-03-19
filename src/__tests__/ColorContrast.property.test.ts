import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';

/**
 * Feature: stellies-icafe-redesign, Property 9: Color contrast compliance
 *
 * **Validates: Requirements 10.5**
 *
 * For any text color and background color pair defined in the application's
 * theme configuration, the WCAG contrast ratio should be at least 4.5:1.
 */

/**
 * Parse a hex color string (#RRGGBB) into [r, g, b] values (0-255).
 */
function parseHex(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  return [
    parseInt(clean.substring(0, 2), 16),
    parseInt(clean.substring(2, 4), 16),
    parseInt(clean.substring(4, 6), 16),
  ];
}

/**
 * Calculate relative luminance per WCAG 2.0 formula.
 * https://www.w3.org/TR/WCAG20/#relativeluminancedef
 */
function relativeLuminance(hex: string): number {
  const [r, g, b] = parseHex(hex).map((c) => {
    const sRGB = c / 255;
    return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculate WCAG contrast ratio between two colors.
 * https://www.w3.org/TR/WCAG20/#contrast-ratiodef
 */
function contrastRatio(color1: string, color2: string): number {
  const l1 = relativeLuminance(color1);
  const l2 = relativeLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Theme color pairs used in the application for normal-sized text.
 * Large text (≥18pt or ≥14pt bold) only requires 3:1 per WCAG AA.
 * Normal text requires 4.5:1.
 */
const normalTextColorPairs: Array<{
  name: string;
  textColor: string;
  bgColor: string;
}> = [
  // Light mode pairs — normal text
  { name: 'Light: gray-900 on white', textColor: '#111827', bgColor: '#ffffff' },
  { name: 'Light: gray-700 on white', textColor: '#374151', bgColor: '#ffffff' },
  { name: 'Light: gray-600 on white', textColor: '#4b5563', bgColor: '#ffffff' },
  { name: 'Light: white on stellies-green-dark (CTA)', textColor: '#ffffff', bgColor: '#007a29' },

  // Dark mode pairs — normal text
  { name: 'Dark: dark-text on dark-bg', textColor: '#f1f5f9', bgColor: '#0f172a' },
  { name: 'Dark: dark-text on dark-surface', textColor: '#f1f5f9', bgColor: '#1e293b' },
  { name: 'Dark: dark-muted on dark-bg', textColor: '#94a3b8', bgColor: '#0f172a' },
  { name: 'Dark: dark-muted on dark-surface', textColor: '#94a3b8', bgColor: '#1e293b' },
];

/**
 * Large text color pairs (headings, logo, bold accent text ≥14pt bold or ≥18pt).
 * WCAG AA requires only 3:1 for large text.
 */
const largeTextColorPairs: Array<{
  name: string;
  textColor: string;
  bgColor: string;
}> = [
  { name: 'Light: stellies-green on white (logo/heading)', textColor: '#009933', bgColor: '#ffffff' },
  { name: 'Dark: stellies-green on dark-bg (logo/heading)', textColor: '#009933', bgColor: '#0f172a' },
  { name: 'Dark: stellies-green on dark-surface (logo/heading)', textColor: '#009933', bgColor: '#1e293b' },
];

describe('Property 9: Color contrast compliance', () => {
  it('all normal text color pairs meet WCAG 4.5:1 contrast ratio', () => {
    const pairArb = fc.constantFrom(...normalTextColorPairs);

    fc.assert(
      fc.property(pairArb, (pair) => {
        const ratio = contrastRatio(pair.textColor, pair.bgColor);
        if (ratio < 4.5) {
          throw new Error(
            `"${pair.name}" fails contrast: ${ratio.toFixed(2)}:1 (need ≥ 4.5:1). ` +
              `Text: ${pair.textColor}, BG: ${pair.bgColor}`,
          );
        }
      }),
      { numRuns: 100 },
    );
  });

  it('all large text color pairs meet WCAG 3:1 contrast ratio', () => {
    const pairArb = fc.constantFrom(...largeTextColorPairs);

    fc.assert(
      fc.property(pairArb, (pair) => {
        const ratio = contrastRatio(pair.textColor, pair.bgColor);
        if (ratio < 3) {
          throw new Error(
            `"${pair.name}" fails large text contrast: ${ratio.toFixed(2)}:1 (need ≥ 3:1). ` +
              `Text: ${pair.textColor}, BG: ${pair.bgColor}`,
          );
        }
      }),
      { numRuns: 100 },
    );
  });

  it('contrastRatio helper returns correct values for known pairs', () => {
    // Black on white should be 21:1
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 0);
    // Same color should be 1:1
    expect(contrastRatio('#ffffff', '#ffffff')).toBeCloseTo(1, 0);
  });
});
