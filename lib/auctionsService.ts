export type AuctionStatus = 'open' | 'closed';

export interface Auction {
  id: string;
  title: string;
  description: string;
  startingPrice: number;
  currentPrice: number;
  endDate: string;
  createdAt: string;
  seller: string;
  status: AuctionStatus;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedAuctions {
  data: Auction[];
  meta: PaginationMeta;
}

export interface Offer {
  id: string;
  amount: number;
  createdAt: string;
  bidder: string;
  auctionId: string;
}

export interface GetAuctionsParams {
  page?: number;
  limit?: number;
}

export async function getAuctions({
  page = 1,
  limit = 5
}: GetAuctionsParams = {}): Promise<PaginatedAuctions> {
  const url = new URL('/auctions', process.env.DARKBAY_API_URL);

  url.searchParams.set('page', String(page));
  url.searchParams.set('limit', String(limit));

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json'
    },
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error(
      `DarkBay auctions request failed: ${response.status} ${response.statusText}`
    );
  }

  const data = (await response.json()) as PaginatedAuctions;

  return data;
}

export async function getAuctionById(id: string): Promise<Auction> {
  const url = new URL(
    `/auctions/${encodeURIComponent(id)}`,
    process.env.DARKBAY_API_URL
  );
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json'
    },
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error(
      `DarkBay auction request failed: ${response.status} ${response.statusText}`
    );
  }

  const data = (await response.json()) as Auction;

  return data;
}

export async function getAuctionOffers(auctionId: string): Promise<Offer[]> {
  const url = new URL(
    `/auctions/${encodeURIComponent(auctionId)}/offers`,
    process.env.DARKBAY_API_URL
  );
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json'
    },
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error(
      `DarkBay bid history request failed: ${response.status} ${response.statusText}`
    );
  }

  const data = (await response.json()) as Offer[];

  return data;
}
