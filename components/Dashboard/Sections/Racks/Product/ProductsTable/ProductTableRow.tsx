"use client";

import { TableCell, TableRow } from "@/components/ui/table";

import { ICategory, IRackProduct } from "@/types/warehouse.types";

import ProductActionsDropdown from "./ProductActionsDropdown";

import { getCategoryStyles } from "@/utils/product-category.utils";
import { formatProductDate } from "@/utils/product-date.utils";

interface ProductTableRowProps {
    product: IRackProduct;
    categories: ICategory[];
    canEdit: boolean;

    onEdit: (product: IRackProduct) => void;
    onMove: (product: IRackProduct) => void;
    onHistory: (product: IRackProduct) => void;
    onDelete: (product: IRackProduct) => void;
}

export default function ProductTableRow({
    product,
    categories,
    canEdit,
    onEdit,
    onMove,
    onHistory,
    onDelete,
}: ProductTableRowProps) {
    const category = categories.find((c) => c.id === product.category_id);

    const { icon: Icon, color } = getCategoryStyles(category?.name);

    return (
        <TableRow className="hover:bg-muted/50">
            <TableCell>
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                    </div>

                    <div className="flex flex-col">
                        <span className="font-semibold text-foreground">
                            {product.name}
                        </span>

                        <span className="text-xs uppercase text-muted-foreground">
                            SKU: PRD-{product.id}
                        </span>
                    </div>
                </div>
            </TableCell>

            <TableCell>
                <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase ${color}`}
                >
                    {category?.name || "Unknown"}
                </span>
            </TableCell>

            <TableCell className="font-semibold text-foreground">
                {product.quantity}
            </TableCell>

            <TableCell className="text-sm text-muted-foreground">
                {product.length} x {product.width} x {product.height}
            </TableCell>

            <TableCell className="text-sm text-muted-foreground">
                {product.weight} lbs
            </TableCell>

            <TableCell className="text-sm text-muted-foreground">
                {formatProductDate(product.created_at)}
            </TableCell>

            {canEdit && (
                <TableCell className="text-right">
                    <ProductActionsDropdown
                        product={product}
                        onEdit={onEdit}
                        onMove={onMove}
                        onHistory={onHistory}
                        onDelete={onDelete}
                    />
                </TableCell>
            )}
        </TableRow>
    );
}
