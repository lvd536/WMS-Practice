"use client";

import { useEffect, useState } from "react";

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

import ProductHistoryTable from "./ProductHistoryTable";
import ProductHistoryLoading from "./ProductHistoryLoading";

interface ProductHistoryDialogProps {
    isOpen: boolean;
    onClose: () => void;
    product: IRackProduct;
}

export default function ProductHistoryDialog({
    isOpen,
    onClose,
    product,
}: ProductHistoryDialogProps) {
    const [isLoading, setIsLoading] = useState(false);

    const [productMovements, setProductMovements] = useState<
        IProductInventoryMovement[]
    >([]);

    useEffect(() => {
        const fetchProductMovements = async () => {
            if (!product?.id) return;

            setIsLoading(true);

            try {
                const movements = await getProductMovements(product.id);

                if (Array.isArray(movements)) {
                    setProductMovements(movements);
                }
            } finally {
                setIsLoading(false);
            }
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

                {isLoading ? (
                    <ProductHistoryLoading />
                ) : (
                    <ProductHistoryTable productMovements={productMovements} />
                )}

                <AlertDialogFooter>
                    <AlertDialogCancel>Close</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
