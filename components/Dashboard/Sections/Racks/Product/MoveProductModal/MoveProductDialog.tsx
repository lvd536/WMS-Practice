"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { moveProduct, getWarehouseRacks } from "@/actions/rack.actions";
import {
    IRackProduct,
    IWarehouse,
    IWarehouseRack,
} from "@/types/warehouse.types";
import MoveProductSummary from "./MoveProductSummary";
import MoveProductForm from "./MoveProductForm";

interface MoveProductDialogProps {
    isOpen: boolean;
    onClose: () => void;
    product: IRackProduct;
    currentRackId: number;
    warehouses: IWarehouse[];
}

export default function MoveProductDialog({
    isOpen,
    onClose,
    product,
    currentRackId,
    warehouses,
}: MoveProductDialogProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [targetRacks, setTargetRacks] = useState<IWarehouseRack[]>([]);

    const loadRacks = useCallback(
        async (warehouseId: number) => {
            const racks = await getWarehouseRacks(warehouseId);
            if (Array.isArray(racks)) {
                setTargetRacks(racks.filter((r) => r.id !== currentRackId));
            }
        },
        [currentRackId],
    );

    const handleSubmit = async (data: {
        warehouse_id: number;
        rack_id: number;
        quantity: number;
    }) => {
        setIsLoading(true);
        try {
            await moveProduct(
                product.placement_id,
                product.id,
                currentRackId,
                data.rack_id,
                data.quantity,
                product.placement_quantity,
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
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Move Product</DialogTitle>
                </DialogHeader>

                <MoveProductSummary product={product} />

                <MoveProductForm
                    product={product}
                    warehouses={warehouses}
                    targetRacks={targetRacks}
                    isLoading={isLoading}
                    onCancel={onClose}
                    onLoadRacks={loadRacks}
                    onSubmit={handleSubmit}
                />
            </DialogContent>
        </Dialog>
    );
}
