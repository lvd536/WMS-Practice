"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ICategory, IWarehouseProduct } from "@/types/warehouse.types";
import {
    createWarehouseProduct,
    updateWarehouseProduct,
} from "@/actions/warehouse.actions";
import { useRouter } from "next/navigation";

const productSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    category_id: z
        .number({ message: "Please select a category" })
        .min(1, "Please select a category"),
    quantity: z
        .number({ message: "Required" })
        .int()
        .min(0, "Quantity cannot be negative"),
    length: z.number({ message: "Required" }).min(0.001, "Required"),
    width: z.number({ message: "Required" }).min(0.001, "Required"),
    height: z.number({ message: "Required" }).min(0.001, "Required"),
    weight: z.number({ message: "Required" }).min(0.001, "Required"),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface IProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    warehouseId: number;
    categories: ICategory[];
    initialData?: IWarehouseProduct | null;
}

export default function ProductModal({
    isOpen,
    onClose,
    warehouseId,
    categories,
    initialData,
}: IProductModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const isEditMode = !!initialData;

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: initialData?.name ?? "",
            category_id: initialData?.category_id ?? 0,
            quantity: initialData?.quantity ?? 0,
            length: initialData?.length ?? 0,
            width: initialData?.width ?? 0,
            height: initialData?.height ?? 0,
            weight: initialData?.weight ?? 0,
        } as ProductFormValues,
    });

    const onSubmit = async (data: ProductFormValues) => {
        setIsLoading(true);
        try {
            if (isEditMode && initialData) {
                await updateWarehouseProduct(initialData.id, data);
            } else {
                await createWarehouseProduct({
                    ...data,
                    warehouse_id: warehouseId,
                });
            }
            router.refresh();
            reset();
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-125">
                <DialogHeader>
                    <DialogTitle>
                        {isEditMode ? "Edit Product" : "Add New Product"}
                    </DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4 mt-4"
                >
                    <div className="space-y-2">
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                            id="name"
                            placeholder="e.g. Gaming Mouse"
                            {...register("name")}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500 font-medium">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Category</Label>
                            <Controller
                                control={control}
                                name="category_id"
                                render={({ field }) => (
                                    <Select
                                        onValueChange={(val) =>
                                            field.onChange(Number(val))
                                        }
                                        defaultValue={
                                            field.value
                                                ? field.value.toString()
                                                : ""
                                        }
                                    >
                                        <SelectTrigger
                                            className={
                                                errors.category_id
                                                    ? "border-red-500"
                                                    : ""
                                            }
                                        >
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((cat) => (
                                                <SelectItem
                                                    key={cat.id}
                                                    value={cat.id.toString()}
                                                >
                                                    {cat.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.category_id && (
                                <p className="text-sm text-red-500 font-medium">
                                    {errors.category_id.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="quantity">Quantity</Label>
                            <Input
                                id="quantity"
                                type="number"
                                {...register("quantity", {
                                    valueAsNumber: true,
                                })}
                            />
                            {errors.quantity && (
                                <p className="text-sm text-red-500 font-medium">
                                    {errors.quantity.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="length">Length</Label>
                            <Input
                                id="length"
                                type="number"
                                step="0.01"
                                {...register("length", { valueAsNumber: true })}
                            />
                            {errors.length && (
                                <p className="text-sm text-red-500 font-medium">
                                    {errors.length.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="width">Width</Label>
                            <Input
                                id="width"
                                type="number"
                                step="0.01"
                                {...register("width", { valueAsNumber: true })}
                            />
                            {errors.width && (
                                <p className="text-sm text-red-500 font-medium">
                                    {errors.width.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="height">Height</Label>
                            <Input
                                id="height"
                                type="number"
                                step="0.01"
                                {...register("height", { valueAsNumber: true })}
                            />
                            {errors.height && (
                                <p className="text-sm text-red-500 font-medium">
                                    {errors.height.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="weight">Weight</Label>
                            <Input
                                id="weight"
                                type="number"
                                step="0.01"
                                {...register("weight", { valueAsNumber: true })}
                            />
                            {errors.weight && (
                                <p className="text-sm text-red-500 font-medium">
                                    {errors.weight.message}
                                </p>
                            )}
                        </div>
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
                            className="bg-indigo-600 hover:bg-indigo-700"
                        >
                            {isLoading ? "Saving..." : "Save Product"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
