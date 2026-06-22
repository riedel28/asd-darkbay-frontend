import { getAuctions } from '@/lib/auctionsService';
import { AuctionCard } from './auction-card';
import { AuctionListPagination } from './auction-list-pagination';
import Link from 'next/link';

export default async function Home(props: PageProps<'/'>) {
  const { page, limit } = await props.searchParams;
  const { data: auctions, meta } = await getAuctions({
    page: Number(page ?? 1),
    limit: Number(limit ?? 5)
  });

  return (
    <div className="p-6">
      <main>
        <div className="container mx-auto max-w-4xl space-y-6">
          <h1 className="text-xl font-bold mb-4">Auctions</h1>
          <div className="grid md:grid-cols-2 gap-4">
            {auctions.map(auction => (
              <Link key={auction.id} href={`/${auction.id}`} className="block">
                <AuctionCard key={auction.id} auction={auction} />
              </Link>
            ))}
          </div>

          <AuctionListPagination meta={meta} />
        </div>
      </main>
    </div>
  );
}
