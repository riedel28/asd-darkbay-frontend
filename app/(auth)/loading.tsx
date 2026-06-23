import { AnchorIcon } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function AuthLoading() {
  return (
    <Card className="w-full max-w-sm bg-card/90" aria-hidden="true">
      <CardHeader className="gap-2">
        <div className="mb-2 flex size-10 items-center justify-center rounded-sm border border-primary/40 bg-primary/10 text-primary">
          <AnchorIcon className="size-5" aria-hidden="true" />
        </div>
        <CardTitle>
          <Skeleton className="h-8 w-36" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-64 max-w-full" />
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-full" />
          </div>
          <Skeleton className="h-9 w-full" />
        </div>

        <div className="mt-5 flex justify-center">
          <Skeleton className="h-5 w-44" />
        </div>
      </CardContent>
    </Card>
  );
}
