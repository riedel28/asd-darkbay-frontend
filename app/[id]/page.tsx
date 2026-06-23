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

export default async function AuctionDetailsPage(props: PageProps<'/[id]'>) {
  const { id } = await props.params;
  const [auction, offers] = await Promise.all([
    getAuctionById(id),
    getAuctionOffers(id)
  ]);
  const isOpen = auction.status === 'open';

  return (
    <main className="px-4 py-6 sm:px-6 lg:py-8">
      <div className="container mx-auto max-w-5xl space-y-5">
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
                <CardTitle className="font-mono text-2xl sm:text-3xl">
                  {auction.title}
                </CardTitle>
              </div>

              <div className="shrink-0 border border-primary/40 bg-primary/10 px-4 py-3 text-left shadow-[0_0_30px_oklch(0.734_0.118_200.34_/_0.14)] sm:text-right">
                <span className="block font-mono text-xs text-muted-foreground">
                  Current bid
                </span>
                <strong className="font-mono text-2xl text-primary tabular-nums">
                  {currencyFormatter.format(auction.currentPrice)}
                </strong>
              </div>
            </div>

            <CardDescription className="max-w-3xl leading-relaxed">
              {auction.description}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <dl className="grid gap-px overflow-hidden rounded-sm border border-border/80 bg-border/80 sm:grid-cols-4">
              <div className="bg-background/85 px-3 py-3">
                <dt className="font-mono text-xs text-muted-foreground">
                  Reserve
                </dt>
                <dd className="mt-1 font-mono font-medium tabular-nums">
                  {currencyFormatter.format(auction.startingPrice)}
                </dd>
              </div>
              <div className="bg-background/85 px-3 py-3">
                <dt className="font-mono text-xs text-muted-foreground">
                  Vendor
                </dt>
                <dd className="mt-1 font-medium">{auction.seller}</dd>
              </div>
              <div className="bg-background/85 px-3 py-3">
                <dt className="font-mono text-xs text-muted-foreground">
                  Closes
                </dt>
                <dd className="mt-1 font-medium">
                  <time dateTime={auction.endDate}>
                    {dateFormatter.format(new Date(auction.endDate))}
                  </time>
                </dd>
              </div>
              <div className="bg-background/85 px-3 py-3">
                <dt className="font-mono text-xs text-muted-foreground">
                  Posted
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

        <section aria-labelledby="bid-history-title">
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

          <Card className="gap-0 py-0">
            {offers.length > 0 ? (
              <ol className="divide-y divide-border/80">
                {offers.map((offer, index) => (
                  <li
                    key={offer.id}
                    className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-3 transition hover:bg-muted/40"
                  >
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-sm border border-border bg-muted font-mono text-xs font-semibold text-muted-foreground">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-medium">{offer.bidder}</p>
                      <time
                        dateTime={offer.createdAt}
                        className="font-mono text-xs text-muted-foreground"
                      >
                        {dateFormatter.format(new Date(offer.createdAt))}
                      </time>
                    </div>
                    <strong className="shrink-0 font-mono text-primary tabular-nums">
                      {currencyFormatter.format(offer.amount)}
                    </strong>
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
    </main>
  );
}
