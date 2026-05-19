"use client";

import { ArrowRight } from "lucide-react";
import { IRackProduct } from "@/types/warehouse.types";

interface MoveProductSummaryProps {
    product: IRackProduct;
}

export default function MoveProductSummary({
    product,
}: MoveProductSummaryProps) {
    return (
        <div className="mb-4 flex items-center gap-4 rounded-lg border border-slate-100 bg-muted p-3">
            <div className="flex-1">
                <p className="font-semibold text-foreground">{product?.name}</p>
                <p className="text-xs text-muted-foreground">
                    Available: {product?.placement_quantity}
                </p>
            </div>

            <ArrowRight className="h-5 w-5 text-muted-foreground" />

            <div className="flex-1 text-right">
                <p className="text-sm font-medium text-primary">
                    Target Location
                </p>
            </div>
        </div>
    );
}
