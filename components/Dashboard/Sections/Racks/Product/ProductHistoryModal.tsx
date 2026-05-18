"use client";

import { useState, useEffect } from "react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    IProductInventoryMovement,
    IRackProduct,
} from "@/types/warehouse.types";
import { getProductMovements } from "@/actions/logs.actions";
import { ArrowRightLeft, Loader2 } from "lucide-react";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";

interface IMoveProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: IRackProduct;
}

export default function ProductHistoryModal({
    isOpen,
    onClose,
    product,
}: IMoveProductModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [productMovements, setProductMovements] = useState<
        IProductInventoryMovement[]
    >([]);

    useEffect(() => {
        const fetchProductMovements = async () => {
            if (!product || !product.id) return;
            setIsLoading(true);
            const productMovements = await getProductMovements(product.id);
            if (Array.isArray(productMovements)) {
                setProductMovements(productMovements);
            }
            setIsLoading(false);
        };
        fetchProductMovements();
    }, [product]);

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="max-w-xl!">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {product?.name} movement history
                    </AlertDialogTitle>
                </AlertDialogHeader>
                {isLoading && (
                    <span className="flex items-center gap-2">
                        <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                        Loading product history...
                    </span>
                )}
                {!isLoading && (
                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
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
                                    productMovements.map((m) => (
                                        <TableRow
                                            key={m.id}
                                            className="hover:bg-slate-50/50 transition-colors"
                                        >
                                            <TableCell>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <span
                                                        className={`px-2 py-0.5 rounded border text-[11px] ${
                                                            m.from_rack_name
                                                                ? "bg-white text-slate-600 border-slate-200"
                                                                : "text-[10px] bg-slate-100 text-slate-400 border-transparent italic"
                                                        }`}
                                                    >
                                                        {m.from_rack_name ||
                                                            "External"}
                                                    </span>

                                                    <ArrowRightLeft className="w-3 h-3 text-slate-300" />

                                                    <span
                                                        className={`px-2 py-0.5 rounded border text-[11px] ${
                                                            m.to_rack_name
                                                                ? "bg-indigo-50 text-indigo-700 border-indigo-100 font-medium"
                                                                : "text-[10px] bg-slate-100 text-slate-400 border-transparent italic"
                                                        }`}
                                                    >
                                                        {m.to_rack_name ||
                                                            "External"}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="font-bold text-slate-700">
                                                    {m.quantity}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span
                                                    className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${
                                                        m.movement_type ===
                                                        "receive"
                                                            ? "bg-emerald-100 text-emerald-800"
                                                            : m.movement_type ===
                                                                "move"
                                                              ? "bg-blue-100 text-blue-800"
                                                              : m.movement_type ===
                                                                  "writeoff"
                                                                ? "bg-red-100 text-red-800"
                                                                : "bg-amber-100 text-amber-800"
                                                    }`}
                                                >
                                                    {m.movement_type}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-slate-500 text-xs whitespace-nowrap">
                                                {new Date(
                                                    m.created_at,
                                                ).toLocaleString([], {
                                                    day: "numeric",
                                                    month: "short",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </TableCell>
                                            <TableCell className="text-right text-slate-400 italic text-[11px] max-w-37.5 truncate">
                                                {m.note || "—"}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={6}
                                            className="h-32 text-center text-slate-400"
                                        >
                                            No movements recorded for this
                                            warehouse.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                )}
                <AlertDialogFooter>
                    <AlertDialogCancel>Close</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
