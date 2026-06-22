import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink
} from '@/components/ui/pagination';
import type { PaginationMeta } from '@/lib/auctionsService';

export function AuctionListPagination({ meta }: { meta: PaginationMeta }) {
  return (
    <div className="mt-6 flex items-center justify-between gap-4">
      <Pagination className="mx-0 w-auto justify-start">
        <PaginationContent>
          {Array.from({ length: meta.totalPages }, (_, index) => {
            const pageNumber = index + 1;

            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href={`/?page=${pageNumber}&limit=${meta.limit}`}
                  isActive={pageNumber === meta.page}
                  aria-label={`Go to page ${pageNumber}`}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          })}
        </PaginationContent>
      </Pagination>

      <div className="flex items-center gap-1" aria-label="Items per page">
        <span className="mr-1 text-sm text-muted-foreground">Per page</span>
        {[3, 5, 10].map(pageSize => (
          <PaginationLink
            key={pageSize}
            href={`/?page=1&limit=${pageSize}`}
            isActive={pageSize === meta.limit}
            aria-label={`Show ${pageSize} items per page`}
          >
            {pageSize}
          </PaginationLink>
        ))}
      </div>
    </div>
  );
}
