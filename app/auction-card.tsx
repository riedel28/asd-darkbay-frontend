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
import { dateFormatter, currencyFormatter } from '@/lib/format';

export function AuctionCard({ auction }: { auction: Auction }) {
  const isOpen = auction.status === 'open';

  return (
    <Card
      key={auction.id}
      className="h-full transition hover:border-primary/55 hover:bg-card"
    >
      <CardHeader className="gap-3">
        <div className="flex items-center justify-between gap-3 font-mono text-xs text-muted-foreground">
          <Badge
            variant={isOpen ? 'default' : 'destructive'}
            className="capitalize"
          >
            {auction.status}
          </Badge>
        </div>
        <CardTitle className="flex flex-row flex-wrap items-center gap-2 pr-2">
          {auction.title}
        </CardTitle>

        <CardDescription className="line-clamp-2 leading-relaxed">
          {auction.description}
        </CardDescription>
        <CardAction className="text-right">
          <span className="block font-mono text-xs font-normal text-muted-foreground">
            Current bid
          </span>
          <span className="font-mono text-primary tabular-nums">
            {currencyFormatter.format(auction.currentPrice)}
          </span>
        </CardAction>
      </CardHeader>

      <CardContent>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border/70 bg-border/70">
          <div>
            <dt className="bg-background/90 px-3 pt-2 font-mono text-xs text-muted-foreground">
              Reserve
            </dt>
            <dd className="bg-background/90 px-3 pb-2 font-mono font-medium tabular-nums">
              {currencyFormatter.format(auction.startingPrice)}
            </dd>
          </div>
          <div>
            <dt className="bg-background/90 px-3 pt-2 font-mono text-xs text-muted-foreground">
              Vendor
            </dt>
            <dd className="truncate bg-background/90 px-3 pb-2 font-medium">
              {auction.seller}
            </dd>
          </div>
          <div>
            <dt className="bg-background/90 px-3 pt-2 font-mono text-xs text-muted-foreground">
              Closes
            </dt>
            <dd className="bg-background/90 px-3 pb-2 font-medium">
              <time dateTime={auction.endDate}>
                {dateFormatter.format(new Date(auction.endDate))}
              </time>
            </dd>
          </div>
          <div>
            <dt className="bg-background/90 px-3 pt-2 font-mono text-xs text-muted-foreground">
              Posted
            </dt>
            <dd className="bg-background/90 px-3 pb-2 font-medium">
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
