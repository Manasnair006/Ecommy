interface PaginationBarProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function PaginationBar({
    currentPage,
    totalPages,
    onPageChange
}: PaginationBarProps) {

    const getPages = (): (number | string)[] => {
        // If there aren't many pages, show everything
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        // Near the beginning
        if (currentPage <= 4) {
            return [
                1,
                2,
                3,
                4,
                5,
                "...",
                totalPages
            ];
        }

        // Near the end
        if (currentPage >= totalPages - 3) {
            return [
                1,
                "...",
                totalPages - 4,
                totalPages - 3,
                totalPages - 2,
                totalPages - 1,
                totalPages
            ];
        }

        // Somewhere in the middle
        return [
            1,
            "...",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "...",
            totalPages
        ];
    };

    const pages = getPages();

    return (
        <nav
            className="flex items-center justify-center gap-2 mt-8"
            aria-label="Pagination"
        >
            {/* Previous */}
            <button
                className="btn btn-outline btn-sm"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                ‹ Previous
            </button>

            {/* Pages */}
            <div className="flex items-center gap-1">
                {pages.map((page, index) => {

                    if (typeof page !== "number") {
                        return (
                            <span
                                key={`ellipsis-${index}`}
                                className="px-2 text-gray-400"
                            >
                                …
                            </span>
                        );
                    }

                    return (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            aria-current={
                                page === currentPage
                                    ? "page"
                                    : undefined
                            }
                            className={
                                page === currentPage
                                    ? "btn btn-primary btn-sm min-w-10"
                                    : "btn btn-outline btn-sm min-w-10"
                            }
                        >
                            {page}
                        </button>
                    );
                })}
            </div>

            {/* Next */}
            <button
                className="btn btn-outline btn-sm"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next ›
            </button>
        </nav>
    );
}