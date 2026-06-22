import { getAuctions } from '@/lib/auctionsService';
import { AuctionCard } from './auction-card';

export default async function Home() {
  const { data: auctions } = await getAuctions();

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
        </div>
      </main>
    </div>
  );
}
