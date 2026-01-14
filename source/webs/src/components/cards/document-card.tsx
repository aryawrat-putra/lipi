import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { FileClock, FileHeart, FilePen, GripVertical, SquareArrowOutUpRight, Trash2 } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import type { DocumentT } from '@/helpers/types'

export default function DocumentCard({ id, last_mod, name }: DocumentT) {

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <Link to={`/docs/${id}`}>
                    <Card className='md:aspect-video hover:border hover:border-primary justify-between'>
                        <CardHeader>
                            <CardTitle className='leading-6'>{name}</CardTitle>
                            {/* TOOD show when added in favorite */}
                            {/* <CardAction> <Heart className='fill-primary text-primary' /> </CardAction> */}
                        </CardHeader>

                        <CardContent>
                            {/* User who modified last */}
                            <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
                                <Avatar className='size-6'>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <Avatar className='size-6'>
                                    <AvatarImage
                                        src="https://github.com/maxleiter.png"
                                        alt="@maxleiter"
                                    />
                                    <AvatarFallback>LR</AvatarFallback>
                                </Avatar>
                                <Avatar className='size-6'>
                                    <AvatarImage
                                        src="https://github.com/evilrabbit.png"
                                        alt="@evilrabbit"
                                    />
                                    <AvatarFallback>ER</AvatarFallback>
                                </Avatar>
                            </div>
                        </CardContent>

                        <CardFooter className='justify-between items-center gap-2'>
                            <Badge variant='outline'><FileClock /> 22h ago</Badge>

                            <DropdownMenu>
                                <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} className='cursor-pointer' asChild>
                                    <Button size='icon' variant='outline' className='text-muted-foreground'><GripVertical /></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align='end'>
                                    <DropdownMenuItem onClick={(e) => e.stopPropagation()}><FilePen /> Rename</DropdownMenuItem>
                                    <DropdownMenuItem onClick={(e) => e.stopPropagation()}><Trash2 /> Delete</DropdownMenuItem>
                                    <DropdownMenuItem onClick={(e) => e.stopPropagation()}><FileHeart /> Favorite</DropdownMenuItem>
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
                <ContextMenuItem><FilePen /> Rename</ContextMenuItem>
                <ContextMenuItem><Trash2 /> Delete</ContextMenuItem>
                <ContextMenuItem><FileHeart /> Favorite</ContextMenuItem>
                <ContextMenuItem asChild><Link to={`/docs/${id}`} target='_blank'><SquareArrowOutUpRight /> Open in new tab</Link></ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}