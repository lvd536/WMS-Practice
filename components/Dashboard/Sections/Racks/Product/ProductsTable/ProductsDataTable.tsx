"use client";

import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { ICategory, IRackProduct } from "@/types/warehouse.types";

import ProductTableRow from "./ProductTableRow";

interface ProductsDataTableProps {
    products: IRackProduct[];
    categories: ICategory[];
    canEdit: boolean;

    onEdit: (product: IRackProduct) => void;
    onMove: (product: IRackProduct) => void;
    onHistory: (product: IRackProduct) => void;
    onDelete: (product: IRackProduct) => void;
}

export default function ProductsDataTable({
    products,
    categories,
    canEdit,
    onEdit,
    onMove,
    onHistory,
    onDelete,
}: ProductsDataTableProps) {
    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <Table>
                <TableHeader className="bg-[#edf2fa] hover:bg-[#edf2fa]">
                    <TableRow className="border-b-slate-200">
                        <TableHead className="w-75 font-semibold text-slate-700">
                            PRODUCT NAME
                        </TableHead>

                        <TableHead className="font-semibold text-slate-700">
                            CATEGORY
                        </TableHead>

                        <TableHead className="font-semibold text-slate-700">
                            QUANTITY
                        </TableHead>

                        <TableHead className="font-semibold text-slate-700">
                            DIMENSIONS (L X W X H)
                        </TableHead>

                        <TableHead className="font-semibold text-slate-700">
                            WEIGHT
                        </TableHead>

                        <TableHead className="font-semibold text-slate-700">
                            CREATE DATE
                        </TableHead>

                        {canEdit && (
                            <TableHead className="text-right font-semibold text-slate-700">
                                ACTIONS
                            </TableHead>
                        )}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <ProductTableRow
                                key={product.id}
                                product={product}
                                categories={categories}
                                canEdit={canEdit}
                                onEdit={onEdit}
                                onMove={onMove}
                                onHistory={onHistory}
                                onDelete={onDelete}
                            />
                        ))
                    ) : (
                        <TableRow>
                            <td
                                colSpan={7}
                                className="h-32 text-center text-slate-500"
                            >
                                No products found matching your criteria.
                            </td>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
