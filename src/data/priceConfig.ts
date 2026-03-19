export interface PriceConfig {
  bw: number;   // price per page B&W
  color: number; // price per page Color
}

export type PrintType = 'bw' | 'color';

export const priceConfig: PriceConfig = {
  bw: 2.00,    // ZAR per page
  color: 5.00, // ZAR per page
};
