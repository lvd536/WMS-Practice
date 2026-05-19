"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import ProductModal from "./Product/ProductModal/ProductModal";
import { ICategory, IProduct } from "@/types/warehouse.types";

export default function RackHeaderActions({
    organizationId,
    warehouseId,
    rackId,
    categories,
    allWarehouseProducts,
}: {
    organizationId: number;
    warehouseId: number;
    rackId: number;
    categories: ICategory[];
    allWarehouseProducts: IProduct[];
}) {
    const [isAddOpen, setIsAddOpen] = useState(false);

    return (
        <>
            <Button
                onClick={() => setIsAddOpen(true)}
                className="h-10 bg-primary hover:bg-primary/90 shadow-md"
            >
                <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>

            {isAddOpen && (
                <ProductModal
                    organizationId={organizationId}
                    allWarehouseProducts={allWarehouseProducts}
                    rackId={rackId}
                    isOpen={isAddOpen}
                    onClose={() => setIsAddOpen(false)}
                    warehouseId={warehouseId}
                    categories={categories}
                />
            )}
        </>
    );
}
