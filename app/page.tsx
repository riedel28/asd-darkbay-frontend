import { getAuctions } from '@/lib/auctionsService';
import { AuctionCard } from './auction-card';
import { AuctionListPagination } from './auction-list-pagination';

export default async function Home(props: PageProps<'/'>) {
  const { page, limit } = await props.searchParams;
  const { data: auctions, meta } = await getAuctions({
    page: Number(page ?? 1),
    limit: Number(limit ?? 5)
  });

  return (
    <div className="p-6">
      <main>
        <div className="container mx-auto max-w-lg">
          <h1 className="text-xl font-bold mb-4">Auctions</h1>
          <div className="space-y-4">
            {auctions.map(auction => (
              <AuctionCard key={auction.id} auction={auction} />
            ))}
          </div>

          <AuctionListPagination meta={meta} />
        </div>
      </main>
    </div>
  );
}
