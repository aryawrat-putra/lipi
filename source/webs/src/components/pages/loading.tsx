import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"
import { Spinner } from "@/components/ui/spinner"

export default function LoadingPage() {
    return (
        <Empty className="w-full">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <Spinner />
                </EmptyMedia>
                <EmptyTitle>Loading the content</EmptyTitle>
                <EmptyDescription>
                    Please wait while we load your content.
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    )
}