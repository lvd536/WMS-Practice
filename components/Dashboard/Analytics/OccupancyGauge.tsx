"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Box, Scale } from "lucide-react";

interface IOccupancyGaugeProps {
    currentWeight: number;
    maxWeight: number;
    currentVolume: number;
    maxVolume: number;
}

export default function OccupancyGauge({
    currentWeight,
    maxWeight,
    currentVolume,
    maxVolume,
}: IOccupancyGaugeProps) {
    const weightPercent = Math.min(
        Math.round((currentWeight / maxWeight) * 100),
        100,
    );
    const volumePercent = Math.min(
        Math.round((currentVolume / maxVolume) * 100),
        100,
    );

    return (
        <Card className="border-slate-200 shadow-sm rounded-xl bg-card space-y-6 p-5">
            <CardHeader className="p-0">
                <CardTitle className="text-sm font-semibold text-foreground">
                    Current Occupancy
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-5">
                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-500 flex items-center gap-1.5">
                            <Scale className="w-3.5 h-3.5 text-slate-400" />
                            Weight Usage
                        </span>
                        <span
                            className={
                                weightPercent > 90
                                    ? "text-red-500 font-bold"
                                    : "text-smuted"
                            }
                        >
                            {weightPercent}% ({currentWeight} / {maxWeight} kg)
                        </span>
                    </div>
                    <Progress value={weightPercent} className="h-2" />
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-500 flex items-center gap-1.5">
                            <Box className="w-3.5 h-3.5 text-slate-400" />
                            Volume Usage
                        </span>
                        <span
                            className={
                                volumePercent > 90
                                    ? "text-red-500 font-bold"
                                    : "text-slate-700"
                            }
                        >
                            {volumePercent}% ({currentVolume} / {maxVolume} m³)
                        </span>
                    </div>
                    <Progress value={volumePercent} className="h-2" />
                </div>
            </CardContent>
        </Card>
    );
}
