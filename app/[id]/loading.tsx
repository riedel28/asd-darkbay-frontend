import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function AuctionDetailsLoading() {
  return (
    <main
      className="p-6"
      role="status"
      aria-label="Loading auction details"
    >
      <div className="container mx-auto max-w-2xl space-y-6">
        <Skeleton className="h-5 w-28" />

        <Card>
          <CardHeader className="gap-3 border-b pb-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-7 w-56 max-w-full" />
              </div>
              <div className="shrink-0 space-y-1 text-right">
                <Skeleton className="ml-auto h-3 w-16" />
                <Skeleton className="h-7 w-24" />
              </div>
            </div>
            <div className="max-w-xl space-y-2">
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-3/5" />
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index}>
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="mt-1 h-5 w-20" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <section>
          <div className="mb-2 flex items-center justify-between">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-5 w-14 rounded-full" />
          </div>

          <Card className="gap-0 py-0">
            <div className="divide-y">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-4 px-4 py-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <Skeleton className="size-7 shrink-0 rounded-full" />
                    <div className="space-y-1">
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-3 w-28" />
                    </div>
                  </div>
                  <Skeleton className="h-5 w-20" />
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>

      <span className="sr-only">Loading auction details</span>
    </main>
  );
}
