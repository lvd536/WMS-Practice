"use client";

import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useNotifications } from "@/hooks/useNotifications";
import { Bell, CheckCheck, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Notifications() {
    const { notifications, unreadCount, markAllAsRead, markAsRead } =
        useNotifications();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative w-9 h-9 rounded-full transition-colors duration-300"
                >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground font-semibold shadow-sm animate-in zoom-in-50">
                            {unreadCount}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>

            <PopoverContent
                align="end"
                className="w-80 p-0 flex flex-col shadow-lg border"
            >
                <PopoverHeader className="p-4 pb-2 border-b flex flex-row items-center justify-between space-y-0">
                    <div className="flex flex-col gap-0.5">
                        <PopoverTitle className="text-base font-semibold">
                            Уведомления
                        </PopoverTitle>
                        <PopoverDescription className="text-xs text-muted-foreground">
                            {unreadCount > 0
                                ? `У вас ${unreadCount} новых сообщений`
                                : "Все уведомления прочитаны"}
                        </PopoverDescription>
                    </div>
                    {unreadCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground shrink-0"
                            onClick={markAllAsRead}
                        >
                            <CheckCheck className="mr-1.5 h-3.5 w-3.5" />
                            Все
                        </Button>
                    )}
                </PopoverHeader>

                <div className="max-h-87.5 overflow-y-auto flex flex-col divide-y divide-border scrollbar-thin">
                    {notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 px-4 text-center text-muted-foreground">
                            <Inbox className="h-8 w-8 mb-2 stroke-[1.5]" />
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
                                    "p-4 text-xs transition-colors relative flex gap-2.5 items-start text-left",
                                    !item.is_read
                                        ? "bg-blue-50/50 dark:bg-blue-950/20 hover:bg-blue-50/80 dark:hover:bg-blue-950/30 font-medium cursor-pointer"
                                        : "text-muted-foreground hover:bg-muted/50",
                                )}
                            >
                                {!item.is_read && (
                                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                                )}

                                <div
                                    className={cn(
                                        "flex flex-col gap-1 w-full",
                                        item.is_read && "pl-4.5",
                                    )}
                                >
                                    <div className="flex justify-between items-baseline gap-2">
                                        <p
                                            className={cn(
                                                "text-foreground truncate",
                                                !item.is_read &&
                                                    "font-semibold",
                                            )}
                                        >
                                            {item.title}
                                        </p>
                                        <span className="text-[10px] text-muted-foreground shrink-0">
                                            {new Date(
                                                item.created_at,
                                            ).toLocaleDateString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </span>
                                    </div>
                                    <p className="text-muted-foreground text-[11px] leading-relaxed wrap-break-words">
                                        {item.message}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}
