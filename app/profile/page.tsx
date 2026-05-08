"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useUserStore } from "@/stores/user.store";
import { ArrowLeft, Pencil } from "lucide-react";
import { Link } from "next-view-transitions";
import Image from "next/image";

export default function Profile() {
    const { user } = useUserStore();
    if (!user || !user.name || !user.email)
        return <div>Error while loading profile</div>;
    return (
        <div>
            <div className="w-screen flex items-center justify-start gap-3 px-2 sm:px-5 md:px-10 py-4.75">
                <Link href={"/"}>
                    <ArrowLeft />
                </Link>
                <h1>Profile</h1>
            </div>
            <div className="w-full h-110 flex flex-col gap-8 items-center justify-between mt-8 container mx-auto">
                <Card className="relative w-full h-full pt-0!">
                    <div className="w-full h-1/2 bg-stone-400">
                        {user.background_url && (
                            <Image
                                src={user.background_url}
                                alt="Avatar image"
                                className="w-full h-full"
                            />
                        )}
                    </div>
                    <div className="absolute bottom-14 px-8 w-full flex items-center justify-between ">
                        <div className="flex flex-col gap-8 items-start">
                            <Avatar className="w-32 h-32 border-2">
                                <AvatarImage
                                    src={user.avatar_url ?? undefined}
                                />
                                <AvatarFallback className="text-3xl">
                                    {user.name.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <p>{user.name}</p>
                        </div>
                        <Button>
                            <Pencil /> Edit profile
                        </Button>
                    </div>
                </Card>
                <div className="w-full grid grid-cols-2 gap-8">
                    <Card className="p-8">Personal INfo</Card>
                    <Card className="p-8">COntact info</Card>
                </div>
            </div>
        </div>
    );
}
