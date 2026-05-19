"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    addExistingProductToRack,
    addProductToRack,
    updateRackProduct,
} from "@/actions/rack.actions";
import { ICategory, IRackProduct, IProduct } from "@/types/warehouse.types";
import ProductModeTabs from "./ProductModeTabs";
import {
    ExistingProductFormValues,
    NewProductFormValues,
} from "@/schemas/product.schema";

interface ProductDialogProps {
    isOpen: boolean;
    onClose: () => void;
    organizationId: number;
    warehouseId: number;
    rackId: number;
    categories: ICategory[];
    allWarehouseProducts: IProduct[];
    initialData?: IRackProduct | null;
}

export default function ProductDialog({
    isOpen,
    onClose,
    organizationId,
    warehouseId,
    rackId,
    categories,
    allWarehouseProducts,
    initialData,
}: ProductDialogProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const isEditMode = !!initialData;

    const handleSubmitNew = async (data: NewProductFormValues) => {
        setIsLoading(true);
        try {
            if (isEditMode && initialData) {
                await updateRackProduct(
                    initialData.placement_id,
                    initialData.id,
                    data,
                    data.quantity,
                );
            } else {
                await addProductToRack(
                    organizationId,
                    warehouseId,
                    rackId,
                    data,
                );
            }

            router.refresh();
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmitExisting = async (data: ExistingProductFormValues) => {
        setIsLoading(true);
        try {
            await addExistingProductToRack(
                rackId,
                data.product_id,
                data.quantity,
            );
            router.refresh();
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-125">
                <DialogHeader>
                    <DialogTitle>
                        {isEditMode
                            ? "Edit Product Placement"
                            : "Add Product to Rack"}
                    </DialogTitle>
                </DialogHeader>

                <ProductModeTabs
                    isEditMode={isEditMode}
                    initialData={initialData}
                    categories={categories}
                    allWarehouseProducts={allWarehouseProducts}
                    isLoading={isLoading}
                    onClose={onClose}
                    onSubmitNew={handleSubmitNew}
                    onSubmitExisting={handleSubmitExisting}
                    isOpen={isOpen}
                />
            </DialogContent>
        </Dialog>
    );
}
