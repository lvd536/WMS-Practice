"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ICategory, IWarehouseProduct } from "@/types/warehouse.types";
import {
    ChevronLeft,
    ChevronRight,
    Cpu,
    Package,
    Search,
    Shirt,
    Wrench,
} from "lucide-react";
import { useState } from "react";

interface IProductsTableProps {
    products: IWarehouseProduct[];
    categories: ICategory[];
}

export default function ProductsTable({
    products,
    categories,
}: IProductsTableProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesCategory =
            selectedCategory === "all" ||
            product.category_id.toString() === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const totalItems = filteredProducts.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = filteredProducts.slice(
        startIndex,
        startIndex + itemsPerPage,
    );

    const handleSearch = (val: string) => {
        setSearchQuery(val);
        setCurrentPage(1);
    };

    const handleCategory = (val: string) => {
        setSelectedCategory(val);
        setCurrentPage(1);
    };

    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        }).format(new Date(dateString));
    };

    const getCategoryStyles = (categoryName?: string) => {
        const name = categoryName?.toLowerCase() || "";
        if (name.includes("electronic"))
            return { icon: Cpu, color: "bg-blue-100 text-blue-700" };
        if (name.includes("hardware"))
            return { icon: Wrench, color: "bg-orange-100 text-orange-700" };
        if (name.includes("apparel"))
            return { icon: Shirt, color: "bg-purple-100 text-purple-700" };
        return { icon: Package, color: "bg-slate-100 text-slate-700" };
    };

    return (
        <div className="space-y-4 mt-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-between bg-white p-4 rounded-xl border border-slate-200">
                <div className="relative w-full sm:w-87.5">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Search products..."
                        className="pl-9 h-10 border-slate-200"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
                <Select value={selectedCategory} onValueChange={handleCategory}>
                    <SelectTrigger className="w-full sm:w-50 h-10 border-slate-200">
                        <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id.toString()}>
                                {cat.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <Table>
                    <TableHeader className="bg-[#edf2fa] hover:bg-[#edf2fa]">
                        <TableRow className="border-b-slate-200">
                            <TableHead className="font-semibold text-slate-700 w-75">
                                PRODUCT NAME
                            </TableHead>
                            <TableHead className="font-semibold text-slate-700">
                                CATEGORY
                            </TableHead>
                            <TableHead className="font-semibold text-slate-700">
                                QUANTITY
                            </TableHead>
                            <TableHead className="font-semibold text-slate-700">
                                DIMENSIONS (L X W X H)
                            </TableHead>
                            <TableHead className="font-semibold text-slate-700">
                                WEIGHT
                            </TableHead>
                            <TableHead className="font-semibold text-slate-700">
                                CREATE DATE
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedProducts.length > 0 ? (
                            paginatedProducts.map((product) => {
                                const category = categories.find(
                                    (c) => c.id === product.category_id,
                                );
                                const { icon: Icon, color } = getCategoryStyles(
                                    category?.name,
                                );

                                return (
                                    <TableRow
                                        key={product.id}
                                        className="hover:bg-slate-50/50"
                                    >
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center border border-indigo-100">
                                                    <Icon className="w-5 h-5 text-indigo-600" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-slate-900">
                                                        {product.name}
                                                    </span>
                                                    <span className="text-xs text-slate-500 uppercase">
                                                        SKU:
                                                        {typeof product.id ===
                                                            "string" &&
                                                        product.id.includes("-")
                                                            ? product.id.split(
                                                                  "-",
                                                              )[0]
                                                            : `PRD-${product.id}`}
                                                    </span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${color}`}
                                            >
                                                {category?.name || "Unknown"}
                                            </span>
                                        </TableCell>
                                        <TableCell className="font-semibold text-slate-700">
                                            {product.quantity}
                                        </TableCell>
                                        <TableCell className="text-slate-500 text-sm">
                                            {product.length}&quot; x{" "}
                                            {product.width}&quot; x{" "}
                                            {product.height}&quot;
                                        </TableCell>
                                        <TableCell className="text-slate-500 text-sm">
                                            {product.weight} lbs
                                        </TableCell>
                                        <TableCell className="text-slate-500 text-sm">
                                            {formatDate(product.created_at)}
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="h-32 text-center text-slate-500"
                                >
                                    No products found matching your criteria.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                <div className="flex items-center justify-between px-6 py-4 bg-[#f8fafc] border-t border-slate-200">
                    <div className="text-sm text-slate-500 font-medium">
                        Showing {totalItems === 0 ? 0 : startIndex + 1}-
                        {Math.min(startIndex + itemsPerPage, totalItems)} of{" "}
                        {totalItems} items
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 text-slate-500"
                            onClick={() =>
                                setCurrentPage((p) => Math.max(1, p - 1))
                            }
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 text-slate-500"
                            onClick={() =>
                                setCurrentPage((p) =>
                                    Math.min(totalPages, p + 1),
                                )
                            }
                            disabled={
                                currentPage === totalPages || totalPages === 0
                            }
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
