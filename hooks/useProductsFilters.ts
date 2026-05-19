"use client";

import { useMemo, useState } from "react";
import { IRackProduct } from "@/types/warehouse.types";

export function useProductsFilters(products: IRackProduct[]) {
    const [searchQuery, setSearchQuery] = useState("");

    const [selectedCategory, setSelectedCategory] = useState("all");

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch = product.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());

            const matchesCategory =
                selectedCategory === "all" ||
                product.category_id?.toString() === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [products, searchQuery, selectedCategory]);

    return {
        searchQuery,
        selectedCategory,
        setSearchQuery,
        setSelectedCategory,
        filteredProducts,
    };
}
