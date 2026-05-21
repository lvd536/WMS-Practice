"use client";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Cell,
} from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { IMovementDataPoint } from "@/types/analytics.types";
import { Trash2 } from "lucide-react";

interface IProps {
    data: IMovementDataPoint[];
    title?: string;
}

export default function WriteOffChart({
    data,
    title = "Losses & Write-offs",
}: IProps) {
    return (
        <Card className="border-slate-200 shadow-sm rounded-xl bg-card">
            <CardHeader className="pb-6">
                <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                    <Trash2 className="w-4 h-4 text-rose-500" />
                    {title}
                </CardTitle>
                <CardDescription className="text-xs text-slate-500">
                    Deleted & written off products history
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            margin={{
                                top: 10,
                                right: 10,
                                left: -20,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="#f1f5f9"
                            />
                            <XAxis
                                dataKey="date"
                                stroke="#94a3b8"
                                fontSize={11}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#94a3b8"
                                fontSize={11}
                                tickLine={false}
                                axisLine={false}
                            />
                            <Tooltip
                                cursor={{ fill: "var(--muted)" }}
                                contentStyle={{
                                    backgroundColor: "var(--card)",
                                    color: "var(--card-foreground)",
                                    borderRadius: "8px",
                                    border: "1px solid var(--border)",
                                }}
                            />
                            <Bar
                                name="Written off"
                                dataKey="writeoff"
                                radius={[4, 4, 0, 0]}
                                fill="var(--foreground)"
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={
                                            entry.writeoff > 10
                                                ? "#f43f5e"
                                                : "#fda4af"
                                        }
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
