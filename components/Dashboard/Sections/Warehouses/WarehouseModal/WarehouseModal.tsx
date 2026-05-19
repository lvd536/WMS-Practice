"use client";

import { IWarehouse } from "@/types/warehouse.types";

import WarehouseDialog from "./WarehouseDialog";

interface IWarehouseModalProps {
    orgId: number;
    isOpen: boolean;
    onClose: () => void;
    initialData?: IWarehouse | null;
}

export default function WarehouseModal(props: IWarehouseModalProps) {
    return <WarehouseDialog {...props} />;
}
