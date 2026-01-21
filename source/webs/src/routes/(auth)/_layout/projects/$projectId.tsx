import { createFileRoute, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/_layout/projects/$projectId')({
  component: RouteComponent,
})

function RouteComponent() {
  let { projectId } = useParams({ from: '/(auth)/_layout/projects/$projectId' });

  return <div>Hello "/(auth)/_layout/projects/${projectId}"!</div>
}
