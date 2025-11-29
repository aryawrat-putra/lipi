import { Link, useParams } from 'react-router'
import Logo from '../../../components/logo';
import { Button } from '@repo/ui/components/button';
import { CloudCheck, FileClock, FileCog, FilePenLine, MessagesSquare, SquareStar } from 'lucide-react';
import UserMenu from '../../../components/user-menu';
import DocMenubar from '../../../components/document/doc-menubar';
import { Input } from '@repo/ui/components/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@repo/ui/components/tooltip';
import DocEditor from '../../../components/document/doc-editor';

import { Collapsible, CollapsibleContent} from "@repo/ui/components/collapsible"
import { useState } from "react"

export default function DocumentPage() {
  let { docId } = useParams();
  const [isToolbarOpen, setIsToolbarOpen] = useState<boolean>(true);

  return (
    <section className='container p-2 mx-auto'>
      <header className='sticky top-0 left-0 backdrop-blur-lg'>
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
      <main className='min-h-screen'>page</main>
    </section>
  )
}