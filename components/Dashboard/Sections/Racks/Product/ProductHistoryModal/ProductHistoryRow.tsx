"use client";

import { ArrowRightLeft } from "lucide-react";

import { TableCell, TableRow } from "@/components/ui/table";

import { IProductInventoryMovement } from "@/types/warehouse.types";

import {
    formatMovementDate,
    getMovementTypeClass,
} from "@/utils/product-history.utils";

interface ProductHistoryRowProps {
    movement: IProductInventoryMovement;
}

export default function ProductHistoryRow({
    movement,
}: ProductHistoryRowProps) {
    return (
        <TableRow className="transition-colors hover:bg-muted/50">
            <TableCell>
                <div className="flex items-center gap-2 text-sm">
                    <span
                        className={`rounded border px-2 py-0.5 text-[11px] ${
                            movement.from_rack_name
                                ? "border-border bg-card text-foreground"
                                : "border-transparent bg-muted text-[10px] italic text-muted-foreground"
                        }`}
                    >
                        {movement.from_rack_name || "External"}
                    </span>

                    <ArrowRightLeft className="h-3 w-3 text-muted-foreground" />

                    <span
                        className={`rounded border px-2 py-0.5 text-[11px] ${
                            movement.to_rack_name
                                ? "border-primary/20 bg-primary/10 font-medium text-primary"
                                : "border-transparent bg-muted text-[10px] italic text-muted-foreground"
                        }`}
                    >
                        {movement.to_rack_name || "External"}
                    </span>
                </div>
            </TableCell>

            <TableCell>
                <span className="font-bold text-foreground">
                    {movement.quantity}
                </span>
            </TableCell>

            <TableCell>
                <span
                    className={`rounded-md px-2 py-0.5 text-[9px] font-black uppercase tracking-widest ${getMovementTypeClass(
                        movement.movement_type,
                    )}`}
                >
                    {movement.movement_type}
                </span>
            </TableCell>

            <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                {formatMovementDate(movement.created_at)}
            </TableCell>

            <TableCell className="max-w-37.5 truncate text-right text-[11px] italic text-muted-foreground">
                {movement.note || "—"}
            </TableCell>
        </TableRow>
    );
}
