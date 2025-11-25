import { Card, CardAction, CardDescription, CardHeader, CardTitle } from '@repo/ui/components/card'
import { ActivityT } from '../../config/types'
import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/components/avatar'

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