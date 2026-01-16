import { type LucideIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import type { Dispatch, HTMLProps, SetStateAction } from "react";

type props = {
    Icon: LucideIcon;
    index: number;
    title: string;
    detail: string;
    isPaid: boolean;
    selected: boolean;
    select: Dispatch<SetStateAction<number>>;
} & HTMLProps<HTMLButtonElement>;

function FeatureCard({ Icon, detail, isPaid, title, selected = false, index, select }: props) {
    return (
        <button className="group size-full flex-1 p-4 text-center space-y-2 cursor-pointer" onClick={() => { select(index) }}>
            {selected ? (
                <span className="bg-primary rounded-lg w-fit mx-auto block px-4 py-2 border border-border shadow-2xl transition-colors ease-in-out">
                    <Icon className="size-4 mx-auto text-primary-foreground transition-colors ease-in-out" />
                </span>
            ) : (
                <span className="bg-muted group-hover:bg-primary/10 rounded-lg w-fit mx-auto block px-4 py-2 border border-border group-hover:border-primary shadow-2xl transition-colors ease-in-out">
                    <Icon className="size-4 mx-auto text-muted-foreground group-hover:text-primary transition-colors ease-in-out" />
                </span>
            )}
            <h1 className="flex flex-nowrap gap-1.5 justify-center truncate text-sm font-semibold tracking-tight">
                {title}
                {isPaid ? <Badge className="rounded-lg">Pro</Badge> : <Badge className="rounded-lg" variant={'secondary'}>Free</Badge>}
            </h1>
            <p className="text-xs mt-1">{detail}</p>
        </button>
    )
}

export default FeatureCard