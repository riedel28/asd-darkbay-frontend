import * as z from 'zod';

function toAuctionEndDateISOString(value: string) {
  if (/(Z|[+-]\d{2}:?\d{2})$/.test(value)) {
    return new Date(value).toISOString();
  }

  const [datePart, timePart = '00:00'] = value.split('T');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hour = '0', minute = '0', secondPart = '0'] = timePart.split(':');
  const [second = '0', millisecond = '0'] = secondPart.split('.');

  return new Date(
    year,
    month - 1,
    day,
    Number(hour),
    Number(minute),
    Number(second),
    Number(millisecond.padEnd(3, '0').slice(0, 3))
  ).toISOString();
}

export const addAuctionSchema = z.object({
  title: z.string().trim().min(3, 'Title must be at least 3 characters.'),
  description: z
    .string()
    .trim()
    .min(3, 'Description must be at least 3 characters.'),
  startingPrice: z.coerce
    .number<string | number>()
    .min(1, 'Enter a starting price'),
  endDate: z.iso
    .datetime({ local: true })
    .transform(toAuctionEndDateISOString)
});

export type AddAuctionFormInput = z.input<typeof addAuctionSchema>;
export type AddAuctionFormValues = z.output<typeof addAuctionSchema>;
