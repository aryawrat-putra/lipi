import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
    return (
        <div className="grid place-items-center size-full min-h-96">
            <Spinner aria-label="Loading" />
        </div>
    )
}