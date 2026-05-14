"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import ProductModal from "./ProductModal";
import { ICategory } from "@/types/warehouse.types";

export default function WarehouseHeaderActions({
    warehouseId,
    categories,
}: {
    warehouseId: number;
    categories: ICategory[];
}) {
    const [isAddOpen, setIsAddOpen] = useState(false);

    return (
        <>
            <Button
                onClick={() => setIsAddOpen(true)}
                className="h-10 bg-indigo-600 hover:bg-indigo-700 shadow-md"
            >
                <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>

            {isAddOpen && (
                <ProductModal
                    isOpen={isAddOpen}
                    onClose={() => setIsAddOpen(false)}
                    warehouseId={warehouseId}
                    categories={categories}
                />
            )}
        </>
    );
}
