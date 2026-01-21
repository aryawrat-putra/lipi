import { createFileRoute, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/_layout/documents/$docId/history')({
  component: RouteComponent,
})

function RouteComponent() {
  let { docId } = useParams({ from: '/docs/$docId/history' });

  return <div>History of '{docId}'</div>

}
