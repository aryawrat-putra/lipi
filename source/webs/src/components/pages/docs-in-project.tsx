import { useNavigate, useParams, useSearch } from "@tanstack/react-router";

import { useQuery } from '@tanstack/react-query';

import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination"
import DocumentCard from '@/components/cards/document-card';
import { getAllDocsOfProjectId } from '@/services/document';
import Loading from '@/components/non-interactive/loader';
import SomethingWentWrong from '@/components/non-interactive/error';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { FileClock } from "lucide-react";
import CreateDocument from '@/components/forms/document';
import { cn } from "@/lib/utils";

function DocsInProject() {
    const navigate = useNavigate({ from: '/projects/$projectId' });
    let { projectId } = useParams({ from: '/(auth)/_layout/projects/$projectId' });
    const { page, search, sortBy, sortOrder, limit } = useSearch({ from: '/(auth)/_layout/projects/$projectId' });

    const { isPending, error, data, isSuccess } = useQuery({
        queryKey: [`documents-of-${projectId}`, page, search, sortBy, sortOrder, limit],
        queryFn: () => getAllDocsOfProjectId({
            id: projectId,
            params: { page, search, sortBy, sortOrder, limit }
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
                        <CreateDocument projectId={projectId} />
                    </EmptyContent>
                </Empty>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {data.data!.map((doc) => (
                            <DocumentCard key={doc.id} {...doc} />
                        ))}
                    </div>

                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    aria-disabled={!data.meta?.pagination?.hasPrevPage}
                                    className={cn(
                                        !data.meta?.pagination?.hasPrevPage && 'pointer-events-none opacity-50'
                                    )}
                                    onClick={() => {
                                        if (data.meta?.pagination?.hasPrevPage) {
                                            navigate({
                                                search: (prev) => ({ ...prev, page: data.meta?.pagination?.page! - 1 }),
                                                from: '/projects/$projectId'
                                            });
                                        }
                                    }}
                                />
                            </PaginationItem>

                            {Array.from({ length: data.meta?.pagination?.total || 0 }).map((_, idx) => {
                                const pageNum = idx + 1;
                                const currentPage = data.meta?.pagination?.page || 1;
                                const totalPages = data.meta?.pagination?.total || 1;

                                if (pageNum <= 3) {
                                    return (
                                        <PaginationItem
                                            key={pageNum}
                                            onClick={() => {
                                                navigate({
                                                    search: (prev) => ({ ...prev, page: pageNum }),
                                                    from: '/projects/$projectId'
                                                });
                                            }}
                                        >
                                            <PaginationLink isActive={currentPage === pageNum}>
                                                {pageNum}
                                            </PaginationLink>
                                        </PaginationItem>
                                    );
                                }

                                if (pageNum === 4 && totalPages > 6) {
                                    return (
                                        <PaginationItem key="ellipsis">
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    );
                                }

                                if (pageNum > totalPages - 3) {
                                    return (
                                        <PaginationItem
                                            key={pageNum}
                                            onClick={() => {
                                                navigate({
                                                    search: (prev) => ({ ...prev, page: pageNum }),
                                                    from: '/projects/$projectId'
                                                });
                                            }}
                                        >
                                            <PaginationLink isActive={currentPage === pageNum}>
                                                {pageNum}
                                            </PaginationLink>
                                        </PaginationItem>
                                    );
                                }

                                return null;
                            })}

                            <PaginationItem>
                                <PaginationNext
                                    aria-disabled={!data.meta?.pagination?.hasNextPage}
                                    className={cn(
                                        !data.meta?.pagination?.hasNextPage && 'pointer-events-none opacity-50'
                                    )}
                                    onClick={() => {
                                        if (data.meta?.pagination?.hasNextPage) {
                                            navigate({
                                                search: (prev) => ({ ...prev, page: data.meta?.pagination?.page! + 1 }),
                                                from: '/projects/$projectId'
                                            });
                                        }
                                    }}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </>
            )
        );
}

export default DocsInProject