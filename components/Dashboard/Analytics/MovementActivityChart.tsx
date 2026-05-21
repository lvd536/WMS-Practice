"use client";

import {
    ResponsiveContainer,
    ComposedChart,
    Area,
    Bar,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { IMovementDataPoint } from "@/types/analytics.types";
import { Activity } from "lucide-react";

interface IProps {
    data: IMovementDataPoint[];
    title?: string;
    description?: string;
}

export default function MovementActivityChart({
    data,
    title = "Warehouse Activity",
    description = "Full overview of all inventory operations",
}: IProps) {
    return (
        <Card className="border-slate-200 shadow-sm rounded-xl bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
                <div className="space-y-1">
                    <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                        <Activity className="w-4 h-4 text-indigo-500" />
                        {title}
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-500">
                        {description}
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart
                            data={data}
                            margin={{
                                top: 10,
                                right: 10,
                                left: -20,
                                bottom: 0,
                            }}
                        >
                            <defs>
                                <linearGradient
                                    id="colorReceive"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="#10b981"
                                        stopOpacity={0.15}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#10b981"
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="var(--border)"
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
                                contentStyle={{
                                    backgroundColor: "var(--card)",
                                    color: "var(--card-foreground)",
                                    borderRadius: "8px",
                                    border: "1px solid var(--border)",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                                }}
                                labelStyle={{
                                    fontWeight: "bold",
                                    fontSize: "12px",
                                    color: "var(--foreground)",
                                }}
                            />
                            <Legend
                                iconType="circle"
                                iconSize={8}
                                wrapperStyle={{
                                    fontSize: "11px",
                                    paddingTop: "15px",
                                }}
                            />

                            <Area
                                name="Received"
                                type="monotone"
                                dataKey="receive"
                                stroke="#10b981"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorReceive)"
                            />

                            <Line
                                name="Moved internally"
                                type="monotone"
                                dataKey="move"
                                stroke="#6366f1"
                                strokeWidth={2.5}
                                dot={false}
                                activeDot={{ r: 5 }}
                            />

                            <Line
                                name="Adjustments"
                                type="monotone"
                                dataKey="adjustment"
                                stroke="#f59e0b"
                                strokeWidth={1.5}
                                strokeDasharray="4 4"
                                dot={false}
                            />

                            <Bar
                                name="Written off"
                                dataKey="writeoff"
                                barSize={16}
                                radius={[4, 4, 0, 0]}
                                fill="#f43f5e"
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
