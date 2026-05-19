"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { ICategory } from "@/types/warehouse.types";

interface ProductsToolbarProps {
    categories: ICategory[];
    searchQuery: string;
    selectedCategory: string;

    onSearch: (value: string) => void;
    onCategoryChange: (value: string) => void;
}

export default function ProductsToolbar({
    categories,
    searchQuery,
    selectedCategory,
    onSearch,
    onCategoryChange,
}: ProductsToolbarProps) {
    return (
        <div className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row">
            <div className="relative w-full sm:w-87.5">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <Input
                    placeholder="Search products..."
                    className="h-10 border-slate-200 pl-9"
                    value={searchQuery}
                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>

            <Select value={selectedCategory} onValueChange={onCategoryChange}>
                <SelectTrigger className="h-10 w-full border-slate-200 sm:w-50">
                    <SelectValue placeholder="All Categories" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>

                    {categories.map((category) => (
                        <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                        >
                            {category.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
