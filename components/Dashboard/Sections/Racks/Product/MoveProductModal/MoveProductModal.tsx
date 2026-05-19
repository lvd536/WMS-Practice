"use client";

import { IRackProduct, IWarehouse } from "@/types/warehouse.types";
import MoveProductDialog from "./MoveProductDialog";

interface IMoveProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: IRackProduct;
    currentRackId: number;
    warehouses: IWarehouse[];
}

export default function MoveProductModal(props: IMoveProductModalProps) {
    return <MoveProductDialog {...props} />;
}
