import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar";
import { Button } from "@repo/ui/components/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@repo/ui/components/empty";

export default function LogoutPage() {
  return (
    <section className='w-full h-screen grid place-items-center'>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="default">
            <Avatar className="size-16">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
          </EmptyMedia>
          <EmptyTitle>Logout</EmptyTitle>
          <EmptyDescription>John, Do you really want to logout?</EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center">
          <Button variant='destructive' size="sm">Yes</Button>
          <Button variant='default' size="sm">No</Button>
        </EmptyContent>
      </Empty>
    </section>
  )
}