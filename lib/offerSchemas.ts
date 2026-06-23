import * as z from 'zod';

const bidAmountSchema = z
  .union([z.string(), z.number()])
  .transform(value => Number(value))
  .refine(Number.isFinite, 'Enter a valid bid amount.')
  .refine(value => value >= 1, 'Bid amount must be at least 1.');

export const placeBidSchema = z.object({
  amount: bidAmountSchema
});

export type PlaceBidFormInput = z.input<typeof placeBidSchema>;
export type PlaceBidFormValues = z.output<typeof placeBidSchema>;
