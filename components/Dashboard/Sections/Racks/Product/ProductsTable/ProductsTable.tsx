"use client";

import {
    ICategory,
    IProduct,
    IRackProduct,
    IWarehouse,
} from "@/types/warehouse.types";

import ProductsToolbar from "./ProductsToolbar";
import ProductsDataTable from "./ProductsDataTable";
import ProductsPagination from "./ProductsPagination";

import ProductModal from "../ProductModal/ProductModal";
import DeleteProductModal from "../DeleteProductModal";
import MoveProductModal from "../MoveProductModal/MoveProductModal";
import ProductHistoryModal from "../ProductHistoryModal/ProductHistoryModal";

import { useProductsFilters } from "@/hooks/useProductsFilters";
import { useProductsPagination } from "@/hooks/useProductsPagination";
import { useProductModals } from "@/hooks/useProductModals";

interface IProductsTableProps {
    organizationId: number;
    warehouses: IWarehouse[];
    warehouseId: number;
    rackId: number;
    products: IRackProduct[];
    allWarehouseProducts: IProduct[];
    categories: ICategory[];
    canEdit?: boolean;
}

export default function ProductsTable({
    organizationId,
    warehouses,
    warehouseId,
    rackId,
    allWarehouseProducts,
    products,
    categories,
    canEdit = false,
}: IProductsTableProps) {
    const {
        searchQuery,
        selectedCategory,
        setSearchQuery,
        setSelectedCategory,
        filteredProducts,
    } = useProductsFilters(products);

    const {
        currentPage,
        setCurrentPage,
        paginatedProducts,
        totalItems,
        totalPages,
        startIndex,
        itemsPerPage,
    } = useProductsPagination(filteredProducts);

    const {
        moveProduct,
        editingProduct,
        deletingProduct,
        viewProductHistory,
        isDeleting,

        setMoveProduct,
        setEditingProduct,
        setDeletingProduct,
        setViewProductHistory,

        handleDelete,
    } = useProductModals();

    return (
        <div className="space-y-4">
            <ProductsToolbar
                categories={categories}
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
                onSearch={setSearchQuery}
                onCategoryChange={setSelectedCategory}
            />

            <ProductsDataTable
                products={paginatedProducts}
                categories={categories}
                canEdit={canEdit}
                onEdit={setEditingProduct}
                onMove={setMoveProduct}
                onHistory={setViewProductHistory}
                onDelete={setDeletingProduct}
            />

            <ProductsPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                startIndex={startIndex}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
            />

            {editingProduct && (
                <ProductModal
                    isOpen={!!editingProduct}
                    onClose={() => setEditingProduct(null)}
                    organizationId={organizationId}
                    warehouseId={warehouseId}
                    rackId={rackId}
                    categories={categories}
                    allWarehouseProducts={allWarehouseProducts}
                    initialData={editingProduct}
                />
            )}

            <DeleteProductModal
                handleDelete={() => handleDelete(deletingProduct!)}
                isDeleting={isDeleting}
                isOpen={!!deletingProduct}
                onClose={() => setDeletingProduct(null)}
                productName={deletingProduct?.name}
            />

            {viewProductHistory && (
                <ProductHistoryModal
                    isOpen={!!viewProductHistory}
                    onClose={() => setViewProductHistory(null)}
                    product={viewProductHistory}
                />
            )}

            {moveProduct && (
                <MoveProductModal
                    isOpen={!!moveProduct}
                    onClose={() => setMoveProduct(null)}
                    product={moveProduct}
                    warehouses={warehouses}
                    currentRackId={rackId}
                />
            )}
        </div>
    );
}
