'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { PlusIcon } from 'lucide-react';
import { createAuctionAction } from '@/lib/auctionActions';
import {
  addAuctionSchema,
  type AddAuctionFormInput,
  type AddAuctionFormValues
} from '@/lib/auctionSchemas';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function AddAuctionDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const form = useForm<AddAuctionFormInput, unknown, AddAuctionFormValues>({
    resolver: zodResolver(addAuctionSchema),
    defaultValues: async () => ({
      title: '',
      description: '',
      startingPrice: 1,
      endDate: (() => {
        const date = new Date(Date.now() + 60 * 60 * 1000);

        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

        return date.toISOString().slice(0, 16);
      })()
    })
  });

  async function onSubmit(values: AddAuctionFormValues) {
    try {
      await createAuctionAction(values);
      form.reset();
      setOpen(false);
      router.refresh();
    } catch {
      form.setError('root', {
        message: 'Unable to create auction with those details.'
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button type="button" size="lg">
            <PlusIcon data-icon="inline-start" aria-hidden="true" />
            Add auction
          </Button>
        }
      />

      <DialogContent className="max-h-[calc(100vh-2rem)] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add auction</DialogTitle>
          <DialogDescription>
            Add title, description and price to create an auction
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FieldGroup className="gap-4">
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="text"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                  <Textarea
                    {...field}
                    id={field.name}
                    className="min-h-24 rounded-sm"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="startingPrice"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Starting price</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="number"
                    min="1"
                    step="0.01"
                    inputMode="decimal"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="endDate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Ends at</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="datetime-local"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          {form.formState.errors.root && (
            <FieldError errors={[form.formState.errors.root]} />
          )}

          <DialogFooter className="rounded-none">
            <DialogClose render={<Button type="button" variant="outline" />}>
              Cancel
            </DialogClose>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              <PlusIcon data-icon="inline-start" aria-hidden="true" />
              {form.formState.isSubmitting
                ? 'Creating auction...'
                : 'Add auction'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
