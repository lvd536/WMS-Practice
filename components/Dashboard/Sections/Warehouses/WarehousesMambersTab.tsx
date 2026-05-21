import { TabsContent } from "@/components/ui/tabs";
import MemberCard from "../Organizations/Member/MemberCard";
import { IMember } from "@/types/warehouse.types";

interface IProps {
    members: IMember[];
    canEdit: boolean;
}

export default function WarehousesMambersTab({ members, canEdit }: IProps) {
    return (
        <TabsContent value="Members">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.isArray(members) &&
                    members.map((member) => (
                        <MemberCard
                            key={member.id}
                            member={member}
                            canEdit={canEdit}
                        />
                    ))}
            </div>
        </TabsContent>
    );
}
