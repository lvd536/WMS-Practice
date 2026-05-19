"use client";

import { useMemo, useState } from "react";

export function useProductsPagination<T>(items: T[], itemsPerPage = 5) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalItems = items.length;

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;

    const paginatedProducts = useMemo(() => {
        return items.slice(startIndex, startIndex + itemsPerPage);
    }, [items, startIndex, itemsPerPage]);

    return {
        currentPage,
        setCurrentPage,
        totalItems,
        totalPages,
        startIndex,
        itemsPerPage,
        paginatedProducts,
    };
}
