import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function AuctionCardSkeleton() {
  return (
    <Card aria-hidden="true" className="h-full min-w-0">
      <CardHeader className="min-w-0 gap-3">
        <div className="flex items-center justify-between gap-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-5 w-12" />
        </div>
        <CardTitle className="flex items-center gap-2 pr-2">
          <Skeleton className="h-6 w-56 max-w-full" />
        </CardTitle>
        <CardDescription className="space-y-2 pt-1">
          <Skeleton className="h-4 w-full" />
        </CardDescription>
        <CardAction className="space-y-1">
          <Skeleton className="ml-auto h-3 w-16" />
          <Skeleton className="h-5 w-24" />
        </CardAction>
      </CardHeader>

      <CardContent>
        <div className="grid min-w-0 grid-cols-1 gap-px overflow-hidden rounded-sm border border-border/70 bg-border/70 sm:grid-cols-2">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="space-y-1.5 bg-background/90 px-3 py-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-4 w-28 max-w-full" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function Loading() {
  return (
    <div className="mx-auto w-full min-w-0 max-w-4xl space-y-5">
      <section className="min-w-0 rounded-sm border border-border/80 bg-card/70 p-4 shadow-[0_18px_60px_oklch(0_0_0_/_0.22)]">
        <div className="space-y-3">
          <Skeleton className="h-9 w-36 max-w-full" />
          <Skeleton className="h-4 w-64 max-w-full" />
        </div>
      </section>

      <div className="grid min-w-0 gap-3 md:grid-cols-2">
        {Array.from({ length: 5 }, (_, index) => (
          <AuctionCardSkeleton key={index} />
        ))}
      </div>

      <div className="mt-6 flex flex-col items-start justify-between gap-4 border border-border/80 bg-card/70 p-3 sm:flex-row sm:items-center">
        <Skeleton className="h-8 w-8" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
}
