"use client";

import { useState, useEffect } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ICategory, IRackProduct, IProduct } from "@/types/warehouse.types";
import {
    updateRackProduct,
    addProductToRack,
    addExistingProductToRack,
} from "@/actions/rack.actions";
import { useRouter } from "next/navigation";

const newProductSchema = z.object({
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

const existingProductSchema = z.object({
    product_id: z
        .number({ message: "Please select a product" })
        .min(1, "Please select a product"),
    quantity: z
        .number({ message: "Required" })
        .int()
        .min(1, "Quantity must be at least 1"),
});

type NewProductFormValues = z.infer<typeof newProductSchema>;
type ExistingProductFormValues = z.infer<typeof existingProductSchema>;

interface IProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    organizationId: number;
    warehouseId: number;
    rackId: number;
    categories: ICategory[];
    allWarehouseProducts: IProduct[];
    initialData?: IRackProduct | null;
}

export default function ProductModal({
    isOpen,
    onClose,
    organizationId,
    warehouseId,
    rackId,
    categories,
    allWarehouseProducts,
    initialData,
}: IProductModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const isEditMode = !!initialData;

    const newForm = useForm<NewProductFormValues>({
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

    const existingForm = useForm<ExistingProductFormValues>({
        resolver: zodResolver(existingProductSchema),
        defaultValues: {
            product_id: 0,
            quantity: 1,
        },
    });

    useEffect(() => {
        if (isOpen) {
            newForm.reset({
                name: initialData?.name ?? "",
                category_id: initialData?.category_id ?? 0,
                quantity: initialData?.quantity ?? 0,
                length: initialData?.length ?? 0,
                width: initialData?.width ?? 0,
                height: initialData?.height ?? 0,
                weight: initialData?.weight ?? 0,
            });
            existingForm.reset({
                product_id: 0,
                quantity: 1,
            });
        }
    }, [isOpen, initialData, newForm, existingForm]);

    const onSubmitNew = async (data: NewProductFormValues) => {
        setIsLoading(true);
        try {
            if (isEditMode && initialData) {
                await updateRackProduct(
                    initialData.placement_id,
                    initialData.id,
                    data,
                    data.quantity,
                );
            } else {
                await addProductToRack(
                    organizationId,
                    warehouseId,
                    rackId,
                    data,
                );
            }
            router.refresh();
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmitExisting = async (data: ExistingProductFormValues) => {
        setIsLoading(true);
        try {
            await addExistingProductToRack(
                rackId,
                data.product_id,
                data.quantity,
            );
            router.refresh();
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
                        {isEditMode
                            ? "Edit Product Placement"
                            : "Add Product to Rack"}
                    </DialogTitle>
                </DialogHeader>

                {isEditMode ? (
                    <form
                        onSubmit={newForm.handleSubmit(onSubmitNew)}
                        className="space-y-4 mt-4"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="name">Product Name</Label>
                            <Input
                                id="name"
                                placeholder="e.g. Gaming Mouse"
                                {...newForm.register("name")}
                            />
                            {newForm.formState.errors.name && (
                                <p className="text-sm text-red-500 font-medium">
                                    {newForm.formState.errors.name.message}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Category</Label>
                                <Controller
                                    control={newForm.control}
                                    name="category_id"
                                    render={({ field }) => (
                                        <Select
                                            onValueChange={(val) =>
                                                field.onChange(Number(val))
                                            }
                                            value={
                                                field.value
                                                    ? field.value.toString()
                                                    : ""
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
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="quantity">
                                    Quantity on Rack
                                </Label>
                                <Input
                                    id="quantity"
                                    type="number"
                                    {...newForm.register("quantity", {
                                        valueAsNumber: true,
                                    })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="length">Length</Label>
                                <Input
                                    id="length"
                                    type="number"
                                    step="0.01"
                                    {...newForm.register("length", {
                                        valueAsNumber: true,
                                    })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="width">Width</Label>
                                <Input
                                    id="width"
                                    type="number"
                                    step="0.01"
                                    {...newForm.register("width", {
                                        valueAsNumber: true,
                                    })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="height">Height</Label>
                                <Input
                                    id="height"
                                    type="number"
                                    step="0.01"
                                    {...newForm.register("height", {
                                        valueAsNumber: true,
                                    })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="weight">Weight</Label>
                                <Input
                                    id="weight"
                                    type="number"
                                    step="0.01"
                                    {...newForm.register("weight", {
                                        valueAsNumber: true,
                                    })}
                                />
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
                ) : (
                    <Tabs defaultValue="existing" className="mt-4">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="existing">
                                Existing Product
                            </TabsTrigger>
                            <TabsTrigger value="new">
                                Create New Product
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="existing">
                            <form
                                onSubmit={existingForm.handleSubmit(
                                    onSubmitExisting,
                                )}
                                className="space-y-4 pt-4"
                            >
                                <div className="space-y-2">
                                    <Label>Select Product</Label>
                                    <Controller
                                        control={existingForm.control}
                                        name="product_id"
                                        render={({ field }) => (
                                            <Select
                                                onValueChange={(val) =>
                                                    field.onChange(Number(val))
                                                }
                                                value={
                                                    field.value
                                                        ? field.value.toString()
                                                        : ""
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a product from warehouse..." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {allWarehouseProducts.map(
                                                        (p) => (
                                                            <SelectItem
                                                                key={p.id}
                                                                value={p.id.toString()}
                                                            >
                                                                {p.name} (SKU:{" "}
                                                                {p.id})
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="existing-qty">
                                        Quantity to place
                                    </Label>
                                    <Input
                                        id="existing-qty"
                                        type="number"
                                        {...existingForm.register("quantity", {
                                            valueAsNumber: true,
                                        })}
                                    />
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
                                        {isLoading
                                            ? "Placing..."
                                            : "Place on Rack"}
                                    </Button>
                                </div>
                            </form>
                        </TabsContent>

                        <TabsContent value="new">
                            <form
                                onSubmit={newForm.handleSubmit(onSubmitNew)}
                                className="space-y-4 pt-4"
                            >
                                <div className="space-y-2">
                                    <Label htmlFor="new-name">
                                        Product Name
                                    </Label>
                                    <Input
                                        id="new-name"
                                        placeholder="e.g. Gaming Mouse"
                                        {...newForm.register("name")}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Category</Label>
                                        <Controller
                                            control={newForm.control}
                                            name="category_id"
                                            render={({ field }) => (
                                                <Select
                                                    onValueChange={(val) =>
                                                        field.onChange(
                                                            Number(val),
                                                        )
                                                    }
                                                    value={
                                                        field.value
                                                            ? field.value.toString()
                                                            : ""
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {categories.map(
                                                            (cat) => (
                                                                <SelectItem
                                                                    key={cat.id}
                                                                    value={cat.id.toString()}
                                                                >
                                                                    {cat.name}
                                                                </SelectItem>
                                                            ),
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="new-quantity">
                                            Quantity on Rack
                                        </Label>
                                        <Input
                                            id="new-quantity"
                                            type="number"
                                            {...newForm.register("quantity", {
                                                valueAsNumber: true,
                                            })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-4 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="new-length">
                                            Length
                                        </Label>
                                        <Input
                                            id="new-length"
                                            type="number"
                                            step="0.01"
                                            {...newForm.register("length", {
                                                valueAsNumber: true,
                                            })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="new-width">Width</Label>
                                        <Input
                                            id="new-width"
                                            type="number"
                                            step="0.01"
                                            {...newForm.register("width", {
                                                valueAsNumber: true,
                                            })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="new-height">
                                            Height
                                        </Label>
                                        <Input
                                            id="new-height"
                                            type="number"
                                            step="0.01"
                                            {...newForm.register("height", {
                                                valueAsNumber: true,
                                            })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="new-weight">
                                            Weight
                                        </Label>
                                        <Input
                                            id="new-weight"
                                            type="number"
                                            step="0.01"
                                            {...newForm.register("weight", {
                                                valueAsNumber: true,
                                            })}
                                        />
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
                                        {isLoading
                                            ? "Creating..."
                                            : "Create & Place"}
                                    </Button>
                                </div>
                            </form>
                        </TabsContent>
                    </Tabs>
                )}
            </DialogContent>
        </Dialog>
    );
}
