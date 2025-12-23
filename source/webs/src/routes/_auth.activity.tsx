import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/activity')({
  component: RouteComponent,
})

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CalendarDays, ShieldUser } from "lucide-react";
import { type ActivityT } from "@/helpers/types";
import ActivityCard from "@/components/cards/activity-card";

const Activity: ActivityT[] = [
  {
    "id": "act_a1b2c3d4e5",
    "type": "edited",
    "done_date": "2025-11-19T09:05:30.150Z",
    "did_by": "Alice Johnson"
  },
  {
    "id": "act_f6g7h8i9j0",
    "type": "shared",
    "done_date": "2025-11-19T09:12:00.000Z",
    "did_by": "Bob Williams"
  },
  {
    "id": "act_k1l2m3n4o5",
    "type": "changed name",
    "done_date": "2025-11-19T09:15:45.999Z",
    "did_by": "Charlie Brown"
  },
  {
    "id": "act_p6q7r8s9t0",
    "type": "edited",
    "done_date": "2025-11-19T10:01:10.000Z",
    "did_by": "David Lee"
  },
  {
    "id": "act_u1v2w3x4y5",
    "type": "shared",
    "done_date": "2025-11-19T10:35:22.500Z",
    "did_by": "Eve Miller"
  },
  {
    "id": "act_z6a7b8c9d0",
    "type": "edited",
    "done_date": "2025-11-19T11:40:05.123Z",
    "did_by": "Frank Jones"
  },
  {
    "id": "act_e1f2g3h4i5",
    "type": "changed name",
    "done_date": "2025-11-19T12:00:00.000Z",
    "did_by": "Grace Chen"
  },
  {
    "id": "act_j6k7l8m9n0",
    "type": "edited",
    "done_date": "2025-11-19T14:30:15.876Z",
    "did_by": "Henry Wilson"
  },
  {
    "id": "act_o1p2q3r4s5",
    "type": "shared",
    "done_date": "2025-11-19T15:10:40.333Z",
    "did_by": "Ivy Rodriguez"
  }
]

function RouteComponent() {
  const [doneBy, setDoneBy] = useState('me');

  return (
    <main className="min-h-screen py-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 max-sm:flex-wrap max-sm:gap-2">
          <h1 className="text-xl max-md:w-full md:text-2xl">All Activities</h1>

          <div className="flex items-center gap-2 md:gap-4 max-sm:w-full max-sm:justify-between">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size='icon'><ShieldUser /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>Done by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={doneBy} onValueChange={setDoneBy}>
                  <DropdownMenuRadioItem value="me">Me</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="anyone">Anyone</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="not-me">Not me</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* TODO : card to open here with filters like last 7,10,30 days OR between x to y date */}
            <Button variant='outline' size='default'><CalendarDays /> <span className="max-md:hidden">Filter By Date</span></Button>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Activity.map((ac) => (
            <ActivityCard key={ac.id} {...ac} />
          ))}
        </div>
      </div>
    </main>
  )
}
