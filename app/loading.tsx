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
    <Card aria-hidden="true">
      <CardHeader className="gap-2">
        <CardTitle className="flex items-center gap-2 pr-2">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </CardTitle>
        <CardDescription className="space-y-2 pt-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </CardDescription>
        <CardAction className="space-y-1">
          <Skeleton className="ml-auto h-3 w-16" />
          <Skeleton className="h-5 w-20" />
        </CardAction>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 border-t pt-4">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="space-y-1.5">
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
    <div className="p-6" role="status" aria-label="Loading auctions">
      <main>
        <div className="container mx-auto max-w-4xl space-y-6">
          <Skeleton className="mb-4 h-7 w-24" />
          <div className="grid md:grid-cols-2 gap-4">
            {Array.from({ length: 3 }, (_, index) => (
              <AuctionCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </main>
      <span className="sr-only">Loading auctions</span>
    </div>
  );
}
