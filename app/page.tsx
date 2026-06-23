import { getAuctions } from '@/lib/auctionsService';
import { AuctionCard } from './auction-card';
import { AuctionListPagination } from './auction-list-pagination';
import { AddAuctionDialog } from './add-auction-dialog';
import Link from 'next/link';

export default async function Home(props: PageProps<'/'>) {
  const { page, limit } = await props.searchParams;
  const { data: auctions, meta } = await getAuctions({
    page: Number(page ?? 1),
    limit: Number(limit ?? 5)
  });

  return (
    <div className="mx-auto w-full min-w-0 max-w-4xl space-y-5">
      <section className="min-w-0 rounded-sm border border-border/80 bg-card/70 p-4 shadow-[0_18px_60px_oklch(0_0_0_/_0.22)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <h1 className="font-mono text-2xl font-semibold text-foreground">
              Auctions
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Browse active lots and current bids.
            </p>
          </div>
          <AddAuctionDialog />
        </div>
      </section>

      <div className="grid min-w-0 gap-3 md:grid-cols-2">
        {auctions.map(auction => (
          <Link
            key={auction.id}
            href={`/${auction.id}`}
            className="block min-w-0"
          >
            <AuctionCard key={auction.id} auction={auction} />
          </Link>
        ))}
      </div>

      <AuctionListPagination meta={meta} />
    </div>
  );
}
