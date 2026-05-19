"use client";

import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { IWarehouse } from "@/types/warehouse.types";

import { warehouseSchema, WarehouseFormValues } from "@/schemas/warehouse.schema";

import WarehouseFormFields from "./WarehouseFormFields";
import WarehouseFormActions from "./WarehouseFormActions";

interface WarehouseFormProps {
    initialData?: IWarehouse | null;

    isEditMode: boolean;
    isLoading: boolean;

    onClose: () => void;

    onSubmit: (data: WarehouseFormValues) => Promise<void>;
}

export default function WarehouseForm({
    initialData,
    isEditMode,
    isLoading,
    onClose,
    onSubmit,
}: WarehouseFormProps) {
    const form = useForm<WarehouseFormValues>({
        resolver: zodResolver(warehouseSchema),

        defaultValues: {
            name: initialData?.name ?? "",

            address: initialData?.address ?? "",

            max_capacity: initialData?.max_capacity ?? 0,
        },
    });

    const { handleSubmit, reset } = form;

    useEffect(() => {
        reset({
            name: initialData?.name ?? "",

            address: initialData?.address ?? "",

            max_capacity: initialData?.max_capacity ?? 0,
        });
    }, [initialData, reset]);

    const submitHandler = async (data: WarehouseFormValues) => {
        await onSubmit(data);

        reset();
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)} className="mt-4 space-y-4">
            <WarehouseFormFields form={form} />

            <WarehouseFormActions
                isEditMode={isEditMode}
                isLoading={isLoading}
                onClose={onClose}
            />
        </form>
    );
}
