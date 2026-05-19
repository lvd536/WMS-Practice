"use client";

import { Controller, UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ICategory } from "@/types/warehouse.types";
import { NewProductFormValues } from "@/schemas/product.schema";

interface Props {
    form: UseFormReturn<NewProductFormValues>;
    categories: ICategory[];
    prefix?: string;
}

export default function ProductBaseFields({
    form,
    categories,
    prefix = "",
}: Props) {
    const {
        register,
        control,
        formState: { errors },
    } = form;

    return (
        <>
            <div className="space-y-2">
                <Label htmlFor={`${prefix}name`}>Product Name</Label>
                <Input
                    id={`${prefix}name`}
                    placeholder="e.g. Gaming Mouse"
                    {...register("name")}
                />
                {errors.name && (
                    <p className="text-sm font-medium text-red-500">
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
                                value={
                                    field.value ? field.value.toString() : ""
                                }
                            >
                                <SelectTrigger>
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
                        <p className="text-sm font-medium text-red-500">
                            {errors.category_id.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor={`${prefix}quantity`}>
                        Quantity on Rack
                    </Label>
                    <Input
                        id={`${prefix}quantity`}
                        type="number"
                        {...register("quantity", { valueAsNumber: true })}
                    />
                    {errors.quantity && (
                        <p className="text-sm font-medium text-red-500">
                            {errors.quantity.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                    <Label htmlFor={`${prefix}length`}>Length</Label>
                    <Input
                        id={`${prefix}length`}
                        type="number"
                        step="0.01"
                        {...register("length", { valueAsNumber: true })}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor={`${prefix}width`}>Width</Label>
                    <Input
                        id={`${prefix}width`}
                        type="number"
                        step="0.01"
                        {...register("width", { valueAsNumber: true })}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor={`${prefix}height`}>Height</Label>
                    <Input
                        id={`${prefix}height`}
                        type="number"
                        step="0.01"
                        {...register("height", { valueAsNumber: true })}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor={`${prefix}weight`}>Weight</Label>
                    <Input
                        id={`${prefix}weight`}
                        type="number"
                        step="0.01"
                        {...register("weight", { valueAsNumber: true })}
                    />
                </div>
            </div>
        </>
    );
}
