"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ICategory, IRackProduct, IProduct } from "@/types/warehouse.types";
import {
    ExistingProductFormValues,
    NewProductFormValues,
} from "@/schemas/product.schema";
import ExistingProductForm from "./ExistingProductForm";
import NewProductForm from "./NewProductForm";

interface Props {
    isEditMode: boolean;
    isOpen: boolean;
    initialData?: IRackProduct | null;
    categories: ICategory[];
    allWarehouseProducts: IProduct[];
    isLoading: boolean;
    onClose: () => void;
    onSubmitNew: (data: NewProductFormValues) => Promise<void>;
    onSubmitExisting: (data: ExistingProductFormValues) => Promise<void>;
}

export default function ProductModeTabs({
    isEditMode,
    initialData,
    categories,
    allWarehouseProducts,
    isLoading,
    onClose,
    onSubmitNew,
    onSubmitExisting,
}: Props) {
    if (isEditMode) {
        return (
            <NewProductForm
                initialData={initialData}
                categories={categories}
                isLoading={isLoading}
                onClose={onClose}
                onSubmit={onSubmitNew}
            />
        );
    }

    return (
        <Tabs defaultValue="existing" className="mt-4">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="existing">Existing Product</TabsTrigger>
                <TabsTrigger value="new">Create New Product</TabsTrigger>
            </TabsList>

            <TabsContent value="existing">
                <ExistingProductForm
                    allWarehouseProducts={allWarehouseProducts}
                    isLoading={isLoading}
                    onClose={onClose}
                    onSubmit={onSubmitExisting}
                />
            </TabsContent>

            <TabsContent value="new">
                <NewProductForm
                    categories={categories}
                    isLoading={isLoading}
                    onClose={onClose}
                    onSubmit={onSubmitNew}
                />
            </TabsContent>
        </Tabs>
    );
}
