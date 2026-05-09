"use client";
import EditProfileModal from "@/components/EditProfileModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useUserStore } from "@/stores/user.store";
import { ArrowLeft, Box } from "lucide-react";
import { Link } from "next-view-transitions";

export default function Home() {
    const user = useUserStore((s) => s.user);

    if (!user || !user.email || !user.name) return <div>Unauthorized</div>;
    
    return (
        <div className="flex flex-col w-full h-screen items-center justify-center container">
            <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-3 font-semibold text-2xl leading-[140%] text-[#0b1c30]">
                    <Box className="w-5.5 stroke-[#3525cd]" /> WMS Dashboard
                </div>
                <Link href="/profile">
                    <Avatar>
                        <AvatarImage src={user?.avatar_url ?? undefined} />
                        <AvatarFallback className="text-3xl">
                            {user.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </Link>
            </div>
            <h1 className="w-full text-start font-bold text-[40px] leading-[120%] tracking-[-0.02em] text-[#0b1c30] mt-12 mb-8">
                Welcome back, {user.name}!
            </h1>
            <div className="grid w-full sm:grid-cols-2 gap-6">
                <Card className="p-6 backdrop-blur-md shadow-[0_10px_30px_0_rgba(0,0,0,0.04)]">
                    <h1 className="font-semibold text-2xl leading-[140%] text-foreground">
                        Warehouse inventory
                    </h1>
                    <p className="font-normal text-base leading-[160%] text-[#464555]">
                        Current stock: 1228 items
                    </p>
                    <Button className="self-start p-2 px-3 h-fit shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)]">
                        <ArrowLeft />
                        View inventory
                    </Button>
                </Card>
                <Card className="p-6 backdrop-blur-md shadow-[0_10px_30px_0_rgba(0,0,0,0.04)]">
                    <h1 className="font-semibold text-2xl leading-[140%] text-foreground">
                        My Profile
                    </h1>
                    <p className="font-normal text-base leading-[160%] text-[#464555]">
                        {`${user.name} | ${user.email} ${user.phone && `| ${user.phone}`}`}
                    </p>
                    <EditProfileModal triggerClassName="self-start p-2 px-3 h-fit shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)] bg-[#fe6b00] text-foreground" />
                </Card>
            </div>
        </div>
    );
}
