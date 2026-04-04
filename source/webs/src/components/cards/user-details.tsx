import { useQueries } from "@tanstack/react-query";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Loading from "@/components/non-interactive/loader";
import SomethingWentWrong from "@/components/non-interactive/error";

import { getUserDetailsById } from "@/services/user";

type Props = {
    userIds: string[];
};

export default function UserDetails({ userIds }: Props) {
    const queries = useQueries({
        queries: userIds.map((id) => ({
            queryKey: ["user", id],
            queryFn: () => getUserDetailsById(id),
        })),
    });

    const isPending = queries.some((q) => q.isPending);
    const isError = queries.some((q) => q.error);

    if (isPending) return <Loading />;
    if (isError) return <SomethingWentWrong />;

    const users = queries
        .map((q) => q.data?.data?.[0])
        .filter(Boolean);

    if (!users.length) return null;

    return (
        <div className="flex flex-col gap-3">
            {users.map((userDetails) => {
                const avatarFallback =
                    userDetails?.name
                        ?.split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2) ?? "?";

                if (userDetails) {
                    return (
                        <div
                            key={userDetails.id}
                            className="flex items-center gap-3"
                        >
                            <Avatar className="size-12">
                                <AvatarImage
                                    src={userDetails?.image ?? ""}
                                    alt={`${userDetails?.name}'s avatar`}
                                />
                                <AvatarFallback className="text-sm font-medium">
                                    {avatarFallback}
                                </AvatarFallback>
                            </Avatar>

                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-foreground">
                                    {userDetails.name || "Unknown User"}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    {userDetails.email || "Not found"}
                                </span>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <p className="text-xs font-medium">No user found</p>
                    )
                }
            })}
        </div>
    );
}