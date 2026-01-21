import { Link } from '@tanstack/react-router'
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { FolderHeart, FilePen, EllipsisVertical, SquareArrowOutUpRight, FolderX, FileText, FolderPen } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"

import { formatDistanceToNowStrict } from 'date-fns'
import { project } from '../../../../api/src/db/schema';

export default function ProjectCard({ id, name, updatedAt, documents, description }: typeof project.$inferSelect) {
    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <Link to="/projects/$projectId" params={{ projectId: id! }}>
                    <Card className='border border-border/50 transition-all duration-300 cursor-pointer hover:border-border hover:shadow-md' title={name}>
                        <CardHeader>
                            <CardTitle className="capitalize">{name}</CardTitle>
                            {description !== '' && (
                                <CardDescription className="capitalize">{description}</CardDescription>
                            )}
                            <CardAction>
                                <DropdownMenu>
                                    <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} className='cursor-pointer' asChild>
                                        <Button size='icon' variant='ghost' className='text-muted-foreground'><EllipsisVertical /></Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align='end'>
                                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}><FolderPen /> Rename</DropdownMenuItem>
                                        <DropdownMenuItem onClick={(e) => e.stopPropagation()} className='text-primary'><FolderHeart className='text-primary' /> Favorite</DropdownMenuItem>
                                        <DropdownMenuItem onClick={(e) => e.stopPropagation()} asChild>
                                            <Link to="/projects/$projectId" params={{ projectId: id! }} target='_blank'><SquareArrowOutUpRight /> Open in new tab</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={(e) => e.stopPropagation()} className='text-destructive'><FolderX className='text-destructive' /> Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                            </CardAction>
                        </CardHeader>
                        <CardFooter className="flex flex-nowrap justify-between items-center">
                            <p className="flex flex-nowrap justify-between items-center gap-2">
                                <FileText className="size-4" />
                                {documents?.length}
                            </p>
                            <p className="flex flex-nowrap justify-between items-center gap-2">
                                <FolderPen className="size-4" />
                                {formatDistanceToNowStrict(new Date(updatedAt), { addSuffix: true })}
                            </p>
                        </CardFooter>
                    </Card>
                </Link>

            </ContextMenuTrigger>

            <ContextMenuContent>
                <ContextMenuItem><FolderPen /> Rename</ContextMenuItem>
                <ContextMenuItem className='text-primary'><FolderHeart className='text-primary' /> Favorite</ContextMenuItem>
                <ContextMenuItem asChild><Link to={`/docs/$docId`} params={{ docId: id! }} target='_blank'><SquareArrowOutUpRight /> Open in new tab</Link></ContextMenuItem>
                <ContextMenuItem className='text-destructive'><FolderX className='text-destructive' /> Delete</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}