import { Auction } from '@/lib/auctionsService';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const currencyFormatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR'
});

const dateFormatter = new Intl.DateTimeFormat('de-DE', {
  dateStyle: 'medium',
  timeStyle: 'short'
});

export function AuctionCard({ auction }: { auction: Auction }) {
  return (
    <Card key={auction.id}>
      <CardHeader className="gap-2">
        <CardTitle className="flex flex-row flex-wrap items-center gap-2 pr-2">
          {auction.title}
          <Badge variant="secondary" className="capitalize">
            {auction.status}
          </Badge>
        </CardTitle>

        <CardDescription className="leading-relaxed">
          {auction.description}
        </CardDescription>
        <CardAction className="text-right">
          <span className="block text-xs font-normal text-muted-foreground">
            Current bid
          </span>
          {currencyFormatter.format(auction.currentPrice)}
        </CardAction>
      </CardHeader>

      <CardContent>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-3 border-t pt-4">
          <div>
            <dt className="text-xs text-muted-foreground">Starting price</dt>
            <dd className="mt-0.5 font-medium tabular-nums">
              {currencyFormatter.format(auction.startingPrice)}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Seller</dt>
            <dd className="mt-0.5 font-medium">{auction.seller}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Ends</dt>
            <dd className="mt-0.5 font-medium">
              <time dateTime={auction.endDate}>
                {dateFormatter.format(new Date(auction.endDate))}
              </time>
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Listed</dt>
            <dd className="mt-0.5 font-medium">
              <time dateTime={auction.createdAt}>
                {dateFormatter.format(new Date(auction.createdAt))}
              </time>
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
