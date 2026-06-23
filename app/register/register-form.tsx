'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { UserPlusIcon } from 'lucide-react';
import { registerAction } from '@/lib/authActions';
import { registerSchema, type RegisterFormValues } from '@/lib/authSchemas';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export function RegisterForm() {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  });

  async function onSubmit(values: RegisterFormValues) {
    const formData = new FormData();

    formData.set('username', values.username);
    formData.set('password', values.password);

    try {
      await registerAction(formData);
    } catch {
      form.setError('root', {
        message: 'Unable to create an account with those details.'
      });
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FieldGroup>
        <Controller
          name="username"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Username</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="text"
                autoComplete="username"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Password</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="password"
                autoComplete="new-password"
                aria-invalid={fieldState.invalid}
              />
              <FieldDescription>Use at least 8 characters.</FieldDescription>
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

      <Button
        type="submit"
        className="w-full"
        disabled={form.formState.isSubmitting}
      >
        <UserPlusIcon data-icon="inline-start" aria-hidden="true" />
        {form.formState.isSubmitting ? 'Creating account...' : 'Create account'}
      </Button>
    </form>
  );
}
