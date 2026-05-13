import { IOrganization } from "@/types/organization.types";
import { Van } from "lucide-react";

interface IProps {
    organization: IOrganization;
}

export default function OrganizationListItem({ organization }: IProps) {
    return (
        <li className="flex flex-col relative p-6 backdrop-blur-[20px] shadow-[0_10px_30px_0_rgba(0,0,0,0.04)] bg-white border rounded-xl border-solid border-[rgba(199,196,216,0.5)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[rgba(53,37,205,0.05)] rounded-[0_1100px_0_9999px]" />
            <div className="flex items-start justify-between">
                <Van className="border w-12 h-12 bg-[#e5eeff] rounded-lg border-solid border-[rgba(199,196,216,0.3)] stroke-[#3525cd] p-2.5" />
                <p className="bg-[rgba(79,70,229,0.15)] font-semibold text-[13px] leading-[100%] tracking-wider uppercase text-[#3525cd] px-3 py-1 rounded-full">
                    Owner
                </p>
            </div>
            <h2 className="font-semibold text-2xl leading-[140%] text-foreground mt-4">
                {organization.name}
            </h2>
            {organization.description && (
                <p className="w-full leading-[160%] text-[#464555] mt-2 pb-6 border-b-[rgba(199,196,216,0.3)] border-b border-solid">
                    {organization.description}
                </p>
            )}
            <button
                type="button"
                className="mt-6 self-end shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] bg-[#3525cd] px-6 py-2 rounded-lg font-semibold text-[13px] leading-[100%] tracking-wider uppercase text-center text-white"
            >
                Select
            </button>
        </li>
    );
}
