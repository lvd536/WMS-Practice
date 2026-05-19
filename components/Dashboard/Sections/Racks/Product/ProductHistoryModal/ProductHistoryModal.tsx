"use client";

import ProductHistoryDialog from "./ProductHistoryDialog";
import { IRackProduct } from "@/types/warehouse.types";

interface IProductHistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: IRackProduct;
}

export default function ProductHistoryModal(props: IProductHistoryModalProps) {
    return <ProductHistoryDialog {...props} />;
}
