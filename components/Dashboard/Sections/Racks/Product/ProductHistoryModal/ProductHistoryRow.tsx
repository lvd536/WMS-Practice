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
        <TableRow className="transition-colors hover:bg-slate-50/50">
            <TableCell>
                <div className="flex items-center gap-2 text-sm">
                    <span
                        className={`rounded border px-2 py-0.5 text-[11px] ${
                            movement.from_rack_name
                                ? "border-slate-200 bg-white text-slate-600"
                                : "border-transparent bg-slate-100 text-[10px] italic text-slate-400"
                        }`}
                    >
                        {movement.from_rack_name || "External"}
                    </span>

                    <ArrowRightLeft className="h-3 w-3 text-slate-300" />

                    <span
                        className={`rounded border px-2 py-0.5 text-[11px] ${
                            movement.to_rack_name
                                ? "border-indigo-100 bg-indigo-50 font-medium text-indigo-700"
                                : "border-transparent bg-slate-100 text-[10px] italic text-slate-400"
                        }`}
                    >
                        {movement.to_rack_name || "External"}
                    </span>
                </div>
            </TableCell>

            <TableCell>
                <span className="font-bold text-slate-700">
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

            <TableCell className="whitespace-nowrap text-xs text-slate-500">
                {formatMovementDate(movement.created_at)}
            </TableCell>

            <TableCell className="max-w-37.5 truncate text-right text-[11px] italic text-slate-400">
                {movement.note || "—"}
            </TableCell>
        </TableRow>
    );
}
