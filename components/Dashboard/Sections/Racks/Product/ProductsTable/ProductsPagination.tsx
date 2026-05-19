"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ProductsPaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    startIndex: number;
    itemsPerPage: number;

    onPageChange: (value: number | ((prev: number) => number)) => void;
}

export default function ProductsPagination({
    currentPage,
    totalPages,
    totalItems,
    startIndex,
    itemsPerPage,
    onPageChange,
}: ProductsPaginationProps) {
    return (
        <div className="flex items-center justify-between border border-border bg-muted px-6 py-4 rounded-xl">
            <div className="text-sm font-medium text-muted-foreground">
                Showing {totalItems === 0 ? 0 : startIndex + 1}-
                {Math.min(startIndex + itemsPerPage, totalItems)} of{" "}
                {totalItems} items
            </div>

            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground"
                    onClick={() =>
                        onPageChange((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground"
                    onClick={() =>
                        onPageChange((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages || totalPages === 0}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
