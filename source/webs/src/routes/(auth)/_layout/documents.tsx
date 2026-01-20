import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/_layout/documents')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(app)/_layout/documents"!</div>
}
