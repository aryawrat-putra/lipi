import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/components/avatar'
import { DocumentT } from '../../config/types'
import { Card,  CardContent, CardFooter, CardHeader, CardTitle } from '@repo/ui/components/card'
import { FileClock, FileHeart, FilePen, GripVertical, SquareArrowOutUpRight, Trash2 } from 'lucide-react'
import { Link } from 'react-router'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@repo/ui/components/dropdown-menu'
import { Button } from '@repo/ui/components/button'
import { Badge } from '@repo/ui/components/badge'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@repo/ui/components/context-menu"

function DocumentCard({ id, last_mod, name }: DocumentT) {

  return (
    <ContextMenu>
      <ContextMenuTrigger>

        <Link to={`/document/${id}`}>
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
                    <Link to={`/document/${id}`} target='_blank'><SquareArrowOutUpRight /> Open in new tab</Link>
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
        <ContextMenuItem asChild><Link to={`/document/${id}`} target='_blank'><SquareArrowOutUpRight /> Open in new tab</Link></ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default DocumentCard