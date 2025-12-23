import { Card, CardAction, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { type ActivityT } from '@/helpers/types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function ActivityCard({ id, did_by, done_date, type }: ActivityT) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{did_by} {type}</CardTitle>
                <CardDescription>on {new Date(done_date).toLocaleString()}</CardDescription>
                <CardAction>
                    <Avatar className='size-10'>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </CardAction>
            </CardHeader>
        </Card>
    )
}