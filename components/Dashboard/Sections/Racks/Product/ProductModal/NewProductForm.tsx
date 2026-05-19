"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";

import { ICategory, IRackProduct } from "@/types/warehouse.types";

import ProductBaseFields from "./ProductBaseFields";

import { newProductSchema, NewProductFormValues } from "@/schemas/product.schema";

interface NewProductFormProps {
    initialData?: IRackProduct | null;
    categories: ICategory[];
    isLoading: boolean;
    onClose: () => void;
    onSubmit: (data: NewProductFormValues) => Promise<void>;
}

export default function NewProductForm({
    initialData,
    categories,
    isLoading,
    onClose,
    onSubmit,
}: NewProductFormProps) {
    const form = useForm<NewProductFormValues>({
        resolver: zodResolver(newProductSchema),
        defaultValues: {
            name: initialData?.name ?? "",
            category_id: initialData?.category_id ?? 0,
            quantity: initialData?.quantity ?? 0,
            length: initialData?.length ?? 0,
            width: initialData?.width ?? 0,
            height: initialData?.height ?? 0,
            weight: initialData?.weight ?? 0,
        },
    });

    const { handleSubmit, reset } = form;

    useEffect(() => {
        reset({
            name: initialData?.name ?? "",
            category_id: initialData?.category_id ?? 0,
            quantity: initialData?.quantity ?? 0,
            length: initialData?.length ?? 0,
            width: initialData?.width ?? 0,
            height: initialData?.height ?? 0,
            weight: initialData?.weight ?? 0,
        });
    }, [initialData, reset]);

    const submitHandler = async (data: NewProductFormValues) => {
        await onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4 pt-4">
            <ProductBaseFields
                form={form}
                categories={categories}
                prefix="new-"
            />

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
                    {isLoading
                        ? initialData
                            ? "Saving..."
                            : "Creating..."
                        : initialData
                          ? "Save Product"
                          : "Create & Place"}
                </Button>
            </div>
        </form>
    );
}
