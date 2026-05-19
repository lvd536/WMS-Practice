import { Cpu, Package, Shirt, Wrench } from "lucide-react";

export function getCategoryStyles(categoryName?: string) {
    const name = categoryName?.toLowerCase() || "";

    if (name.includes("electronic")) {
        return {
            icon: Cpu,
            color: "bg-blue-100 text-blue-700",
        };
    }

    if (name.includes("hardware")) {
        return {
            icon: Wrench,
            color: "bg-orange-100 text-orange-700",
        };
    }

    if (name.includes("apparel")) {
        return {
            icon: Shirt,
            color: "bg-purple-100 text-purple-700",
        };
    }

    return {
        icon: Package,
        color: "bg-slate-100 text-slate-700",
    };
}
