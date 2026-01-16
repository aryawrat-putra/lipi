import Lock from "@/components/icons/Lock"
import { Copy, Plus, Share } from "lucide-react"
import type { PropsWithChildren } from "react"

function DesktopPreview({ children }: PropsWithChildren) {
    return (
        <div className="max-w-6xl mx-auto">
            <div className="aspect-video rounded-4xl border border-border shadow-2xl overflow-hidden bg-background">
                <div className="w-full h-fit flex items-center justify-between gap-2 py-3 px-6 border-b border-border">
                    <div className="flex items-center gap-2">
                        <div className="size-2.5 rounded-full bg-red-400"></div>
                        <div className="size-2.5 rounded-full bg-yellow-400"></div>
                        <div className="size-2.5 rounded-full bg-green-400"></div>
                    </div>
                    <p className="text-sm flex flex-nowrap items-center gap-1 text-muted-foreground font-bold">
                        <Lock className="size-4" /> lipi.ai
                    </p>
                    <div className="flex items-center gap-4">
                        <Share className="text-muted-foreground size-3" />
                        <Plus className="text-muted-foreground size-3" />
                        <Copy className="text-muted-foreground size-3" />
                    </div>
                </div>
                <div className="size-full overflow-hidden aspect-video">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DesktopPreview