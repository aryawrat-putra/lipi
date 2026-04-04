import { Link } from '@tanstack/react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import { FileHeart, FileOutput, FilePen, FilePenLine, GalleryHorizontalEnd, GripVertical, SquareArrowOutUpRight, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { formatDistanceToNowStrict } from 'date-fns'

import { document } from '../../../../api/src/db/schema';
import { toggleDocFav } from '@/services/document'

export default function DocumentCard({ id, title, updatedAt, allVersionsIds, isFavorite }: typeof document.$inferSelect) {
    const queryClient = useQueryClient();

    const favoriteToggle = useMutation({
        mutationKey: ['toggle-fav', id],
        mutationFn: () => toggleDocFav(id!),
        onSuccess: ({ message , data, statusCode , success , errors, meta}) => {
            console.log({message, data, statusCode , success , errors, meta})
            // ? Inform user
            toast.success(message);
            // ? Update screen data
            queryClient.invalidateQueries({
                queryKey: ['all-documents'],
            });
        },
        onError: (e) => {
            console.error('Failed to update doc!!!')
            console.error(e);
            toast.error(e.message);
        }
    }); 

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <Link to="/editor/$docId" params={{ docId: id! }}>
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
                                        {isFavorite ? (
                                            <DropdownMenuItem
                                                disabled={favoriteToggle.isPending}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    favoriteToggle.mutate();
                                                }}
                                                className='text-primary'><FileOutput /> Unfavorite</DropdownMenuItem>
                                        ) : (
                                            <DropdownMenuItem
                                                disabled={favoriteToggle.isPending}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    favoriteToggle.mutate();
                                                }}
                                                className='text-primary'><FileHeart className='text-primary' /> Favorite</DropdownMenuItem>
                                        )}
                                        <DropdownMenuItem onClick={(e) => e.stopPropagation()} asChild>
                                            <Link to={`/editor/$docId`} params={{ docId: id! }} target='_blank'><SquareArrowOutUpRight /> Open in new tab</Link>
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
                <ContextMenuItem asChild><Link to={`/editor/$docId`} params={{ docId: id! }} target='_blank'><SquareArrowOutUpRight /> Open in new tab</Link></ContextMenuItem>
                <ContextMenuItem className='text-destructive'><Trash2 className='text-destructive' /> Delete</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}