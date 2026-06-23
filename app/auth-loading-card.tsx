import { AnchorIcon } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

type AuthLoadingCardProps = {
  titleWidth: string;
  descriptionWidth: string;
  footerWidth: string;
};

export function AuthLoadingCard({
  titleWidth,
  descriptionWidth,
  footerWidth
}: AuthLoadingCardProps) {
  return (
    <main
      className="flex min-h-[calc(100vh-88px)] items-center justify-center px-4 py-10"
      role="status"
      aria-label="Loading authentication form"
    >
      <Card className="w-full max-w-sm bg-card/90" aria-hidden="true">
        <CardHeader className="gap-2">
          <div className="mb-2 flex size-10 items-center justify-center rounded-sm border border-primary/40 bg-primary/10 text-primary">
            <AnchorIcon className="size-5" aria-hidden="true" />
          </div>
          <CardTitle>
            <Skeleton className={`h-8 ${titleWidth}`} />
          </CardTitle>
          <CardDescription>
            <Skeleton className={`h-4 ${descriptionWidth}`} />
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
            <Skeleton className={`h-5 ${footerWidth}`} />
          </div>
        </CardContent>
      </Card>
      <span className="sr-only">Loading authentication form</span>
    </main>
  );
}
