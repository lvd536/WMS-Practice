"use client";
import EditProfileModal from "@/components/Profile/EditProfileModal/EditProfileModal";
import ProfileSkeleton from "@/components/Skeletons/ProfileSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import {
    Field,
    FieldContent,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { useAuthStore } from "@/stores/auth.store";
import { useUserStore } from "@/stores/user.store";
import { Phone, SquareUser, User } from "lucide-react";
import Image from "next/image";

export default function Profile() {
    const { user } = useUserStore();
    const email = useAuthStore((s) => s.user?.email);

    if (!user || !user.name || !email) return <ProfileSkeleton />;
    return (
        <section
            id="profile"
            className="w-full flex flex-col gap-8 items-center justify-between mt-8 container mx-auto"
        >
            <Card className="relative w-full h-90 pt-0! shadow-[0_10px_30px_0_rgba(0,0,0,0.04)] border-solid border-border">
                <div className="w-full h-1/2 bg-stone-400">
                    {user.background_path && (
                        <Image
                            src={user.background_path}
                            alt="Background image"
                            width={1280}
                            height={720}
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>
                <div className="absolute bottom-14 px-8 w-full flex items-center justify-between ">
                    <div className="flex flex-col gap-8 items-start">
                        <Avatar className="w-32 h-32 border-4 border-solid border-white">
                            <AvatarImage src={user.avatar_path ?? undefined} />
                            <AvatarFallback className="text-3xl">
                                {user.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <p className="font-semibold text-3xl leading-[130%] tracking-[-0.01em] text-foreground">
                            {user.name}
                        </p>
                    </div>
                    <EditProfileModal />
                </div>
            </Card>
            <div className="w-full grid grid-cols-2 gap-8">
                <Card className="p-8 shadow-[0_10px_30px_0_rgba(0,0,0,0.04)] border-solid border-border">
                    <h1 className="flex items-center gap-2 font-semibold text-xl leading-[140%] text-foreground border-b-[#c7c4d8] border-b border-solid pb-2">
                        <User className="w-5 stroke-primary" /> Personal Info
                    </h1>
                    <FieldGroup>
                        <Field>
                            <FieldLabel className="leading-[150%] tracking-wider uppercase text-muted-foreground">
                                Full name
                            </FieldLabel>
                            <FieldContent>{user.name}</FieldContent>
                        </Field>
                        <Field>
                            <FieldLabel className="leading-[150%] tracking-wider uppercase text-muted-foreground">
                                Email
                            </FieldLabel>
                            <FieldContent>{email}</FieldContent>
                        </Field>
                        {user.about && (
                            <Field>
                                <FieldLabel className="leading-[150%] tracking-wider uppercase text-muted-foreground">
                                    About
                                </FieldLabel>
                                <FieldContent>{user.about}</FieldContent>
                            </Field>
                        )}
                    </FieldGroup>
                </Card>
                <Card className="p-8 shadow-[0_10px_30px_0_rgba(0,0,0,0.04)] border-solid border-border">
                    <h1 className="flex items-center gap-2 font-semibold text-xl leading-[140%] text-foreground border-b-[#c7c4d8] border-b border-solid pb-2">
                        <SquareUser className="w-5 stroke-secondary" />
                        Contact Info
                    </h1>
                    {user.phone && (
                        <Field>
                            <FieldLabel className="leading-[150%] tracking-wider uppercase text-muted-foreground">
                                Mobile Phone
                            </FieldLabel>
                            <FieldContent className="flex flex-row gap-1 items-center">
                                <Phone className="w-4" /> {user.phone}
                            </FieldContent>
                        </Field>
                    )}
                </Card>
            </div>
        </section>
    );
}
