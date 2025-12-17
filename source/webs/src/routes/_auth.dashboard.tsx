import { createFileRoute } from '@tanstack/react-router'

import { authClient } from "@/lib/auth-client"


export const Route = createFileRoute('/_auth/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  const { data: session } = authClient.useSession()

  return (
    <section className="grid gap-2 p-2">
      <p>Hi {JSON.stringify(session?.user)}!</p>
      <p>You are currently on the dashboard route.</p>
    </section>
  )
}