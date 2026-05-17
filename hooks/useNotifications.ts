import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { INotification } from "@/types/warehouse.types";

export function useNotifications() {
    const [notifications, setNotifications] = useState<INotification[]>([]);
    const supabase = createClient();

    const markAsRead = async (id: number) => {
        const { error } = await supabase
            .from("notifications")
            .update({
                is_read: true,
                read_at: new Date().toISOString(),
            })
            .eq("id", id);

        if (error) console.error("Ошибка чтения уведомления:", error);
    };

    const markAllAsRead = async () => {
        const unreadIds = notifications
            .filter((n) => !n.is_read)
            .map((n) => n.id);
        if (unreadIds.length === 0) return;

        const { error } = await supabase
            .from("notifications")
            .update({
                is_read: true,
                read_at: new Date().toISOString(),
            })
            .in("id", unreadIds);

        if (error) console.error("Ошибка очистки уведомлений:", error);
    };

    useEffect(() => {
        const fetchNotifications = async () => {
            const { data } = await supabase
                .from("notifications")
                .select("*")
                .order("created_at", { ascending: false });

            if (data) setNotifications(data);
        };

        fetchNotifications();

        const channel = supabase
            .channel("public.notifications")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "notifications" },
                (payload) => {
                    const newNotification = payload.new as INotification;
                    setNotifications((prev) => [newNotification, ...prev]);
                },
            )
            .on(
                "postgres_changes",
                { event: "UPDATE", schema: "public", table: "notifications" },
                (payload) => {
                    const updatedNotification = payload.new as INotification;
                    setNotifications((prev) =>
                        prev.map((n) =>
                            n.id === updatedNotification.id
                                ? updatedNotification
                                : n,
                        ),
                    );
                },
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase]);

    const unreadCount = notifications.filter((n) => !n.is_read).length;

    return {
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
    };
}
