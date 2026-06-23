'use server';

import { revalidatePath } from 'next/cache';
import {
  addAuctionSchema,
  type AddAuctionFormInput
} from '@/lib/auctionSchemas';
import { fetchAPI } from '@/lib/fetchAPI';
import type { Auction } from '@/lib/auctionsService';

export async function createAuctionAction(values: AddAuctionFormInput) {
  const auction = addAuctionSchema.parse(values);

  const response = await fetchAPI('/auctions', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(auction),
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error(
      `DarkBay create auction request failed: ${response.status} ${response.statusText}`
    );
  }

  const createdAuction = (await response.json()) as Auction;

  revalidatePath('/');

  return createdAuction;
}
