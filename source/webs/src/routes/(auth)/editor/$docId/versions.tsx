import { createFileRoute, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/editor/$docId/versions')({
    component: RouteComponent,
})

function RouteComponent() {
    let { docId } = useParams({ from: '/docs/$docId/versions' });


    return <div>Versions of '{docId}'</div>
}
