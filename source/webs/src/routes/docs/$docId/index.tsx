import { createFileRoute, Link, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/docs/$docId/')({
  component: RouteComponent,
})

import { Button } from '@/components/ui/button';
import { CloudCheck, FileClock, FileCog, FilePenLine, MessagesSquare, SquareStar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"

import { useState } from "react"
import Logo from '@/components/non-interactive/logo';
import UserMenu from '@/components/interactive/user-menu';
import DocMenubar from '@/components/doc/menu-bar';
import DocEditor from '@/components/doc/editor';


function RouteComponent() {
  let { docId } = useParams({ from: '/docs/$docId/' });
  const [isToolbarOpen, setIsToolbarOpen] = useState<boolean>(true);

  return (
    <section className='container mx-auto'>
      <header className='sticky top-0 left-0 bg-background z-20'>
        <Collapsible
          open={isToolbarOpen}
          onOpenChange={setIsToolbarOpen}
        >
          <CollapsibleContent>
            <div className='flex justify-between items-center gap-2'>
              <nav className='flex justify-between items-center gap-4 '>
                <Link to='/'><Logo /></Link>
                <div className='space-y-2'>
                  <div className='flex gap-2 items-center'>
                    <Input
                      type="text"
                      placeholder="Document Name"
                      defaultValue={docId}
                      className='read-only:bg-muted max-w-xs w-fit'
                      readOnly
                    />

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant='ghost' size='icon'><FilePenLine /></Button>
                      </TooltipTrigger>
                      <TooltipContent><p>Edit Name</p></TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant='ghost' size='icon'><SquareStar /></Button>
                      </TooltipTrigger>
                      <TooltipContent><p>Favorite Document</p></TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant='ghost' size='icon'><CloudCheck /></Button>
                      </TooltipTrigger>
                      <TooltipContent><p>Sync Document</p></TooltipContent>
                    </Tooltip>
                  </div>
                  <DocMenubar />
                </div>
              </nav>
              <div className='flex items-center gap-4'>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant='secondary' size='icon'><FileClock /></Button>
                  </TooltipTrigger>
                  <TooltipContent><p>History</p></TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant='secondary' size='icon'><MessagesSquare /></Button>
                  </TooltipTrigger>
                  <TooltipContent><p>Comments</p></TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant='secondary' size='icon'><FileCog /></Button>
                  </TooltipTrigger>
                  <TooltipContent><p>Document Preferences</p></TooltipContent>
                </Tooltip>
                <UserMenu />
              </div>
            </div>
          </CollapsibleContent>
          <aside className='my-2'>
            <DocEditor />
          </aside>
        </Collapsible>

      </header>
      <main className='min-h-screen'>
        <article className='size-full min-w-full flex flex-row flex-nowrap justify-between gap-1 ring-1'>
          <Button variant={'ghost'}><MessagesSquare /></Button>
          <span className='flex-1 full min-h-full prose dark:prose-invert prose-zinc ring-1'>
            LipiEditor
            {/* <LipiEditor /> */}
          </span>
          <Button variant={'ghost'}><MessagesSquare /></Button>
        </article>
      </main>
    </section>
  )
}