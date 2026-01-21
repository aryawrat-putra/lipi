import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useMutation, useQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/(auth)/_layout/dashboard')({
  component: DashboardPage,
})

import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { FileClock, FilePlus } from "lucide-react";
import { toast } from "sonner"
import DocumentCard from '@/components/cards/document-card';
import Loading from '@/components/non-interactive/loader';
import SomethingWentWrong from '@/components/non-interactive/error';

import { getAllDocs, postDoc } from '@/services/document';
import CreateProjectForm from '@/components/forms/project';
import RecentProjects from '@/components/dashboard/recent-projects';

function DashboardPage() {
  const navigate = useNavigate({ from: '/dashboard' });

  const createDocument = useMutation({
    mutationKey: ['create-document'],
    mutationFn: () => postDoc(),
    onSuccess: ({ data }) => {
      // ? Navigate user to doc link
      navigate({ to: `/docs/$docId`, params: { docId: data![0].id! } });

      // ? Inform user
      toast.success("Your Document has been created");
    },
    onError: (e) => {
      console.error('Failed to create doc!!!')
      console.error(e);

      toast.error("Failed to create document");

    }
  })

  const { isPending, error, data, isSuccess } = useQuery({
    queryKey: ['recent-documents'],
    queryFn: () => getAllDocs({
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
              disabled={createDocument.isPending}
              onClick={() => createDocument.mutate()}
            >Create Document</Button>
          </EmptyContent>
        </Empty>
      ) : (
        <main className="min-h-screen py-4 space-y-8">
          <div className="max-w-7xl mx-auto space-y-2">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 max-sm:flex-wrap max-sm:gap-2">
              <h1 className="text-xl max-md:w-full md:text-2xl">
                Recently Used Documents
              </h1>

              <div className="flex items-center gap-2 md:gap-4 max-sm:w-full max-sm:justify-between">

                <CreateProjectForm />
                <Button
                  variant='secondary'
                  disabled={createDocument.isPending}
                  onClick={() => createDocument.mutate()}
                >
                  <FilePlus />
                  New Document
                </Button>
              </div>
            </div>

            {/* Documents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.data!.map((doc) => (
                <DocumentCard key={doc.id} {...doc} />
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <RecentProjects />
        </main>
      )
    );
}