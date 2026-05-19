import { Cpu, Package, Shirt, Wrench } from "lucide-react";

export function getCategoryStyles(categoryName?: string) {
    const name = categoryName?.toLowerCase() || "";

    if (name.includes("electronic")) {
        return {
            icon: Cpu,
            color: "bg-primary/10 text-blue-700",
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
        color: "bg-muted text-foreground",
    };
}
