import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { FileClock, ArchiveRestore, GripVertical, SquareArrowOutUpRight, ArchiveX } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import type { DocumentT } from '@/helpers/types'

export default function DeletedDocumentCard({ id, last_mod, name }: DocumentT) {

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <Link to={`/docs/${id}`}>
                    <Card className='md:aspect-video hover:border hover:border-primary justify-between'>
                        <CardHeader>
                            <CardTitle className='leading-6'>{name}</CardTitle>
                        </CardHeader>

                        <CardFooter className='justify-between items-center gap-2'>
                            <Badge variant='outline'><FileClock /> 22h ago</Badge>

                            <DropdownMenu>
                                <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} className='cursor-pointer' asChild>
                                    <Button size='icon' variant='outline' className='text-muted-foreground'><GripVertical /></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align='end'>
                                    <DropdownMenuItem onClick={(e) => e.stopPropagation()}><ArchiveRestore /> Restore</DropdownMenuItem>
                                    <DropdownMenuItem onClick={(e) => e.stopPropagation()}><ArchiveX /> Delete Forever</DropdownMenuItem>
                                    <DropdownMenuItem onClick={(e) => e.stopPropagation()} asChild>
                                        <Link to={`/docs/${id}`} target='_blank'><SquareArrowOutUpRight /> Open in new tab</Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                        </CardFooter>
                    </Card>
                </Link>
            </ContextMenuTrigger>

            <ContextMenuContent>
                <ContextMenuItem><ArchiveRestore /> Restore</ContextMenuItem>
                <ContextMenuItem><ArchiveX /> Delete Forever</ContextMenuItem>
                <ContextMenuItem asChild><Link to={`/docs/${id}`} target='_blank'><SquareArrowOutUpRight /> Open in new tab</Link></ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
};