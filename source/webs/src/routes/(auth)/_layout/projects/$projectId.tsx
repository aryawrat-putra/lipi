import { createFileRoute, useParams } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';

import { documentPaginationAndFilters } from '../../../../../../api/src/constants/types';
export const Route = createFileRoute('/(auth)/_layout/projects/$projectId')({
  component: RouteComponent,
  validateSearch: (search) => documentPaginationAndFilters.parse(search),
})

import { toast } from "sonner"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import CreateProjectForm from '@/components/forms/project';
import { getProjectById } from '@/services/project';
import Loading from '@/components/non-interactive/loader';
import { FolderCog, FolderX } from 'lucide-react';

import CreateDocument from '@/components/forms/document';
import DocsInProject from '@/components/pages/docs-in-project';

function RouteComponent() {
  let { projectId } = useParams({ from: '/(auth)/_layout/projects/$projectId' });


  const { isPending, error, data, isSuccess } = useQuery({
    queryKey: ['document', projectId],
    queryFn: () => getProjectById(projectId),
  });

  if (isPending) return <Loading />
  if (error) {
    toast.warning(error.message);
    return (
      <Empty className="my-16">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FolderX />
          </EmptyMedia>
          <EmptyTitle>No Folder Found</EmptyTitle>
          <EmptyDescription>
            We were unable to find this project. You can create a project here.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <CreateProjectForm />
        </EmptyContent>
      </Empty>
    );
  }

  const project = data.data![0];

  if (!isPending && isSuccess)

    return (
      <main className="min-h-screen py-4 space-y-8">
        <div className="max-w-7xl mx-auto space-y-2">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 gap-4 max-sm:flex-wrap max-sm:gap-2">
            <div className='max-md:w-full'>
              <h1 className="text-xl md:text-2xl capitalize">
                {project.name}
              </h1>
              <p className="text-lg text-pretty">
                {project.description}
              </p>
            </div>

            <div className="flex items-center gap-2 md:gap-4 max-sm:w-full max-sm:justify-between">
              <Button variant='secondary'>
                <FolderCog /> Edit
              </Button>
              <CreateDocument projectId={projectId} />
            </div>
          </div>

          <DocsInProject />

        </div>
      </main>
    );

}
