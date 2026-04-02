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

    if (!session && !isPublicPath) {
      // ? Only redirect if not already going to /login
      if (location.pathname !== '/login') {
        throw redirect({ to: '/login' });
      }
    } else if (session && isPublicPath) {
      // ? Only redirect if not already going to /dashboard
      if (location.pathname !== '/dashboard') {
        throw redirect({ to: '/dashboard' });
      }
    }
  },
  notFoundComponent: () => <NotFoundPage />,
  errorComponent: ({ ...props }) => <ErrorPage {...props} />,
})

function RootLayout() {
  return (
    <>
      <Outlet />
      < Toaster />
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }
        }
        plugins={
          [
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
      />
    </>
  )
}