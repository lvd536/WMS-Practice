"use client";

import OrganizationDialog from "./OrganizationDialog";
import { IOrganization } from "@/types/organization.types";

interface IOrganizationModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: IOrganization | null;
}

export default function OrganizationModal(props: IOrganizationModalProps) {
    return <OrganizationDialog {...props} />;
}
