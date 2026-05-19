"use client";

import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { IWarehouseRack } from "@/types/warehouse.types";

import { rackSchema, RackFormValues } from "@/schemas/rack.schema";

import RackFormFields from "./RackFormFields";
import RackFormActions from "./RackFormActions";

interface RackFormProps {
    initialData?: IWarehouseRack | null;
    isEditMode: boolean;
    isLoading: boolean;

    onClose: () => void;

    onSubmit: (data: RackFormValues) => Promise<void>;
}

export default function RackForm({
    initialData,
    isEditMode,
    isLoading,
    onClose,
    onSubmit,
}: RackFormProps) {
    const form = useForm<RackFormValues>({
        resolver: zodResolver(rackSchema),

        defaultValues: {
            name: initialData?.name ?? "",
            code: initialData?.code ?? "",
            description: initialData?.description ?? "",
            max_weight: initialData?.max_weight ?? 0,
            max_volume: initialData?.max_volume ?? 0,
        },
    });

    const { handleSubmit, reset } = form;

    useEffect(() => {
        reset({
            name: initialData?.name ?? "",
            code: initialData?.code ?? "",
            description: initialData?.description ?? "",
            max_weight: initialData?.max_weight ?? 0,
            max_volume: initialData?.max_volume ?? 0,
        });
    }, [initialData, reset]);

    const submitHandler = async (data: RackFormValues) => {
        await onSubmit(data);

        reset();
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)} className="mt-4 space-y-4">
            <RackFormFields form={form} />

            <RackFormActions
                isEditMode={isEditMode}
                isLoading={isLoading}
                onClose={onClose}
            />
        </form>
    );
}
