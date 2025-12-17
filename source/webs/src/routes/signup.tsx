import { SignupForm } from '@/components/forms/signup-form'
import Logo from '@/components/non-interactive/logo'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/signup')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <Logo />
                <SignupForm />
            </div>
        </div>
    )
}
