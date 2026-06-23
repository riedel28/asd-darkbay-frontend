import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink
} from '@/components/ui/pagination';
import type { PaginationMeta } from '@/lib/auctionsService';

export function AuctionListPagination({ meta }: { meta: PaginationMeta }) {
  return (
    <div className="mt-6 flex flex-col items-start justify-between gap-4 border border-border/80 rounded-sm bg-card/70 p-3 sm:flex-row sm:items-center">
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
                  className="font-mono"
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          })}
        </PaginationContent>
      </Pagination>

      <div className="flex items-center gap-1" aria-label="Items per page">
        <span className="mr-1 font-mono text-sm text-muted-foreground">
          Per page
        </span>
        {[3, 5, 10].map(pageSize => (
          <PaginationLink
            key={pageSize}
            href={`/?page=1&limit=${pageSize}`}
            isActive={pageSize === meta.limit}
            aria-label={`Show ${pageSize} items per page`}
            className="font-mono"
          >
            {pageSize}
          </PaginationLink>
        ))}
      </div>
    </div>
  );
}
