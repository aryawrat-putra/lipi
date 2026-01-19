import { createFileRoute } from '@tanstack/react-router'
import { Outlet } from '@tanstack/react-router'

import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import Logo from '@/components/non-interactive/logo'
import FileSearch from '@/components/forms/file-search'
import UserMenu from '@/components/interactive/user-menu'
import { AppSidebar } from '@/components/interactive/app-sidebar'
import NotFoundPage from '@/components/pages/not-found'
import ErrorPage from '@/components/pages/error'

export const Route = createFileRoute("/_auth")({
    component: AuthLayout,
    notFoundComponent: () => <NotFoundPage />,
    errorComponent: ({ ...props }) => <ErrorPage {...props} />,
})

function AuthLayout() {
    return (
        <section className="container mx-auto">
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    {/* Page Header */}
                    <header className="flex shrink-0 items-center justify-between gap-2 md:border-b px-4 sticky top-0 backdrop-blur-lg py-4 z-10">
                        <div className="flex gap-4 md:gap-6 items-center">
                            <SidebarTrigger className="ml-1" />
                            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-5" />
                        </div>

                        <span className="sm:hidden"><Logo /></span>

                        {/* Search Bar */}
                        <span className="lg:min-w-sm max-sm:hidden"><FileSearch /></span>

                        {/* User Menu */}
                        <UserMenu />
                    </header>

                    {/* Page Starts */}
                    <main className="p-2">
                        <Outlet />
                    </main>

                </SidebarInset>
            </SidebarProvider >
        </section>
    )
}