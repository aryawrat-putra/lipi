import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/trash')({
  component: RouteComponent,
})

import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Trash, FileX } from "lucide-react";
import type { DocumentT } from '@/helpers/types';
import DeletedDocumentCard from '@/components/cards/deleted-document-card';


function RouteComponent() {

  if (initialTrashDocs.length > 1) {
    return (
      <main className="min-h-screen py-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 max-sm:flex-wrap max-sm:gap-2">
            <h1 className="text-xl max-md:w-full md:text-2xl">Deleted Documents</h1>

            <div className="flex items-center gap-2 md:gap-4 max-sm:w-full max-sm:justify-between">
              <Button variant='destructive'><Trash />Empty Trash</Button>
            </div>
          </div>

          {/* Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {initialTrashDocs.map((doc) => (
              <DeletedDocumentCard key={doc.id} {...doc} />
            ))}
          </div>
        </div>
      </main>
    )
  } else {
    return (
      <Empty className="my-16">
        <EmptyHeader>
          <EmptyMedia variant="icon"><FileX /></EmptyMedia>
          <EmptyTitle>No Deleted Documents Yet</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t deleted any documents yet. Your deleted files will appear here.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>Create Document</Button>
        </EmptyContent>
      </Empty>
    )
  }
};

const initialTrashDocs: DocumentT[] = [
  {
    id: "a1b2c3d4e5f6g7h8",
    last_mod: new Date("2024-10-25T10:00:00Z").toISOString(),
    name: "Project Charter 2024",
  },
  {
    id: "i9j0k1l2m3n4o5p6",
    name: "Meeting Notes - Strategy Session",
    last_mod: new Date("2024-11-09T04:30:00Z").toISOString(),
  },
  {
    id: "q7r8s9t0u1v2w3x4",
    last_mod: new Date("2024-11-19T14:30:00Z").toISOString(),
    name: "Design Mockups V3",
  },
  {
    id: "y5z6a7b8c9d0e1f2",
    name: "Mockups V3.4",
    last_mod: new Date("2024-11-20T08:15:00Z").toISOString(),
  }
];