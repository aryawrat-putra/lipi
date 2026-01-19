import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/dashboard')({
  component: DashboardPage,
})

import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { CalendarDays, FileClock, FilePlus, ShieldUser, SlidersHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner"
import { useState } from "react";
import type { DocumentT } from '@/helpers/types';
import DocumentCard from '@/components/cards/document-card';
import { useMutation } from '@tanstack/react-query';

const Documents: DocumentT[] = [
  {
    "id": "doc_1a2b3c4d5e",
    "last_mod": "2025-11-15T10:30:00.000Z",
    "name": "Project Proposal - Q4 2025"
  },
  {
    "id": "doc_f6g7h8i9j0",
    "last_mod": "2025-11-18T15:05:45.123Z",
    "name": "Meeting Notes - Sprint Review 42"
  },
  {
    "id": "doc_k1l2m3n4o5",
    "last_mod": "2025-10-20T08:12:00.000Z",
    "name": "2026 Budget Forecast Draft"
  },
  {
    "id": "doc_p6q7r8s9t0",
    "last_mod": "2025-11-18T17:28:10.000Z",
    "name": "Software Architecture Diagram v3"
  },
  {
    "id": "doc_u1v2w3x4y5",
    "last_mod": "2025-09-01T20:00:00.000Z",
    "name": "Employee Handbook - Revision B"
  },
  {
    "id": "doc_z6a7b8c9d0",
    "last_mod": "2025-11-17T11:40:30.999Z",
    "name": "Client Onboarding Checklist"
  },
  {
    "id": "doc_e1f2g3h4i5",
    "last_mod": "2025-11-16T09:00:00.000Z",
    "name": "Personal Goals for December"
  },
  {
    "id": "doc_j6k7l8m9n0",
    "last_mod": "2025-08-05T14:55:00.000Z",
    "name": "Marketing Campaign Analysis Q3"
  },
  {
    "id": "doc_j6k7l8m9n97",
    "last_mod": "2025-08-05T14:55:00.000Z",
    "name": "Aura farming"
  },
  {
    "id": "doc_o1p2q3r4s5",
    "last_mod": "2025-11-18T16:01:22.456Z",
    "name": "Q&A Document for Investor Relations"
  },
  {
    "id": "doc_t6u7v8w9x0",
    "last_mod": "2025-11-10T19:30:00.000Z",
    "name": "Research Paper: AI in Healthcare"
  },
  {
    "id": "doc_y1z2a3b4c5",
    "last_mod": "2025-11-18T17:29:55.789Z",
    "name": "Code Review Guidelines"
  }
];

function DashboardPage() {
  const navigate = useNavigate();

  const [sortByOwner, setSortByOwner] = useState('anyone');
  const [sortBy, setSortBy] = useState('modi')

  const docMutation = useMutation({
    mutationKey: ['create-document'],
    mutationFn: () => { console.log('create ') },
    onSuccess: (res) => {
      // ? Navigate user to doc link
      // navigate({ to: `/docs/${res.id}` });

      // ? Inform user
      toast.success("Your Document has been created");
    },
    onError: (e) => {
      console.error('Failed to create doc!!!')
      console.error(e);

      toast.error("Failed to create document");

    }
  })


  if (Documents.length > 1) {
    return (
      <main className="min-h-screen py-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 max-sm:flex-wrap max-sm:gap-2">
            <h1 className="text-xl max-md:w-full md:text-2xl">Recent documents</h1>

            <div className="flex items-center gap-2 md:gap-4 max-sm:w-full max-sm:justify-between">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size='icon'><ShieldUser /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>Owned By</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={sortByOwner} onValueChange={setSortByOwner}>
                    <DropdownMenuRadioItem value="me">Me</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="anyone">Anyone</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="not-me">Not me</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size='icon' variant='secondary'><SlidersHorizontal /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                    <DropdownMenuRadioItem value="open-me">Last Opened by me</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="modi-me">Last Modified by me</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="modi">Last Modified</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* TODO : card to open here with filters like last 7,10,30 days OR between x to y date */}
              <Button variant='outline' size='default'><CalendarDays /> <span className="max-md:hidden">Filter By Date</span></Button>
              <Button disabled={docMutation.isPending} onClick={() => { docMutation.mutate() }}><FilePlus />New Document</Button>
            </div>
          </div>

          {/* Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Documents.map((doc) => (
              <DocumentCard key={doc.id} {...doc} />
            ))}
          </div>
        </div>
      </main>
    )
  } else {
    return (
      <Empty className="my-16">
        <EmptyHeader>
          <EmptyMedia variant="icon"><FileClock /></EmptyMedia>
          <EmptyTitle>No Documents Yet</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t created any documents yet. Get started by creating
            your first document.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>Create Document</Button>
        </EmptyContent>
      </Empty>
    )
  }
}