"use client";

import { ICategory, IRackProduct, IProduct } from "@/types/warehouse.types";
import ProductDialog from "./ProductDialog";

interface IProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    organizationId: number;
    warehouseId: number;
    rackId: number;
    categories: ICategory[];
    allWarehouseProducts: IProduct[];
    initialData?: IRackProduct | null;
}

export default function ProductModal(props: IProductModalProps) {
    return <ProductDialog {...props} />;
}
