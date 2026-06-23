import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { getAuctionById, getAuctionOffers } from '@/lib/auctionsService';
import { dateFormatter, currencyFormatter } from '@/lib/format';
import { BidForm } from './bid-form';

export default async function AuctionDetailsPage(props: PageProps<'/[id]'>) {
  const { id } = await props.params;
  const [auction, offers] = await Promise.all([
    getAuctionById(id),
    getAuctionOffers(id)
  ]);
  const isOpen = auction.status === 'open';

  return (
    <div className="container mx-auto min-w-0 w-full max-w-4xl space-y-5">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 font-mono text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeftIcon className="size-4" aria-hidden="true" />
        Back to auctions
      </Link>

      <Card>
        <CardHeader className="gap-4 border-b pb-4">
          <div className="flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-start">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant={isOpen ? 'default' : 'destructive'}
                  className="capitalize"
                >
                  {auction.status}
                </Badge>
              </div>
              <CardTitle className="font-mono text-xl md:text-2xl">
                {auction.title}
              </CardTitle>
              <CardDescription className="max-w-3xl leading-relaxed">
                {auction.description}
              </CardDescription>
            </div>

            <div className="shrink-0 rounded-sm border border-primary/40 bg-primary/10 px-4 py-3 text-left shadow-[0_0_30px_oklch(0.734_0.118_200.34_/_0.14)] sm:text-right">
              <span className="block font-mono text-xs text-muted-foreground">
                Current bid
              </span>
              <strong className="font-mono text-2xl text-primary tabular-nums">
                {currencyFormatter.format(auction.currentPrice)}
              </strong>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <dl className="grid gap-px overflow-hidden rounded-sm border border-border/80 bg-border/80 sm:grid-cols-4">
            <div className="bg-background/85 px-3 py-3">
              <dt className="font-mono text-xs text-muted-foreground">
                Starting price
              </dt>
              <dd className="mt-1 font-mono font-medium tabular-nums">
                {currencyFormatter.format(auction.startingPrice)}
              </dd>
            </div>
            <div className="bg-background/85 px-3 py-3">
              <dt className="font-mono text-xs text-muted-foreground">
                Posted by
              </dt>
              <dd className="mt-1 font-medium">{auction.seller}</dd>
            </div>
            <div className="bg-background/85 px-3 py-3">
              <dt className="font-mono text-xs text-muted-foreground">Ends</dt>
              <dd className="mt-1 font-medium">
                <time dateTime={auction.endDate}>
                  {dateFormatter.format(new Date(auction.endDate))}
                </time>
              </dd>
            </div>
            <div className="bg-background/85 px-3 py-3">
              <dt className="font-mono text-xs text-muted-foreground">
                Started
              </dt>
              <dd className="mt-1 font-medium">
                <time dateTime={auction.createdAt}>
                  {dateFormatter.format(new Date(auction.createdAt))}
                </time>
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <BidForm
        auctionId={auction.id}
        currentPrice={auction.currentPrice}
        hasBids={offers.length > 0}
        isOpen={isOpen}
      />

      <section aria-labelledby="bid-history-title" className="min-w-0">
        <div className="mb-2 flex items-center justify-between gap-4">
          <div>
            <h2
              id="bid-history-title"
              className="flex items-center gap-2 font-mono text-lg font-semibold"
            >
              Bid history
            </h2>
          </div>
          <Badge variant="outline">
            {offers.length} {offers.length === 1 ? 'bid' : 'bids'}
          </Badge>
        </div>

        <Card className="min-w-0 gap-0 py-0">
          {offers.length > 0 ? (
            <ol className="divide-y divide-border/80">
              {offers.map((offer, index) => (
                <li
                  key={offer.id}
                  className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 px-4 py-3 transition hover:bg-muted/40 md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-4"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-sm border border-border bg-muted font-mono text-xs font-semibold text-muted-foreground">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <div className="flex gap-2">
                      <p className="truncate font-medium">{offer.bidder}</p>
                    </div>
                    <time
                      dateTime={offer.createdAt}
                      className="font-mono text-xs text-muted-foreground"
                    >
                      {dateFormatter.format(new Date(offer.createdAt))}
                    </time>
                  </div>
                  <div className="col-start-2 flex min-w-0 flex-row-reverse items-center justify-between gap-2 md:col-start-auto md:flex-col md:items-end md:justify-start md:gap-1.5">
                    {index === 0 && <Badge>Highest bid</Badge>}
                    <strong className="shrink-0 font-mono text-primary tabular-nums">
                      {currencyFormatter.format(offer.amount)}
                    </strong>
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <div className="px-4 py-10 text-center">
              <p className="font-mono font-medium">No bids yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                This auction has not received any bids.
              </p>
            </div>
          )}
        </Card>
      </section>
    </div>
  );
}
