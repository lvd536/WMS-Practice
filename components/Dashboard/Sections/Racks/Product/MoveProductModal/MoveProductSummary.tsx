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
        <div className="mb-4 flex items-center gap-4 rounded-lg border border-slate-100 bg-slate-50 p-3">
            <div className="flex-1">
                <p className="font-semibold text-slate-900">{product?.name}</p>
                <p className="text-xs text-slate-500">
                    Available: {product?.placement_quantity}
                </p>
            </div>

            <ArrowRight className="h-5 w-5 text-slate-400" />

            <div className="flex-1 text-right">
                <p className="text-sm font-medium text-indigo-600">
                    Target Location
                </p>
            </div>
        </div>
    );
}
