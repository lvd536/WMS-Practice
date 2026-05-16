"use client";

import { useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useNotifications } from "@/hooks/useNotifications";
import { Bell, CheckCheck, Inbox, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { acceptOrganizationInvitation } from "@/actions/organization.actions";

export default function Notifications({ children }: React.PropsWithChildren) {
    const { notifications, unreadCount, markAllAsRead, markAsRead } =
        useNotifications();
    const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);

    const handleAcceptInvite = async (
        e: React.MouseEvent,
        entityId: number,
        notificationId: string,
        isRead: boolean,
    ) => {
        e.stopPropagation();

        setActionLoadingId(entityId);
        try {
            const result = await acceptOrganizationInvitation(entityId);

            if (result && "status" in result && result.status === "error") {
                console.error(result.message);
            } else {
                if (!isRead) {
                    await markAsRead(notificationId);
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setActionLoadingId(null);
        }
    };

    return (
        <Popover modal={true}>
            <PopoverTrigger asChild>
                {children || (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative h-9 w-9 rounded-lg text-sidebar-foreground transition-colors duration-300 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    >
                        <Bell className="h-5 w-5" />
                        {unreadCount > 0 && (
                            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-sidebar-primary text-[10px] font-semibold text-sidebar-primary-foreground shadow-sm animate-in zoom-in-50">
                                {unreadCount}
                            </span>
                        )}
                    </Button>
                )}
            </PopoverTrigger>

            <PopoverContent
                align="end"
                className="w-80 overflow-hidden rounded-lg border border-sidebar-border bg-sidebar p-0 text-sidebar-foreground shadow-xl"
            >
                <PopoverHeader className="flex flex-row items-center justify-between space-y-0 border-b border-sidebar-border p-4 pb-2">
                    <div className="flex flex-col gap-0.5">
                        <PopoverTitle className="text-base font-semibold text-sidebar-foreground">
                            Уведомления
                        </PopoverTitle>
                        <PopoverDescription className="text-xs text-sidebar-foreground/60">
                            {unreadCount > 0
                                ? `У вас ${unreadCount} новых сообщений`
                                : "Все уведомления прочитаны"}
                        </PopoverDescription>
                    </div>

                    {unreadCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 shrink-0 px-2 text-xs text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                            onClick={markAllAsRead}
                        >
                            <CheckCheck className="mr-1.5 h-3.5 w-3.5" />
                            Все
                        </Button>
                    )}
                </PopoverHeader>

                <div className="flex max-h-87.5 flex-col divide-y divide-sidebar-border overflow-y-auto scrollbar-thin">
                    {notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center px-4 py-8 text-center text-sidebar-foreground/60">
                            <Inbox className="mb-2 h-8 w-8 stroke-[1.5]" />
                            <p className="text-xs font-medium">Список пуст</p>
                        </div>
                    ) : (
                        notifications.map((item) => (
                            <div
                                key={item.id}
                                onClick={() =>
                                    !item.is_read && markAsRead(item.id)
                                }
                                className={cn(
                                    "relative flex gap-2.5 items-start p-4 text-left text-xs transition-colors",
                                    !item.is_read
                                        ? "cursor-pointer bg-sidebar-accent/70 font-medium hover:bg-sidebar-accent"
                                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50",
                                )}
                            >
                                {!item.is_read && (
                                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-sidebar-primary" />
                                )}

                                <div className="flex w-full flex-col gap-1">
                                    <div className="flex items-baseline justify-between gap-2">
                                        <p
                                            className={cn(
                                                "truncate text-sidebar-foreground",
                                                !item.is_read &&
                                                    "font-semibold",
                                            )}
                                        >
                                            {item.title}
                                        </p>
                                        <span className="shrink-0 text-[10px] text-sidebar-foreground/60">
                                            {new Date(
                                                item.created_at,
                                            ).toLocaleDateString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </span>
                                    </div>

                                    <p className="wrap-break-words text-[11px] leading-relaxed text-sidebar-foreground/70">
                                        {item.message}
                                    </p>

                                    {item.type === "invite" && (
                                        <div className="mt-2 flex items-center gap-2">
                                            <Button
                                                size="xs"
                                                className="bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                                                onClick={(e) => {
                                                    handleAcceptInvite(
                                                        e,
                                                        item.entity_id!,
                                                        item.id,
                                                        item.is_read,
                                                    );
                                                }}
                                            >
                                                {actionLoadingId ===
                                                item.entity_id ? (
                                                    <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                                                ) : (
                                                    <Check className="mr-1 h-3 w-3" />
                                                )}
                                                Принять
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}
