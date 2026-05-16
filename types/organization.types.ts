export interface IOrganization {
    id: number;
    name: string;
    description?: string | null;
    owner_id: string;

    created_at: string;
    updated_at?: string | null;
}

export type OrganizationRole = "owner" | "admin" | "member";

export interface IOrganizationMember {
    id: number;

    organization_id: number;
    user_id: string;

    role: OrganizationRole;

    created_at: string;
}

export type InvitationStatus = "pending" | "accepted" | "declined";

export interface IOrganizationInvitation {
    id: number;

    organization_id: number;
    user_id: string;

    invited_by?: string | null;

    status: InvitationStatus;

    created_at: string;
    responded_at?: string | null;
}

export interface IOrganizationStats {
    members_count: number;
    warehouses_count: number;
    racks_count: number;
    products_count: number;
}

export interface IOrganizationWithStats
    extends IOrganization, IOrganizationStats {}

export interface IOrganizationCreateData {
    name: string;
    description?: string | null;
}

export interface IOrganizationUpdateData {
    name?: string;
    description?: string | null;
}

export interface IOrganizationInviteUserData {
    organization_id: number;
    user_id: string;
    invited_by?: string | null;
}

export interface IOrganizationInvitationActionData {
    invitation_id: number;
    status: Exclude<InvitationStatus, "pending">;
}
