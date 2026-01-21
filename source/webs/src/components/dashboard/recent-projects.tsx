import { useQuery } from '@tanstack/react-query';

import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { FileClock } from "lucide-react";

import ProjectCard from '@/components/cards/project-card';
import Loading from '@/components/non-interactive/loader';
import SomethingWentWrong from '@/components/non-interactive/error';

import { getAllProjects } from '@/services/project';

function RecentProjects() {
    const { isPending, error, data, isSuccess } = useQuery({
        queryKey: ['recent-projects'],
        queryFn: () => getAllProjects({
            limit: 8,
            page: 1,
            sortBy: 'updatedAt',
            sortOrder: 'desc'
        }),
    });

    if (isPending) return <Loading />
    if (error) return <SomethingWentWrong />

    if (!isPending && isSuccess)
        return (
            data?.data?.length! < 1 ? (
                <Empty className="my-16">
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <FileClock />
                        </EmptyMedia>
                        <EmptyTitle>No Documents Yet</EmptyTitle>
                        <EmptyDescription>
                            You haven&apos;t created any documents yet. Get started by creating
                            your first document.
                        </EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent>
                        <Button
                        // disabled={createDocument.isPending}
                        // onClick={() => createDocument.mutate()}
                        >
                            Create Document
                        </Button>
                    </EmptyContent>
                </Empty>
            ) : (
                <main className="min-h-screen py-4 space-y-8">
                    <div className="max-w-7xl mx-auto space-y-2">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8 max-sm:flex-wrap max-sm:gap-2">
                            <h1 className="text-xl max-md:w-full md:text-2xl">
                                Recently Used Projects
                            </h1>
                        </div>

                        {/* Documents Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {data.data!.map((p) => (
                                <ProjectCard key={p.id} {...p} />
                            ))}
                        </div>
                    </div>
                </main>
            )
        );
}

export default RecentProjects