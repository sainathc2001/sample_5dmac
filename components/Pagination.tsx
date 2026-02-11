"use client";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex justify-end items-center gap-2 mt-4 text-sm">
      <span className="text-slate-600">
        {start}–{end} of {totalItems}
      </span>

      {Array.from({ length: totalPages }).map((_, i) => {
        const page = i + 1;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded ${
              page === currentPage
                ? "bg-blue-700 text-white"
                : "border hover:bg-slate-100"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() =>
          onPageChange(Math.min(currentPage + 1, totalPages))
        }
        disabled={currentPage === totalPages}
        className="px-2 py-1 border rounded disabled:opacity-50"
      >
        ›
      </button>
    </div>
  );
}
