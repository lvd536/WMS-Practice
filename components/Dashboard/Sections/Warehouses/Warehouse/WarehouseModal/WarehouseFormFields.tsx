"use client";

import { UseFormReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { WarehouseFormValues } from "@/schemas/warehouse.schema";

interface WarehouseFormFieldsProps {
    form: UseFormReturn<WarehouseFormValues>;
}

export default function WarehouseFormFields({
    form,
}: WarehouseFormFieldsProps) {
    const {
        register,

        formState: { errors },
    } = form;

    return (
        <>
            <div className="space-y-2">
                <Label htmlFor="name">Warehouse Name</Label>

                <Input
                    id="name"
                    placeholder="e.g. Berlin Central Warehouse"
                    {...register("name")}
                />

                {errors.name && (
                    <p className="text-sm font-medium text-red-500">
                        {errors.name.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="address">Warehouse Address</Label>

                <Input
                    id="address"
                    placeholder="e.g. Alexanderplatz 12, Berlin, Germany"
                    {...register("address")}
                />

                {errors.address && (
                    <p className="text-sm font-medium text-red-500">
                        {errors.address.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="max_capacity">Warehouse Max Capacity</Label>

                <Input
                    id="max_capacity"
                    type="number"
                    placeholder="e.g. 12000"
                    {...register("max_capacity", {
                        valueAsNumber: true,
                    })}
                />

                {errors.max_capacity && (
                    <p className="text-sm font-medium text-red-500">
                        {errors.max_capacity.message}
                    </p>
                )}
            </div>
        </>
    );
}
