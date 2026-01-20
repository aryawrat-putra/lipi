import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/_layout/logout')({
  component: RouteComponent,
})

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { authClient } from "@/lib/auth-client"
import { CircleUser } from 'lucide-react';

function RouteComponent() {
  const user = authClient.useSession().data?.user;
  const navigate = useNavigate();

  async function signOUtUser() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate({
            to: '/login'
          })
        }
      }
    })
  }

  return (
    <section className='w-full h-screen grid place-items-center'>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="default">
            {user?.image === '' ? (
              <CircleUser className="size-6 opacity-80" />
            ) : (
              <Avatar className="size-9">
                <AvatarImage src={user?.image!} alt={`${user?.name}'s Avatar Image`} />
                <AvatarFallback className='uppercase text-xs'>{user?.name.split(' ')[0][0]}.{user?.name.split(' ')[1][0]}.</AvatarFallback>
              </Avatar>
            )}
          </EmptyMedia>
          <EmptyTitle>Logout</EmptyTitle>
          <EmptyDescription>{user?.name.split(' ')[0]}, Do you really want to logout?</EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center">
          <Button variant='destructive' size='sm' onClick={signOUtUser}>Yes</Button>
          <Button variant='default' size='sm' asChild>
            <Link to='/dashboard'>
              No
            </Link>
          </Button>
        </EmptyContent>
      </Empty>
    </section>
  )
}
