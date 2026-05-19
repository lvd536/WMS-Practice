"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    IRackProduct,
    IWarehouse,
    IWarehouseRack,
} from "@/types/warehouse.types";
import { createMoveProductSchema } from "@/schemas/move-product.schema";
import { MoveFormValues } from "@/schemas/move-product.schema";

interface MoveProductFormProps {
    product: IRackProduct;
    warehouses: IWarehouse[];
    targetRacks: IWarehouseRack[];
    isLoading: boolean;
    onCancel: () => void;
    onSubmit: (data: {
        warehouse_id: number;
        rack_id: number;
        quantity: number;
    }) => Promise<void>;
    onLoadRacks: (warehouseId: number) => Promise<void>;
}

export default function MoveProductForm({
    product,
    warehouses,
    targetRacks,
    isLoading,
    onCancel,
    onSubmit,
    onLoadRacks,
}: MoveProductFormProps) {
    const schema = createMoveProductSchema(product.placement_quantity);

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            warehouse_id: undefined,
            rack_id: undefined,
            quantity: 1,
        },
    });

    const selectedWarehouseId = watch("warehouse_id");

    useEffect(() => {
        if (!selectedWarehouseId) return;
        onLoadRacks(selectedWarehouseId);
    }, [selectedWarehouseId, onLoadRacks]);

    const submitHandler = async (data: MoveFormValues) => {
        await onSubmit(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
            <div className="space-y-2">
                <Label>Select Target Warehouse</Label>
                <Controller
                    control={control}
                    name="warehouse_id"
                    render={({ field }) => (
                        <Select
                            onValueChange={(val) => field.onChange(Number(val))}
                            value={field.value?.toString()}
                        >
                            <SelectTrigger
                                className={
                                    errors.warehouse_id ? "border-red-500" : ""
                                }
                            >
                                <SelectValue placeholder="Select warehouse..." />
                            </SelectTrigger>
                            <SelectContent>
                                {warehouses.map((w) => (
                                    <SelectItem
                                        key={w.id}
                                        value={w.id.toString()}
                                    >
                                        {w.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.warehouse_id && (
                    <p className="text-sm text-red-500">
                        {errors.warehouse_id.message as string}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label>Select Target Rack</Label>
                <Controller
                    control={control}
                    name="rack_id"
                    render={({ field }) => (
                        <Select
                            disabled={
                                !selectedWarehouseId || targetRacks.length === 0
                            }
                            onValueChange={(val) => field.onChange(Number(val))}
                            value={field.value?.toString()}
                        >
                            <SelectTrigger
                                className={
                                    errors.rack_id ? "border-red-500" : ""
                                }
                            >
                                <SelectValue
                                    placeholder={
                                        targetRacks.length === 0 &&
                                        selectedWarehouseId
                                            ? "No racks available"
                                            : "Select rack..."
                                    }
                                />
                            </SelectTrigger>
                            <SelectContent>
                                {targetRacks.map((r) => (
                                    <SelectItem
                                        key={r.id}
                                        value={r.id.toString()}
                                    >
                                        {r.name} ({r.code})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.rack_id && (
                    <p className="text-sm text-red-500">
                        {errors.rack_id.message as string}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label>Quantity to move</Label>
                <Input
                    type="number"
                    {...register("quantity", { valueAsNumber: true })}
                />
                {errors.quantity && (
                    <p className="text-sm text-red-500">
                        {errors.quantity.message as string}
                    </p>
                )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isLoading}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-primary hover:bg-primary/90"
                >
                    {isLoading ? "Moving..." : "Confirm Move"}
                </Button>
            </div>
        </form>
    );
}
