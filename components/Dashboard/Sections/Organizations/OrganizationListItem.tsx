"use client";

import { Button } from "@/components/ui/button";
import { useOrganizationsStore } from "@/stores/organizations.store";
import { IOrganization } from "@/types/organization.types";
import { Van, Edit2 } from "lucide-react";
import { useState } from "react";
import OrganizationModal from "./OrganizationModal/OrganizationModal";
import { useUserRole } from "@/hooks/useUserRole";
import { Skeleton } from "@/components/ui/skeleton";

interface IProps {
    organization: IOrganization;
}

export default function OrganizationListItem({ organization }: IProps) {
    const { role, loading } = useUserRole(organization.id);
    const { currentOrganization, setCurrentOrganization } =
        useOrganizationsStore();
    const [isEditOpen, setIsEditOpen] = useState(false);

    return (
        <>
            <li className="flex flex-col relative p-6 backdrop-blur-[20px] shadow-[0_10px_30px_0_rgba(0,0,0,0.04)] bg-card border rounded-xl border-solid border-[rgba(199,196,216,0.5)]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[rgba(53,37,205,0.05)] rounded-[0_1100px_0_9999px]" />
                {role === "admin" ||
                    (role === "owner" && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-4 right-4 z-10 hover:bg-slate-100 rounded-full"
                            onClick={() => setIsEditOpen(true)}
                        >
                            <Edit2 className="w-4 h-4 text-slate-500" />
                        </Button>
                    ))}

                <div className="flex items-start justify-between">
                    <Van className="border w-12 h-12 bg-[#e5eeff] rounded-lg border-solid border-[rgba(199,196,216,0.3)] stroke-[#3525cd] p-2.5 shrink-0" />
                    {loading ? (
                        <Skeleton className="w-18.75 h-5.25 px-3 py-1 rounded-full ml-1 mr-10" />
                    ) : (
                        <p className="bg-[rgba(79,70,229,0.15)] font-semibold text-[13px] leading-[100%] tracking-wider uppercase text-[#3525cd] px-3 py-1 rounded-full ml-1 mr-10">
                            {role}
                        </p>
                    )}
                </div>
                <h2 className="font-semibold text-2xl leading-[140%] text-foreground mt-4">
                    {organization.name}
                </h2>
                {organization.description && (
                    <p className="w-full leading-[160%] text-[#464555] mt-2 pb-6 border-b-[rgba(199,196,216,0.3)] border-b border-solid wrap-break-word">
                        {organization.description}
                    </p>
                )}
                <Button
                    type="button"
                    className="mt-6 self-end shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] bg-[#3525cd] px-6 py-2 rounded-lg font-semibold text-[13px] leading-[100%] tracking-wider uppercase text-center text-white"
                    disabled={organization.id === currentOrganization?.id}
                    onClick={() => setCurrentOrganization(organization)}
                >
                    {organization.id === currentOrganization?.id
                        ? "Selected"
                        : "Select"}
                </Button>
            </li>

            {isEditOpen && (
                <OrganizationModal
                    isOpen={isEditOpen}
                    onClose={() => setIsEditOpen(false)}
                    initialData={organization}
                />
            )}
        </>
    );
}
