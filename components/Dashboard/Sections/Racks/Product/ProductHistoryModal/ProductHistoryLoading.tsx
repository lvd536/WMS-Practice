"use client";

import { Loader2 } from "lucide-react";

export default function ProductHistoryLoading() {
    return (
        <span className="flex items-center gap-2">
            <Loader2 className="mr-1 h-3 w-3 animate-spin" />
            Loading product history...
        </span>
    );
}
