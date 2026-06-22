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

  return (
    <main className="p-6">
      <div className="container mx-auto max-w-2xl space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeftIcon className="size-4" aria-hidden="true" />
          All auctions
        </Link>

        <Card>
          <CardHeader className="gap-3 border-b pb-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <Badge variant="secondary" className="capitalize">
                  {auction.status}
                </Badge>
                <CardTitle className="text-2xl">{auction.title}</CardTitle>
              </div>

              <div className="shrink-0 text-right">
                <span className="block text-xs text-muted-foreground">
                  Current bid
                </span>
                <strong className="text-2xl tabular-nums">
                  {currencyFormatter.format(auction.currentPrice)}
                </strong>
              </div>
            </div>

            <CardDescription className="max-w-xl leading-relaxed">
              {auction.description}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4">
              <div>
                <dt className="text-xs text-muted-foreground">
                  Starting price
                </dt>
                <dd className="mt-1 font-medium tabular-nums">
                  {currencyFormatter.format(auction.startingPrice)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Seller</dt>
                <dd className="mt-1 font-medium">{auction.seller}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Ends</dt>
                <dd className="mt-1 font-medium">
                  <time dateTime={auction.endDate}>
                    {dateFormatter.format(new Date(auction.endDate))}
                  </time>
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Listed</dt>
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
          <div className="mb-2 flex items-center justify-between">
            <div>
              <h2
                id="bid-history-title"
                className="flex items-center gap-2 text-lg font-semibold"
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
              <ol className="divide-y">
                {offers.map((offer, index) => (
                  <li
                    key={offer.id}
                    className="flex items-center justify-between gap-4 px-4 py-3"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                        {index + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-medium">{offer.bidder}</p>
                        <time
                          dateTime={offer.createdAt}
                          className="text-xs text-muted-foreground"
                        >
                          {dateFormatter.format(new Date(offer.createdAt))}
                        </time>
                      </div>
                    </div>
                    <strong className="shrink-0 tabular-nums">
                      {currencyFormatter.format(offer.amount)}
                    </strong>
                  </li>
                ))}
              </ol>
            ) : (
              <div className="px-4 py-10 text-center">
                <p className="font-medium">No bids yet</p>
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
