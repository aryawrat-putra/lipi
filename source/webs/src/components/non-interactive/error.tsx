import { Card, CardHeader } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export default function SomethingWentWrong() {
    return (
        <div className="grid place-items-center size-full min-h-96">
            <Card className="bg-danger-50 shadow-2xl border border-destructive-foreground">
                <CardHeader className="flex gap-4">
                    <AlertTriangle className="size-12 text-destructive-foreground" />
                    <div className="flex flex-col">
                        <p className="text-lg text-destructive-foreground/70">Something went wrong</p>
                        <p className="text-small text-destructive-foreground/50">Please try again later or refresh the page.</p>
                    </div>
                </CardHeader>
            </Card>
        </div>
    )
}