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

import { IProduct } from "@/types/warehouse.types";

import {
    existingProductSchema,
    ExistingProductFormValues,
} from "@/schemas/product.schema";

interface ExistingProductFormProps {
    allWarehouseProducts: IProduct[];
    isLoading: boolean;
    onClose: () => void;
    onSubmit: (data: ExistingProductFormValues) => Promise<void>;
}

export default function ExistingProductForm({
    allWarehouseProducts,
    isLoading,
    onClose,
    onSubmit,
}: ExistingProductFormProps) {
    const form = useForm<ExistingProductFormValues>({
        resolver: zodResolver(existingProductSchema),
        defaultValues: {
            product_id: 0,
            quantity: 1,
        },
    });

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = form;

    useEffect(() => {
        reset({
            product_id: 0,
            quantity: 1,
        });
    }, [reset]);

    const submitHandler = async (data: ExistingProductFormValues) => {
        await onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4 pt-4">
            <div className="space-y-2">
                <Label>Select Product</Label>

                <Controller
                    control={control}
                    name="product_id"
                    render={({ field }) => (
                        <Select
                            onValueChange={(val) => field.onChange(Number(val))}
                            value={field.value ? field.value.toString() : ""}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a product from warehouse..." />
                            </SelectTrigger>

                            <SelectContent>
                                {allWarehouseProducts.map((product) => (
                                    <SelectItem
                                        key={product.id}
                                        value={product.id.toString()}
                                    >
                                        {product.name} (SKU:
                                        {product.id})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />

                {errors.product_id && (
                    <p className="text-sm font-medium text-red-500">
                        {errors.product_id.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="existing-qty">Quantity to place</Label>

                <Input
                    id="existing-qty"
                    type="number"
                    {...register("quantity", {
                        valueAsNumber: true,
                    })}
                />

                {errors.quantity && (
                    <p className="text-sm font-medium text-red-500">
                        {errors.quantity.message}
                    </p>
                )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    disabled={isLoading}
                >
                    Cancel
                </Button>

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-primary hover:bg-primary/90"
                >
                    {isLoading ? "Placing..." : "Place on Rack"}
                </Button>
            </div>
        </form>
    );
}
