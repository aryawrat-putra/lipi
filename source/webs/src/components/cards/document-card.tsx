import { Link } from '@tanstack/react-router'

import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import { FileHeart, FilePen, FilePenLine, GalleryHorizontalEnd, GripVertical, SquareArrowOutUpRight, Trash2 } from 'lucide-react'

import { document } from '../../../../api/src/db/schema';
import { formatDistanceToNowStrict } from 'date-fns'

export default function DocumentCard({ id, title, updatedAt, allVersionsIds }: typeof document.$inferSelect) {
    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <Link to="/documents/$docId" params={{ docId: id! }}>
                    <Card className='justify-between border border-border/50 transition-all duration-300 cursor-pointer hover:border-border hover:shadow-md' title={title}>
                        <CardHeader>
                            <CardTitle className='text-pretty truncate'>{title}</CardTitle>
                            <CardDescription>

                            </CardDescription>
                            <CardAction>
                                <DropdownMenu>
                                    <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} className='cursor-pointer' asChild>
                                        <Button size='icon' variant='outline' className='text-muted-foreground'><GripVertical /></Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align='end'>
                                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}><FilePen /> Rename</DropdownMenuItem>
                                        <DropdownMenuItem onClick={(e) => e.stopPropagation()} className='text-primary'><FileHeart className='text-primary' /> Favorite</DropdownMenuItem>
                                        <DropdownMenuItem onClick={(e) => e.stopPropagation()} asChild>
                                            <Link to={`/docs/$docId`} params={{ docId: id! }} target='_blank'><SquareArrowOutUpRight /> Open in new tab</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={(e) => e.stopPropagation()} className='text-destructive'><Trash2 className='text-destructive' /> Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </CardAction>
                        </CardHeader>
                        <CardFooter className="flex flex-nowrap justify-between items-center">
                            <p className="flex flex-nowrap justify-between items-center gap-2">
                                <GalleryHorizontalEnd className="size-4" />
                                {allVersionsIds?.length}
                            </p>
                            <p className="flex flex-nowrap justify-between items-center gap-2">
                                <FilePenLine className="size-4" />
                                {formatDistanceToNowStrict(new Date(updatedAt), { addSuffix: true })}
                            </p>
                        </CardFooter>
                    </Card>
                </Link>

            </ContextMenuTrigger>

            <ContextMenuContent>
                <ContextMenuItem><FilePen /> Rename</ContextMenuItem>
                <ContextMenuItem className='text-primary'><FileHeart className='text-primary' /> Favorite</ContextMenuItem>
                <ContextMenuItem asChild><Link to={`/docs/$docId`} params={{ docId: id! }} target='_blank'><SquareArrowOutUpRight /> Open in new tab</Link></ContextMenuItem>
                <ContextMenuItem className='text-destructive'><Trash2 className='text-destructive' /> Delete</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}