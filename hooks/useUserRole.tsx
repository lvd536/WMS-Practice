import { useEffect, useState } from "react";
import { getCurrentUserRole } from "@/actions/user.actions";

export function useUserRole(organizationId: number) {
    const [role, setRole] = useState<string>("member");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const role = await getCurrentUserRole(organizationId);
                setRole(role ?? "member");
            } finally {
                setLoading(false);
            }
        })();
    }, [organizationId]);

    return {
        role,
        loading,
    };
}
