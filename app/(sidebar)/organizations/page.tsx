"use client";
import OrganizationListItem from "@/components/Dashboard/Sections/Organizations/OrganizationListItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOrganizationsStore } from "@/stores/organizations.store";
import { Plus, Search } from "lucide-react";
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
        <section id="organizations" className="p-6 md:p-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                        Organizations
                    </h1>
                    <p className="text-slate-500 mt-1">
                        Select an organization or create a new one to get
                        started.
                    </p>
                </div>
                <Button className="h-10 gap-2">
                    <Plus size={18} />
                    Create organization
                </Button>
            </div>

            <div className="relative max-w-md">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                    type="search"
                    className="pl-10 h-10 border-slate-200"
                    placeholder="Search organizations..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </div>

            {filteredOrganizations.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredOrganizations.map((org) => (
                        <OrganizationListItem key={org.id} organization={org} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-xl text-slate-400">
                    <p>No organizations found</p>
                </div>
            )}
        </section>
    );
}
