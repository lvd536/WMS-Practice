"use client";

import { IWarehouseRack } from "@/types/warehouse.types";

import RackDialog from "./RackDialog";

interface IRackModalProps {
    warehouseId: number;
    isOpen: boolean;
    onClose: () => void;
    initialData?: IWarehouseRack | null;
}

export default function RackModal(props: IRackModalProps) {
    return <RackDialog {...props} />;
}
