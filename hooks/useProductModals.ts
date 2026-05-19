"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { IRackProduct } from "@/types/warehouse.types";

import { removeProductFromRack } from "@/actions/rack.actions";

export function useProductModals() {
    const router = useRouter();

    const [moveProduct, setMoveProduct] = useState<IRackProduct | null>(null);

    const [viewProductHistory, setViewProductHistory] =
        useState<IRackProduct | null>(null);

    const [editingProduct, setEditingProduct] = useState<IRackProduct | null>(
        null,
    );

    const [deletingProduct, setDeletingProduct] = useState<IRackProduct | null>(
        null,
    );

    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async (product: IRackProduct) => {
        setIsDeleting(true);

        try {
            await removeProductFromRack(product.placement_id);

            router.refresh();
        } catch (error) {
            console.error(error);
        } finally {
            setIsDeleting(false);
            setDeletingProduct(null);
        }
    };

    return {
        moveProduct,
        viewProductHistory,
        editingProduct,
        deletingProduct,
        isDeleting,

        setMoveProduct,
        setViewProductHistory,
        setEditingProduct,
        setDeletingProduct,

        handleDelete,
    };
}
