import { LucideIcon } from "lucide-react";
import { Link } from "next-view-transitions";

interface IProps {
    title: string;
    description?: string;
    Icon: LucideIcon;
    href: string;
}

export default function MainCard({ title, description, Icon, href }: IProps) {
    return (
        <Link
            href={href}
            className="border bg-card p-8 rounded-xl border-solid border-[#c7c4d8] max-w-78"
        >
            <Icon className="w-12 h-12 p-3 bg-[#e5eeff] rounded-md stroke-[#3525cd]" />
            <h1 className="mt-6 mb-2 font-semibold text-2xl leading-[140%] text-foreground">
                {title}
            </h1>
            {description && (
                <p className="font-normal text-base leading-[160%] text-[#464555]">
                    {description}
                </p>
            )}
        </Link>
    );
}
