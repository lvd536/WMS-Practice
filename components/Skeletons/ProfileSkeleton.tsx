"use client";

import { Skeleton } from "../ui/skeleton";

export default function ProfileSkeleton() {
    return (
        <section
            id="profile"
            className="w-full flex flex-col gap-8 items-center justify-between mt-8 container mx-auto"
        >
            <Skeleton className="relative w-full h-90 pt-0! shadow-[0_10px_30px_0_rgba(0,0,0,0.04)] border-solid border-border bg-transparent">
                <Skeleton className="w-full h-1/2 bg-gray-400" />
                <Skeleton className="absolute left-10 bottom-32 px-8 w-32 h-32 bg-gray-500 rounded-full" />
                <div className="flex items-center justify-between mt-15 px-6">
                    <Skeleton className="w-40 h-8 bg-gray-500" />
                    <Skeleton className="w-40 h-8 bg-gray-500" />
                </div>
            </Skeleton>
            <div className="w-full grid grid-cols-2 gap-8">
                <Skeleton className="p-8 shadow-[0_10px_30px_0_rgba(0,0,0,0.04)] border-solid border-border bg-gray-400">
                    <Skeleton className="bg-gray-500 w-64 h-7 mb-6" />
                    <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="space-y-2">
                                <Skeleton className="bg-gray-500 w-64 h-7" />
                                <Skeleton className="bg-gray-500 w-60 h-5" />
                            </div>
                        ))}
                    </div>
                </Skeleton>
                <Skeleton className="p-8 shadow-[0_10px_30px_0_rgba(0,0,0,0.04)] border-solid border-border bg-gray-400">
                    <Skeleton className="bg-gray-500 w-64 h-7 mb-6" />
                    <div className="space-y-2">
                        <Skeleton className="bg-gray-500 w-64 h-7" />
                        <Skeleton className="bg-gray-500 w-60 h-5" />
                    </div>
                </Skeleton>
            </div>
        </section>
    );
}
