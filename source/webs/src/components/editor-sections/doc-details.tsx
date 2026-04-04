import { useParams } from '@tanstack/react-router'
import { CloudCheck, FilePenLine, Heart, HeartOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import Loading from '@/components/non-interactive/loader';
import SomethingWentWrong from '@/components/non-interactive/error';
import { getDocById, toggleDocFav, updateDocById } from '@/services/document';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';

export default function DocDetails() { 
    const queryClient = useQueryClient();
    const { docId } = useParams({ from: '/(auth)/editor/$docId/' });

    const { isPending, error, data } = useQuery({
        queryKey: ['document', docId],
        queryFn: () => getDocById(docId),
    });
 
    const [editOn, setEditOn] = useState(false);
    const [title, setTitle] = useState("");

    // ? sync server title to local title state after we got response from server otherwise getting 'hooks should not be inside ifs error'
    useEffect(() => {
        const serverTitle = data?.data?.[0]?.title;
        if (serverTitle) setTitle(serverTitle);
    }, [data]);

    const favoriteToggle = useMutation({
        mutationKey: ['toggle-fav', docId],
        mutationFn: () => toggleDocFav(docId!),
        onSuccess: ({ message }) => {
            toast.success(message);

            queryClient.invalidateQueries({
                queryKey: ['document', docId],
            });
        },
        onError: (e: any) => {
            toast.error(e.message);
        }
    });

    const editName = useMutation({
        mutationKey: ['edit-doc-name', docId],
        mutationFn: () =>
            updateDocById({
                id: docId!,
                data: { title }
            }),

        onSuccess: ({ message }) => {

            toast.success(message);

            queryClient.invalidateQueries({
                queryKey: ['document', docId],
            });
        },

        onError: (e: any) => {
            toast.error(e.message);
        }
    });

    if (isPending) return <Loading />
    if (error) return <SomethingWentWrong />

    const docDetails = data?.data?.[0];

    if (!docDetails) return null;

    return (
        <div className='flex gap-2 items-center'>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Input
                        type="text"
                        className='read-only:bg-muted max-w-xs w-fit'
                        readOnly={!editOn}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </TooltipTrigger>
                <TooltipContent>
                    <p>Document Updated {formatDistanceToNowStrict(new Date(docDetails.updatedAt), { addSuffix: true })}</p>
                </TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        size='icon'
                        variant={editOn ? 'default' : 'ghost'}
                        onClick={() => {
                            // ? save when turning edit OFF
                            if (editOn && docDetails.title.trim() !== title.trim()) editName.mutate();
                            setEditOn(!editOn);
                        }}>
                        <FilePenLine />
                    </Button>
                </TooltipTrigger>
                <TooltipContent><p>{editOn ? 'Save it' : 'Edit Name'}</p></TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant='ghost'
                        size='icon'
                        disabled={favoriteToggle.isPending}
                        onClick={() => favoriteToggle.mutate()}
                    >
                        {docDetails.isFavorite ? <HeartOff /> : <Heart />}
                    </Button>
                </TooltipTrigger>
                <TooltipContent><p>{docDetails.isFavorite ? 'Unfavorite Document' : 'Favorite Document'}</p></TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant='ghost' size='icon' ><CloudCheck /></Button>
                </TooltipTrigger>
                <TooltipContent><p>Sync Document</p></TooltipContent>
            </Tooltip>
        </div>
    );
}