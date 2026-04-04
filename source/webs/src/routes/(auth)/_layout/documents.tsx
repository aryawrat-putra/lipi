import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'

import { documentPaginationAndFilters } from '../../../../../api/src/constants/types';
export const Route = createFileRoute('/(auth)/_layout/documents')({
  component: DocumentPage,
  validateSearch: (search) => documentPaginationAndFilters.parse(search),
})

import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { CalendarDays, FileClock, ShieldUser, SlidersHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination"
import DocumentCard from '@/components/cards/document-card';
import { useQuery } from '@tanstack/react-query';
import { getAllDocs } from '@/services/document';
import Loading from '@/components/non-interactive/loader';
import SomethingWentWrong from '@/components/non-interactive/error';
import { cn } from '@/lib/utils';
import CreateDocument from '@/components/forms/document';


function DocumentPage() {
  const navigate = useNavigate({ from: '/documents' });
  const { page, search, sortBy, sortOrder, limit } = useSearch({ from: '/(auth)/_layout/documents' });

  const { isPending, error, data, isSuccess } = useQuery({
    queryKey: ['all-documents', page, search, sortBy, sortOrder, limit],
    queryFn: () => getAllDocs({ page, search, sortBy, sortOrder, limit }),
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
            <CreateDocument />
          </EmptyContent>
        </Empty>
      ) : (
        <main className="min-h-screen py-4">
          <div className="max-w-7xl mx-auto space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 max-sm:flex-wrap max-sm:gap-2">
              <h1 className="text-xl max-md:w-full md:text-2xl">
                All Documents
              </h1>

              <div className="flex items-center gap-2 md:gap-4 max-sm:w-full max-sm:justify-between">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon">
                      <ShieldUser />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>Owned By</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={sortOrder}>
                      <DropdownMenuRadioItem value="me">Me</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="anyone">Anyone</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="not-me">Not me</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="secondary">
                      <SlidersHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={sortBy}>
                      <DropdownMenuRadioItem value="open-me">
                        Last Opened by me
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="modi-me">
                        Last Modified by me
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="modi">
                        Last Modified
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="name">
                        Name
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="outline">
                  <CalendarDays />
                  <span className="max-md:hidden">Filter By Date</span>
                </Button>

                <CreateDocument />
              </div>
            </div>

            {/* Documents Grid */}
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
                          from: '/documents'
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
                            from: '/documents'
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
                            from: '/documents'
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
                          from: '/dashboard'
                        });
                      }
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </main>
      )
    );
}
