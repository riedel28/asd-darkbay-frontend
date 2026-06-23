'use server';

import { revalidatePath } from 'next/cache';
import { fetchAPI } from '@/lib/fetchAPI';
import type { Offer } from '@/lib/auctionsService';
import {
  placeBidSchema,
  type PlaceBidFormInput
} from '@/lib/offerSchemas';

export async function placeBidAction(
  auctionId: string,
  values: PlaceBidFormInput
) {
  const bid = placeBidSchema.parse(values);

  const response = await fetchAPI(
    `/auctions/${encodeURIComponent(auctionId)}/offers`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bid),
      cache: 'no-store'
    }
  );

  if (!response.ok) {
    throw new Error(
      `DarkBay place bid request failed: ${response.status} ${response.statusText}`
    );
  }

  const offer = (await response.json()) as Offer;

  revalidatePath(`/${auctionId}`);
  revalidatePath('/');

  return offer;
}
