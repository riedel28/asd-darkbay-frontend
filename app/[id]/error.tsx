'use client';

import Link from 'next/link';
import { ArrowLeftIcon, RefreshCwIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface AuctionDetailsErrorProps {
  error: Error;
  reset: () => void;
}

export default function AuctionDetailsError({
  error,
  reset
}: AuctionDetailsErrorProps) {
  return (
    <section
      className="w-full max-w-md rounded-xl border bg-card p-8 text-center"
      aria-labelledby="auction-error-title"
    >
      <h1 id="auction-error-title" className="text-2xl font-semibold">
        We couldn&apos;t load this auction
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">{error.message}</p>

      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        <Button onClick={reset}>
          <RefreshCwIcon aria-hidden="true" />
          Try again
        </Button>
        <Link
          href="/"
          className="inline-flex h-9 items-center justify-center gap-2 rounded-md border bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <ArrowLeftIcon className="size-4" aria-hidden="true" />
          Back to auctions
        </Link>
      </div>
    </section>
  );
}
