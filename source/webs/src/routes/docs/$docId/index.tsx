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
import TextEditor from '@/components/doc/text-editor';

import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { FindAndReplaceCard } from '@/components/doc/card/find-replace-card';


function RouteComponent() {
  let { docId } = useParams({ from: '/docs/$docId/' });
  const [isToolbarOpen, setIsToolbarOpen] = useState<boolean>(true);
  const [additionalDialog, setAdditionalDialog] = useState<'none' | 'f-n-r'>('none')

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: `
            <h2>What to expect from here on out</h2>
            <p>What follows from here is just a bunch of absolute nonsense I've written to dogfood the plugin itself. It includes every sensible typographic element I could think of, like <strong>bold text</strong>, unordered lists, ordered lists, code blocks, block quotes, <em>and even italics</em>.</p>
            <p>It's important to cover all of these use cases for a few reasons:</p>
            <ol>
                <li>We want everything to look good out of the box.</li>
                <li>Really just the first reason, that's the whole point of the plugin.</li>
                <li>Here's a third pretend reason though a list with three items looks more realistic than a list with two items.</li>
            </ol>
            <p>Now we're going to try out another header style.</p>
            <h3>Typography should be easy</h3>
            <p>So that's a header for you — with any luck if we've done our job correctly that will look pretty reasonable.</p>
            <p>Something a wise person once told me about typography is:</p>
            <blockquote><p>Typography is pretty important if you don't want your stuff to look like trash. Make it good then it won't be bad.</p></blockquote>
            <p>It's probably important that images look okay here by default as well:</p>
            <figure>
                <img src="https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=80" alt="" />
                <figcaption>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</figcaption>
            </figure>
            <p>Now I'm going to show you an example of an unordered list to make sure that looks good, too:</p>
            <ul>
                <li>So here is the first item in this list.</li>
                <li>In this example we're keeping the items short.</li>
                <li>Later, we'll use longer, more complex list items.</li>
            </ul>
            <p>And that's the end of this section.</p>
            `,
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
    </section>
  )
}