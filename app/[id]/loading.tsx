import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function AuctionDetailsLoading() {
  return (
    <div className="mx-auto w-full min-w-0 max-w-4xl space-y-5">
      <Skeleton className="h-5 w-28" />

      <Card className="min-w-0">
        <CardHeader className="min-w-0 gap-4 border-b pb-4">
          <div className="flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-start">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-12" />
              </div>
              <Skeleton className="h-8 w-80 max-w-full" />
            </div>
            <div className="shrink-0 space-y-2 border border-primary/40 bg-primary/10 px-4 py-3">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-7 w-28" />
            </div>
          </div>
          <div className="max-w-3xl space-y-2">
            <Skeleton className="h-4 w-2/3" />
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid min-w-0 gap-px overflow-hidden rounded-sm border border-border/80 bg-border/80 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-2 bg-background/85 px-3 py-3">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-5 w-24" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <section>
        <div className="mb-2 flex items-center justify-between gap-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-5 w-20" />
        </div>

        <Card className="min-w-0 gap-0 py-0">
          <div className="divide-y divide-border/80">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-3"
              >
                <Skeleton className="size-7 shrink-0" />
                <div className="space-y-1">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-3 w-28" />
                </div>
                <Skeleton className="h-5 w-20 justify-self-end" />
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
