"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { IProductInventoryMovement } from "@/types/warehouse.types";

import ProductHistoryRow from "./ProductHistoryRow";

interface ProductHistoryTableProps {
    productMovements: IProductInventoryMovement[];
}

export default function ProductHistoryTable({
    productMovements,
}: ProductHistoryTableProps) {
    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <Table>
                <TableHeader className="bg-slate-50/50">
                    <TableRow>
                        <TableHead className="font-semibold text-slate-700">
                            Route
                        </TableHead>

                        <TableHead className="font-semibold text-slate-700">
                            Qty
                        </TableHead>

                        <TableHead className="font-semibold text-slate-700">
                            Type
                        </TableHead>

                        <TableHead className="font-semibold text-slate-700">
                            Date
                        </TableHead>

                        <TableHead className="text-right font-semibold text-slate-700">
                            Note
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {productMovements.length > 0 ? (
                        productMovements.map((movement) => (
                            <ProductHistoryRow
                                key={movement.id}
                                movement={movement}
                            />
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={6}
                                className="h-32 text-center text-slate-400"
                            >
                                No movements recorded for this warehouse.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
