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

export async function getAuctions(): Promise<PaginatedAuctions> {
  const url = new URL('/auctions', process.env.DARKBAY_API_URL);
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
  const url = new URL(`/auctions/${id}`, process.env.DARKBAY_API_URL);
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
