import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/editor/$docId/')({
  component: RouteComponent,
})

import { Button } from "@/components/ui/button"
import { FileClock, MessagesSquare } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"

import { useState } from "react"
import Logo from '@/components/non-interactive/logo';
import UserMenu from '@/components/interactive/user-menu';
import DocEditor from '@/components/doc/editor';
import TextEditor from '@/components/doc/text-editor';
import DocMenubar from '@/components/doc/menu-bar';

import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { FindAndReplaceCard } from '@/components/doc/card/find-replace-card';
import DocDetails from '@/components/editor-sections/doc-details';
import DocSettings from '@/components/editor-sections/doc-settings';


function RouteComponent() {
  const [isToolbarOpen, setIsToolbarOpen] = useState<boolean>(true);
  const [additionalDialog, setAdditionalDialog] = useState<'none' | 'f-n-r'>('none')

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: `<h1>This is a black document!</h1>`,
  })

  return (
    <section className='container mx-auto py-2'>
      <header className='sticky top-0 left-0 bg-background z-20'>
        <Collapsible
          open={isToolbarOpen}
          onOpenChange={setIsToolbarOpen}
        >
          <CollapsibleContent>
            <div className='flex justify-between items-center gap-2'>
              <nav className='flex justify-between items-center gap-4 '>
                <Link to='/dashboard'><Logo /></Link>
                <div className='space-y-2'>
                  <DocDetails />
                  <DocMenubar
                    editor={editor}
                    // TODO
                    setAdditionalDialog={setAdditionalDialog}
                  />
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

                <DocSettings />

                <UserMenu />
              </div>
            </div>
          </CollapsibleContent>
          <aside className='my-2'>
            <DocEditor />
          </aside>
        </Collapsible>
        <aside className='gird place-items-center'>
          {additionalDialog === 'f-n-r' && (
            <FindAndReplaceCard
              editor={editor}
              closeCard={() => { setAdditionalDialog('none') }}
            />
          )}
        </aside>
      </header>

      <main className='min-h-screen'>
        <article className='size-full min-w-full flex flex-row flex-nowrap justify-between gap-1'>
          <Button variant={'ghost'}><MessagesSquare /></Button>
          <span className='flex-1 full min-h-full prose dark:prose-invert prose-zinc'>
            <TextEditor editor={editor} />
          </span>
          <Button variant={'ghost'}><MessagesSquare /></Button>
        </article>
      </main>
    </section >
  )
}