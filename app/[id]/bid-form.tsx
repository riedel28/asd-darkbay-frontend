'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { placeBidAction } from '@/lib/offerActions';
import {
  placeBidSchema,
  type PlaceBidFormInput,
  type PlaceBidFormValues
} from '@/lib/offerSchemas';
import { currencyFormatter } from '@/lib/format';

interface BidFormProps {
  auctionId: string;
  currentPrice: number;
  hasBids: boolean;
  isOpen: boolean;
}

function getMinimumBid(currentPrice: number, hasBids: boolean) {
  return hasBids ? Number((currentPrice + 0.01).toFixed(2)) : currentPrice;
}

export function BidForm({
  auctionId,
  currentPrice,
  hasBids,
  isOpen
}: BidFormProps) {
  const router = useRouter();
  const minimumBid = getMinimumBid(currentPrice, hasBids);
  const form = useForm<PlaceBidFormInput, unknown, PlaceBidFormValues>({
    resolver: zodResolver(placeBidSchema),
    defaultValues: {
      amount: minimumBid
    }
  });

  async function onSubmit(values: PlaceBidFormValues) {
    if (values.amount < minimumBid) {
      form.setError('amount', {
        message: `Bid at least ${currencyFormatter.format(minimumBid)}.`
      });
      return;
    }

    try {
      await placeBidAction(auctionId, values);
      form.reset({
        amount: Number((values.amount + 0.01).toFixed(2))
      });
      router.refresh();
    } catch {
      form.setError('root', {
        message:
          'Unable to place that bid. The auction may be closed or the bid may no longer be high enough.'
      });
    }
  }

  return (
    <Card size="sm">
      <CardHeader className="border-b pb-3">
        <CardTitle className="font-mono">Place a bid</CardTitle>
        <CardDescription>
          {isOpen
            ? `Minimum bid: ${currencyFormatter.format(minimumBid)}`
            : 'This auction is closed.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3 sm:flex-row sm:items-end"
        >
          <Controller
            name="amount"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="flex-1">
                <FieldLabel htmlFor={field.name}>Bid amount</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="number"
                  min={minimumBid}
                  step="0.01"
                  inputMode="decimal"
                  disabled={!isOpen || form.formState.isSubmitting}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button
            type="submit"
            disabled={!isOpen || form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Placing bid...' : 'Place bid'}
          </Button>
        </form>

        {form.formState.errors.root && (
          <FieldError className="mt-3" errors={[form.formState.errors.root]} />
        )}
      </CardContent>
    </Card>
  );
}
