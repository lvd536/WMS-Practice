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
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <Table>
                <TableHeader className="bg-muted/50">
                    <TableRow>
                        <TableHead className="font-semibold text-foreground">
                            Route
                        </TableHead>

                        <TableHead className="font-semibold text-foreground">
                            Qty
                        </TableHead>

                        <TableHead className="font-semibold text-foreground">
                            Type
                        </TableHead>

                        <TableHead className="font-semibold text-foreground">
                            Date
                        </TableHead>

                        <TableHead className="text-right font-semibold text-foreground">
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
                                className="h-32 text-center text-muted-foreground"
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
