'use client';

import { RefreshCwIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className="flex flex-1 items-center justify-center p-6">
      <section
        className="w-full max-w-lg rounded-xl border bg-card p-8 text-center"
        aria-labelledby="error-title"
        aria-describedby="error-description"
      >
        <h1 id="error-title" className="text-2xl font-bold tracking-tight">
          Dark Bay is temporarily unreachable
        </h1>
        <p
          id="error-description"
          className="mx-auto mt-3 max-w-sm leading-relaxed text-muted-foreground"
        >
          {error.message}
        </p>

        <Button className="mt-6" size="lg" onClick={reset}>
          <RefreshCwIcon data-icon="inline-start" aria-hidden="true" />
          Try again
        </Button>
      </section>
    </main>
  );
}
