import type { PropsWithChildren } from "react"
import { Badge } from "@/components/ui/badge";
import { type LucideIcon } from "lucide-react";

type props = {
    badge: string;
    headline: string;
    subheading: string;
    BadgeIcon: LucideIcon;
} & PropsWithChildren;

export default function SectionContainer({ children, badge, headline, subheading, BadgeIcon }: props) {
    return (
        <section className="py-4 text-center">
            <Badge variant="outline" className="text-sm text-muted-foreground bg-muted shadow-xl border border-border">
                <BadgeIcon />
                {badge}
            </Badge>
            <h1 className="mt-4 text-5xl leading-14 -tracking-wider font-semibold md:w-2/3 w-full text-pretty mx-auto text-gray-900">{headline}</h1>
            <p className="mt-5 text-lg text-muted-foreground tracking-wide md:w-2/3 w-full mx-auto">{subheading}</p>
            <div className="mt-6">
                {children}
            </div>
        </section>
    )
}
