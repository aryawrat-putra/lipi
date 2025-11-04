import { Link } from "react-router";

import { AlertTriangle, Home, RotateCcw } from "lucide-react";

import { Button } from "@repo/ui/components/button"

export default function ErrorPage() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="p-8 max-w-md">
                {/* Icon */}
                <div className="mb-6 flex justify-center">
                    <div className="size-16 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center justify-center">
                        <AlertTriangle className="w-8 h-8 text-destructive" />
                    </div>
                </div>

                {/* Error code */}
                <div className="text-center mb-6">
                    <div className="text-5xl font-bold text-foreground">500</div>
                </div>

                {/* Title and description */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-semibold text-foreground mb-2">Server Error</h1>
                    <p className="text-muted-foreground text-sm leading-relaxed">Something went wrong on our end. We are working on a fix.</p>
                </div>

                {/* Action buttons */}
                <div className="space-y-4 mb-6">
                    <Button
                        onClick={() => window.location.reload()}
                        className="w-full cursor-pointer gap-3"
                        variant='destructive'
                        size='sm'
                    >
                        <RotateCcw className="size-4" /> Try Again
                    </Button>
                    <Button
                        className="w-full cursor-pointer gap-3"
                        variant='outline'
                        size='sm'
                        asChild
                    >
                        <Link to='/'>
                            <Home className="size-4" />
                            Go Home
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}