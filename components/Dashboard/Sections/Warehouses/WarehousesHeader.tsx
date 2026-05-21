import InviteMemberModal from "../Organizations/Member/InviteMemberModal/InviteMemberModal";
import WarehousesHeaderActions from "./WarehousesHeaderActions";

interface IProps {
    organizationId: number;
    canEdit: boolean;
}

export default function WarehousesHeader({ organizationId, canEdit }: IProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Active Warehouses
                </h1>
                <p className="text-muted-foreground mt-1">
                    Manage and monitor operational warehouses across your
                    network.
                </p>
            </div>

            <InviteMemberModal orgId={organizationId} canEdit={canEdit} />

            <WarehousesHeaderActions orgId={organizationId} canEdit={canEdit} />
        </div>
    );
}
