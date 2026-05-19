export const movementTypeStyles: Record<string, string> = {
    receive: "bg-emerald-100 text-emerald-800",
    move: "bg-primary/10 text-blue-800",
    writeoff: "bg-red-100 text-red-800",
};

export function getMovementTypeClass(type: string) {
    return movementTypeStyles[type] ?? "bg-amber-100 text-amber-800";
}

export function formatMovementDate(date: string) {
    return new Date(date).toLocaleString([], {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    });
}
