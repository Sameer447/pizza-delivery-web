import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  itemLabel: string;
  onPageChange?: (page: number) => void;
};

export function Pagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  itemLabel,
  onPageChange,
}: PaginationProps) {
  const start = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);
  const goTo = (nextPage: number) =>
    onPageChange?.(Math.max(1, Math.min(totalPages, nextPage)));
  return (
    <div className="flex flex-col gap-3 border-t bg-surface-low p-3 text-body-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
      <span>
        Showing {start} to {end} of {totalItems} {itemLabel}
      </span>
      <div className="flex items-center gap-1">
        <button
          className="rounded border p-1.5 hover:bg-muted disabled:opacity-40"
          disabled={page <= 1}
          onClick={() => goTo(page - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1)
          .slice(Math.max(0, page - 2), Math.min(totalPages, page + 1))
          .map((number) => (
            <button
              key={number}
              className={
                number === page
                  ? "rounded bg-primary px-3 py-1.5 font-medium text-white"
                  : "rounded border px-3 py-1.5 hover:bg-muted"
              }
              onClick={() => goTo(number)}
              aria-current={number === page ? "page" : undefined}
            >
              {number}
            </button>
          ))}
        <button
          className="rounded border p-1.5 hover:bg-muted disabled:opacity-40"
          disabled={page >= totalPages}
          onClick={() => goTo(page + 1)}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
