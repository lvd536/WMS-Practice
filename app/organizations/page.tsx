"use client";
import OrganizationListItem from "@/components/Dashboard/Sections/Organizations/OrganizationListItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOrganizationsStore } from "@/stores/organizations.store";
import { Plus, Warehouse } from "lucide-react";
import { useState } from "react";

export default function Organizations() {
    const [searchValue, setSearchValue] = useState<string>("");
    const organizations = useOrganizationsStore((s) => s.organizations);
    const filteredOrganizations = organizations
        ? searchValue.length > 1
            ? organizations.filter(
                  (org) =>
                      org.name
                          .toLowerCase()
                          .includes(searchValue.toLowerCase()) ||
                      (org.description || "")
                          .toLowerCase()
                          .includes(searchValue.toLowerCase()),
              )
            : organizations
        : [];

    if (!organizations) return null;

    return (
        <section
            id="organizations"
            className="flex flex-col items-center justify-center container mt-6.25 max-w-6xl"
        >
            <Warehouse className="w-16 h-16 bg-[#3525cd] stroke-white p-4.25 rounded-xl" />
            <h1 className="font-bold text-[40px] leading-[120%] tracking-[-0.02em] text-center text-foreground my-3.75">
                Select organization
            </h1>
            <p className="text-lg leading-[160%] text-center text-[#464555]">
                Choose an organization to continue to the WMS Dashboard, or
                create a new one.
            </p>
            <div className="flex w-full items-center justify-between my-14.25">
                <Input
                    type="search"
                    className="
                            h-11
                            w-[320px]
                            border-slate-300/70
                            bg-white/50
                            text-slate-700
                            placeholder:text-slate-400
                            shadow-sm
                            backdrop-blur-sm
                            focus-visible:border-indigo-500
                            focus-visible:ring-indigo-500/20
                        "
                    placeholder="Search organizations..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <Button
                    variant="outline"
                    className="
                        h-11
                        border-slate-300/70
                        bg-white/40
                        px-5
                        text-slate-700
                        shadow-sm
                        backdrop-blur-sm
                        transition-colors
                        hover:border-indigo-400
                        hover:bg-indigo-50
                        hover:text-indigo-700
                    "
                >
                    <Plus />
                    Create organization
                </Button>
            </div>
            <ul className="flex flex-wrap gap-5">
                {filteredOrganizations.map((org) => (
                    <OrganizationListItem key={org.id} organization={org} />
                ))}
            </ul>
        </section>
    );
}
