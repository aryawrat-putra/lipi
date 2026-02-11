import { useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query';

import { Button } from "@/components/ui/button";
import { postDoc, postDocInProjectId } from '@/services/document';
import { toast } from "sonner"
import { FilePlus } from "lucide-react";

type Props = {
    projectId?: string;
}

function CreateDocument({ projectId }: Props) {
    const navigate = useNavigate({ from: '/documents' });

    if (projectId) {
        const createDocumentInProjectId = useMutation({
            mutationKey: [`create-document-${projectId}`],
            mutationFn: () => postDocInProjectId(projectId),
            onSuccess: ({ data }) => {
                // ? Navigate user to doc link
                navigate({ to: `/editor/$docId`, params: { docId: data![0].id! } });

                // ? Inform user
                toast.success("Your Document has been created");
            },
            onError: (e) => {
                console.error('Failed to create doc!!!')
                console.error(e);

                toast.error("Failed to create document");

            }
        })

        return (
            <Button
                disabled={createDocumentInProjectId.isPending}
                onClick={() => createDocumentInProjectId.mutate()}
            >
                <FilePlus />
                New Document
            </Button>
        )

    } else {
        const createDocument = useMutation({
            mutationKey: ['create-document'],
            mutationFn: () => postDoc(),
            onSuccess: ({ data }) => {
                // ? Navigate user to doc link
                navigate({ to: `/editor/$docId`, params: { docId: data![0].id! } });

                // ? Inform user
                toast.success("Your Document has been created");
            },
            onError: (e) => {
                console.error('Failed to create doc!!!')
                console.error(e);

                toast.error("Failed to create document");

            }
        })


        return (
            <Button
                disabled={createDocument.isPending}
                onClick={() => createDocument.mutate()}
            >
                <FilePlus />
                New Document
            </Button>
        )

    }


}

export default CreateDocument