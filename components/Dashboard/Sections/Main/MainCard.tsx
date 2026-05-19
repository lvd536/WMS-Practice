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
            className="border bg-card p-8 rounded-xl border-solid border-border max-w-78"
        >
            <Icon className="w-12 h-12 p-3 bg-accent rounded-md stroke-primary" />
            <h1 className="mt-6 mb-2 font-semibold text-2xl leading-[140%] text-foreground">
                {title}
            </h1>
            {description && (
                <p className="font-normal text-base leading-[160%] text-muted-foreground">
                    {description}
                </p>
            )}
        </Link>
    );
}
