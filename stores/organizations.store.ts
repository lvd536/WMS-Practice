import { IOrganization } from "@/types/organization.types";
import { create } from "zustand";

interface IOrganizationStore {
    organizations: IOrganization[];
    currentOrganization: IOrganization | null;

    setOrganizations: (orgs: IOrganization[]) => void;
    setCurrentOrganization: (org: IOrganization) => void;
}

export const useOrganizationsStore = create<IOrganizationStore>()((set) => ({
    currentOrganization: null,
    organizations: [],
    setCurrentOrganization: (org) => {
        set({ currentOrganization: org });
    },
    setOrganizations: (orgs) => {
        set({ organizations: orgs });
    },
}));
