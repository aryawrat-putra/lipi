import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import NotFoundPage from '@/components/pages/not-found'
import ErrorPage from '@/components/pages/error'

import { Toaster } from "@/components/ui/sonner";
import { authClient } from "@/lib/auth-client"
import { redirect } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootLayout,
  beforeLoad: async ({ location }) => {
    const { data: session } = await authClient.getSession();

    const publicPaths = ['/', '/login', '/signup', '/recover'];
    const isPublicPath = publicPaths.includes(location.pathname);
    const isAuthenticated = !!session?.user;

    if (isAuthenticated && isPublicPath) {
      throw redirect({ to: '/dashboard' })
    }

    if (!isAuthenticated && !isPublicPath) {
      throw redirect({ to: '/login', href: location.href })
    }
  },
  notFoundComponent: () => <NotFoundPage />,
  errorComponent: ({ ...props }) => <ErrorPage {...props} />,
})

function RootLayout() {
  return (
    <>
      <Outlet />
      <Toaster />
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  )
}