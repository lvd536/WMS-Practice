"use client";

import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { IRackProduct } from "@/types/warehouse.types";

import { Edit, History, MoreHorizontal, Move, Trash2 } from "lucide-react";

interface ProductActionsDropdownProps {
    product: IRackProduct;

    onEdit: (product: IRackProduct) => void;
    onMove: (product: IRackProduct) => void;
    onHistory: (product: IRackProduct) => void;
    onDelete: (product: IRackProduct) => void;
}

export default function ProductActionsDropdown({
    product,
    onEdit,
    onMove,
    onHistory,
    onDelete,
}: ProductActionsDropdownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => onEdit(product)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => onMove(product)}>
                    <Move className="mr-2 h-4 w-4" />
                    Move
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => onHistory(product)}>
                    <History className="mr-2 h-4 w-4" />
                    History
                </DropdownMenuItem>

                <DropdownMenuItem
                    className="text-red-600 focus:text-red-600"
                    onClick={() => onDelete(product)}
                >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
